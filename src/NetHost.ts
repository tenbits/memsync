import { class_Dfr, class_EventEmitter } from 'atma-utils';
import memd from 'memd';
import alot from 'alot';
import * as ipc from 'node-ipc';
import * as net from 'net';
import * as fs from 'fs';
import { EIpcMessageStatus, EIpcMessageType } from './interface/EIpcMessageType';
import { IPatchMessageDto, IRpcMessageDto } from './interface/IPatchMessageDto';
import { IMessageDto, Message } from './model/Message';
import { THandshackeMessageReq, THandshackeMessageRes } from './interface/THandshackeMessage';
import { IpcPipeOptions } from './IpcPipe';
import { ChannelHost } from './ChannelHost';
import { $id } from './util/$id';
import { $message } from './util/$message';
import { MemErrors } from './model/MemErrors';

export interface IIpcSocketEvents {
    handshake ()
    onPatchMessage (message: IPatchMessageDto)
    onRpcMessage (message: IRpcMessageDto)
    disconnect ()
}

export class NetHost extends class_EventEmitter<IIpcSocketEvents> {
    private _disposed = false
    private _status = {
        started: false,
        connections: 0
    };
    private options: IpcPipeOptions;

    private connections: ClientWrapper[] = [];

    public channelId: string;

    constructor (public pipeName: string, public channel: ChannelHost<any>) {
        super();
        if (this.pipeName == null) {
            throw new Error(`NetHost.constructor: pipeName required`);
        }

        this.options = channel.options;
        this.channelId = channel.channelId;
    }

    stop () {
        this._disposed = true;
        if (typeof (ipc.server as any).server !== 'boolean') {
            // workaround: node-ipc if server is not connected/created, the property is boolean
            ipc.server.stop();
        }
        (this as any).create.clearAll();
    }

    sendMessage (message: Message) {
        this.send('message', message.toJSON());
    }

    send (event: string, data) {
        this.channel.log(`MemServer | Broadcast message ${event}`);
        (ipc.server as any).broadcast(event, data);
    }
    sendTo(socket, event: 'message' | string, message: IMessageDto) {
        this.channel.log(`MemServer | Send to socket: ${event}. ${$message.getLogName(message)}`);
        ipc.server.emit(socket, event, message);
    }

    getStatus () {
        return this._status;
    }

    async ping () {
        let connections = await alot(this.connections).mapAsync(async connection => {
            let started = Date.now();
            let message = {
                id: $id.gen(),
                type: EIpcMessageType.Ping,
            };
            let response = await connection.request<{ success: boolean }>(message);
            if (!response.result?.success) {
                return { error: new Error(`Client ping failed ${response.error?.toString()}`) };
            }
            return {
                time: Date.now() - started
            };
        }).toArrayAsync();
        return {
            connection: 'host',
            host: {
                time: 0,
            },
            clients: connections
        };
    }

    async callRpc <TResult> (path: string, ...args: any[]): Promise<IMessageDto<IRpcMessageDto, TResult>> {
        if (this._disposed) {
            return Promise.reject(new Error(`IpcHost was disposed`));
        }
        if (this._status.started === false) {
            await this.create();
        }

        let message = <IMessageDto<IRpcMessageDto>> {
            id: $id.gen(),
            type: EIpcMessageType.Rpc,
            params: {
                senderId: this.channelId,
                path: path,
                args: args,
            }
        };
        return this.handleRpc <TResult> (message);
    }

    @memd.deco.memoize({ perInstance: true })
    create() {

        return new Promise((resolve, reject) => {
            ipc.config.id = `memsync_${this.pipeName}`;
            ipc.config.silent = true;
            ipc.config.unlink = false;

            ipc.serve(() => {
                ipc.server.on('message', (message: IMessageDto, socket) => {
                    this
                        .handleIncomeMessage(message, socket)
                        .then(res => {
                            if (res == null || message.id == null) {
                                return;
                            }
                            this.sendTo(socket, 'message', {
                                id: message.id,
                                error: res.error?.toString(),
                                code: res.code,
                                result: res.result,
                            });
                        })
                        .catch(error => {
                            if (message.id == null) {
                                return;
                            }
                            this.sendTo(socket, 'message', {
                                id: message.id,
                                error: error?.toString(),
                                code: error.code,
                            });
                        });
                    //
                });
                this._status.started = true;
                resolve(null);
            });
            ipc.server.on('error', async error => {
                if (error.code === 'EADDRINUSE') {
                    let cleaned = await this.checkStalled();
                    if (cleaned) {
                        ipc.server.start();
                        return;
                    }
                }
                reject(error);
            });
            ipc.server.on('connect', (socket) => {
                this._status.connections++;
            });
            ipc.server.on('disconnect', (socket) => {
                let connection = this.connections.find(c => c.socket === socket);
                if (connection == null) {
                    connection.disconnected();
                    let i = this.connections.indexOf(connection);
                    this.connections.splice(i, 1);
                }
                this._status.connections--;
            });

            ipc.server.start();
        });
    }

