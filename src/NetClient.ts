import * as ipc from 'node-ipc';
import memd from 'memd';
import { class_Dfr, class_EventEmitter } from 'atma-utils';
import { Socket } from 'net';
import { EIpcMessageStatus, EIpcMessageType } from './interface/EIpcMessageType';
import { IPatchMessageDto, IRpcMessageDto } from './interface/IPatchMessageDto';
import { IIpcSocketEvents } from './NetHost';
import { IMessageDto, Message } from './model/Message';
import { $id } from './util/$id';
import { THandshackeMessageReq, THandshackeMessageRes } from './interface/THandshackeMessage';
import { type ChannelClient } from './ChannelClient';
import { $message } from './util/$message';


interface IClientOptions {
    clientOnly?: boolean
}

export class NetClient extends class_EventEmitter<IIpcSocketEvents> {

    private isConnected = false

    private disposed = false

    private channelName: string;
    private socket: Socket;
    private channelId: string;
    private client: ClientSelfWrapper;

    constructor (public pipeName: string, public channel: ChannelClient<any>, public clientOptions?: IClientOptions) {
        super();
        if (pipeName == null) {
            throw new Error(`NetClient.constructor: pipeName required`);
        }
        this.channelName = `memsync_${pipeName}`;
        this.channelId = channel.channelId;
    }


    async sendPatch(patch: IPatchMessageDto) {
        return this.sendMessage(new Message({
            type: EIpcMessageType.PatchMessage,
            params: [ patch ],
        }));
    }


    async callRpc <TResult> (path: string, ...args: any[]): Promise<IMessageDto<any, TResult>> {
        if (this.disposed) {
            return Promise.reject(new Error(`IpcClient was disposed`));
        }
        if (this.isConnected === false) {
            await this.connect();
        }
        if (this.channel.options.logEvents) {
            console.log(`MemSync:NetClient sending rpc request: ${path}`);
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
        let resp = await this.client.send <TResult> (message);
        if (resp.error) {
            throw new Error(resp.error.toString());
        }
        return resp;
    }

    async sendMessage (message: Message) {
        if (this.isConnected === false) {
            await this.connect();
        }
        ipc.of[this.channelName].emit('message', message.toJSON());
    }

    async stop () {
        const name = this.channelName;

        this.disposed = true;
        ipc.config.stopRetrying = true;
        if (ipc.of[name] != null) {
            ipc.of[name]
                .off('error', '*')
                .off('connect', '*')
                .off('disconnect', '*')
                .off('message', '*')
                .off('onPatchMessage', '*')
                ;

            this.socket = (ipc.of[name] as any).socket;
        }

        ipc.disconnect(name);

        (this as any).connect.clearAll();

        this.client.disconnected();
    }

    async ping () {
        if (this.isConnected === false) {
            throw new Error(`Disconnected. Ping prohibited`);
        }
        let started = Date.now();
        let message = await this.callRpc<{ success: boolean }>('host.ping');
        if (!message.result?.success) {
            throw new Error(`Ping not successful`);
        }
        return {
            connection: 'client',
            host: {
                time: Date.now() - started
            }
        };
    }

    @memd.deco.memoize()
    connect() {
        return new Promise((resolve, reject) => {
            const name = this.channelName;

            ipc.config.id = `client_${this.channelId}`;
            ipc.config.silent = true;
            ipc.config.stopRetrying = false;
            if (this.clientOptions?.clientOnly !== true) {
                ipc.config.maxRetries = 1;
            }

            ipc.connectTo(name, () => {

                let client = ipc.of[name];

                this.client = new ClientSelfWrapper(this, client);

                client.on('connect', async () => {
                    if (this.isConnected) {
                        return;
                    }
                    try {
                        this.isConnected = true;
                        let result = await this.client.handshake();
                        if (result.error) {
                            reject($message.toError(result));
                            return;
                        }
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }

                });
                client.on('destroy', () => {
                    this.isConnected = false;
                    this.client.disconnected();
                    this.emit('disconnect');
                });
                client.on('message', message => {
                    this.client.received(message);
                });
                client.on('onPatchMessage', data => {
                    this.emit('onPatchMessage', data);
                });
                client.on('error', (err) => {
                    reject(err);
                });
            });
        });
    }

}



class ClientSelfWrapper {
    public rpc: object
    public socket;

    private sent = new Map<string, {
        message: IMessageDto
        promise: class_Dfr<IMessageDto>
    }>();


    constructor (private netClient: NetClient, private socketClient: typeof ipc.of['']) {
        this.rpc = netClient.channel.rpc?.keys();
    }

    async handshake () {
        let channel = this.netClient.channel;
        let sharedJson = this.netClient.channel.shared.toJson();
        let resp = await this.send<THandshackeMessageRes>(<IMessageDto<THandshackeMessageReq>> {
            id: $id.gen(),
            type: EIpcMessageType.Handshake,
            params: {
                senderId: channel.channelId,
                shared: sharedJson,
                rpc: channel.rpc.keys(),
                peer: channel.options.peer,
                network: channel.options.network,
            }
        });
        if (resp.result?.shared) {
            let { data, timestamp, version } = resp.result.shared;
            channel.shared.setData(data, timestamp, version);
        }
        return resp;
    }

    hasRcpMethod (path: string): boolean | null {
        if (this.rpc == null) {
            return null;
        }
        return path in this.rpc;
    }

    emit (message: IMessageDto) {
        this.netClient.channel.log(`MemClient | Emit message ${$message.getLogName(message)}`);
        this.socketClient.emit('message', message);
    }
    send<TResult> (message: IMessageDto): Promise<IMessageDto<any, TResult>> {
        if (message.id == null) {
            message.id = $id.gen();
        }
        let m = {
            message,
            promise: new class_Dfr<IMessageDto>()
        };
        this.sent.set(message.id, m);
        this.emit(message);

        setTimeout(() => {
            if (m.promise.isBusy()) {
                m.promise.reject(new Error(`Timeouted`));
            };
        }, this.netClient.channel.options.timeout ?? 15_000);

        return m.promise as any as Promise<IMessageDto>;
    }
    async received (message: IMessageDto) {
        this.netClient.channel.log(`MemClient | Received message ${$message.getLogName(message)}`);
        let sent = this.sent.get(message.id);
        if (sent) {
            this.sent.delete(message.id);
            // is the response from the HOST
            sent.promise.resolve(message);
            return;
        }
        let channel = this.netClient.channel;
        if (message.type === EIpcMessageType.Rpc) {
            let resp = await channel.rpc.processLocal(message);
            this.emit(resp);
            return;
        }
        if (message.type === EIpcMessageType.Ping) {
            message.status = EIpcMessageStatus.Completed;
            message.result = { success: true };
            this.emit(message);
            return;
        }
        if (message.type === EIpcMessageType.Event) {
            let [event, args] = message.params;
            channel.emit('event', event, ...args);
            return;
        }

        // message not handled
        let m = {
            ...message,
            status: EIpcMessageStatus.Completed,
            error: new Error(`Unknown message type: ${$message.getLogName(message)}`)
        };
        this.emit(m);
    }
    disconnected () {
        this.sent.forEach(entry => {
            if (entry.promise.isBusy()) {
                let meta = $message.getLogName(entry.message);
                entry.promise.reject(new Error(`${meta} errored as the client was disconnected. `));
            }
        });
        this.sent.clear();
    }
}