    private checkStalled() {
        const path = (ipc.server as any).path;
        // double check
        return new Promise(resolve => {
            const socket = net
                .connect({ path: path }, function () {
                    socket?.destroy();
                    resolve(false);
                })
                .on('error', function (error: { code }) {

                    if (error.code === 'ECONNREFUSED') {
                        // not in use: delete it and re-listen
                        fs.unlink(path, (err) => {
                            resolve(err == null);
                        });
                        return;
                    }
                    resolve(false);
                });
        });
    }

    private async handleIncomeMessage (message: IMessageDto, socket) {
        this.channel.log(`MemServer | Received message ${$message.getLogName(message)}`);

        switch (message.type) {
            case EIpcMessageType.Rpc:
                return this.handleRpc(message, socket);
            case EIpcMessageType.Handshake:
                return this.handleHandshake(message, socket);
            case EIpcMessageType.Event:
                return this.handleEvent(message, socket);
        }
        return null;
    }

    private async handleHandshake (message: IMessageDto<THandshackeMessageReq>, socket): Promise<IMessageDto<THandshackeMessageReq, THandshackeMessageRes>> {

        let client = this.connections.find(x => x.clientId === message.params.senderId);
        if (client != null) {
            return {
                ...message,
                error: new Error(`Peer already registered`)
            };
        }

        client = new ClientWrapper(message, socket);
        if (client.peer.roles?.includes('writer')) {
            // check max writers
            let maxWriters = Math.min(
                this.options?.network?.maxWriters ?? Infinity,
                message.params?.network?.maxWriters ?? Infinity,
            );
            if (maxWriters != Infinity) {
                let writersCount = 0;
                if (this.options?.peer?.roles?.includes('writer')) {
                    writersCount++;
                }
                this.connections.forEach(({ peer }) => {
                    if (peer?.roles?.includes('writer')) {
                        writersCount++;
                    }
                });

                if (maxWriters >= writersCount) {
                    return {
                        ...message,
                        error: new Error(`Exceeded max writers`),
                        code: MemErrors.ERR_MAX_WRITERS
                    };
                }
            }
        }

        let shared;
        if (message.params.shared) {
            shared = this.channel.shared.fullSync(message.params.shared);
        }

        this.connections.push(client);
        return {
            ...message,
            result: {
                host: {
                    id: this.channelId,
                    ver: '1'
                },
                shared
            }
        };
    }

    private async handleRpc <TResult = any> (message: IMessageDto<IRpcMessageDto, TResult>, senderSocket?): Promise<IMessageDto<IRpcMessageDto, TResult>> {
        let { senderId, path, args } = message.params;

        // check self
        let localMessage = await this.channel.rpc.processLocal(message);
        if (localMessage.status === EIpcMessageStatus.Completed) {
            return localMessage;
        }

        // loop connected
        let remoteMessage: IMessageDto = null;
        let foundSender = false;
        for (let connection of this.connections) {
            if (connection.socket === senderSocket) {
                foundSender = true;
                continue;
            }
            if (connection.hasRcpMethod(path) === false) {
                continue;
            }

            remoteMessage = await connection.request(message);
            if (remoteMessage?.status === EIpcMessageStatus.Completed) {
                break;
            }
        }
        if (senderSocket != null && foundSender === false) {
            console.warn(`MemHost | handling rpc from sender, but it wasn't found in connections`);
        }
        if (remoteMessage == null) {
            message.status = EIpcMessageStatus.Unhandled;
            message.error = new Error(`The handler for "${path}" RPC call was not found`);
            return message;
        }

        return remoteMessage;
    }

    private async handleEvent (message: IMessageDto, senderSocket): Promise<IMessageDto> {
        let [ event, args ] = message.params;
        try {
            this.channel.emit('event', event, ...args);
        } catch (err) { }

        let foundSender = false;
        for (let connection of this.connections) {
            if (connection.socket === senderSocket) {
                foundSender = true;
                continue;
            }
            connection.broadcast(message);
        }
        if (senderSocket != null && foundSender === false) {
            console.warn(`MemHost | handling event from sender, but it wasn't found in connections`);
        }
        return null;
    }
}


class ClientWrapper {
    public clientId: string
    public rpc: object
    public peer: IpcPipeOptions['peer']
    public network: IpcPipeOptions['network']

    public socket;

    private messages = [] as {
        original: IMessageDto
        message: IMessageDto
        promise: class_Dfr<IMessageDto>
    }[];

    constructor (message: IMessageDto<THandshackeMessageReq>, socket) {
        this.peer = message.params.peer ?? {};
        this.network = message.params.network ?? {};

        this.clientId = message.params.senderId;
        this.socket = socket;
        this.rpc = message.params.rpc;
    }

    hasRcpMethod (path: string): boolean | null {
        if (this.rpc == null) {
            return null;
        }
        return path in this.rpc;
    }


    request <TResponse = any> (message: IMessageDto): Promise<IMessageDto<any, TResponse>> {
        let m = {
            original: message,
            message: {
                ...message,
                id: $id.gen()
            },
            promise: new class_Dfr<IMessageDto>()
        };
        this.messages.push(m);
        ipc.server.emit(this.socket, 'message', message);
        return m.promise as any as Promise<IMessageDto>;
    }

    broadcast <TResponse = any> (message: IMessageDto) {
        ipc.server.emit(this.socket, 'message', message);
    }

    disconnected () {
        this.messages.forEach(m => {
            m.promise.reject(new Error(`Client disconnected`));
        });
    }
}
