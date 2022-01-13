
import { class_EventEmitter, promisify } from 'atma-utils';
import { Channel } from './Channel';
import { ChannelClient } from './ChannelClient';
import { ChannelHost } from './ChannelHost';
import { IPipeType } from './interface/IPipeType';
import { IPatch, SharedObject } from './mem/SharedObject';
import { UpdateQuery } from './util/types';
import * as ipc from 'node-ipc';
import * as net from 'net';
import { RpcObject } from './mem/RpcObject';
import { IMessageDto, Message } from './model/Message';

export interface IpcPipeEvents <T> {
    starting (type: IPipeType)
    startingFailed (type: IPipeType, error?)
    connected (type: IPipeType)
    disconnected (type: IPipeType)
    receivedPatches (patches: IPatch<T>[])
    change ()
    event (event: string, ...args)
}
export interface IpcPipeOptions {
    serverOnly?: boolean
    clientOnly?: boolean
    logEvents?: boolean
    timeout?: number
    peer?: {
        roles?: ('writer' | 'reader' | 'rpc')[]
    }
    network?: {
        maxWriters?: number
    }
}

export class IpcPipe<TModel = any, TRpc = any> extends class_EventEmitter<IpcPipeEvents<TModel>> {
    startedAt: Date
    status: 'none' | 'start-host' | 'start-client' | 'host' | 'client' | 'stopped' = 'none';
    connection: 'none' | 'connected' = 'none';
    shared: SharedObject<TModel>
    rpc: RpcObject<TRpc>;

    private channel: Channel<TModel>
    private pendingPatches: IPatch[] = []

    constructor (public name: string, defaultObject: any, rpc: any, public options?: IpcPipeOptions) {
        super();
        if (name == null) {
            throw new Error(`IpcPipe.constructor - Name required`);
        }

        this.shared = new SharedObject<TModel>(defaultObject);
        this.rpc = new RpcObject<TRpc>(rpc, this);
        this.shared.on('change', () => this.emit('change'));
    }

    async start () {
        const type: 'client' | 'host' = this.options?.clientOnly ? 'client' : 'host';
        await this.tryJoin(type);
        this.startedAt = new Date();
        return this.status;
    }
    async stop () {
        this.status = 'stopped';
        await this.channel?.close();
    }

    async patch (update: UpdateQuery<TModel>) {
        let patch = this.shared.patch(update);

        if (this.connection !== 'connected') {
            this.pendingPatches.push(patch)
        } else {
            this.channel.send([ patch ]);
        }
    }
    async call (path: string, args: any[]) {
        return this.tryCall(() => {
            return this.channel.call(path, args);
        });
    }
    async send(message: IMessageDto<any, any[]>) {
        this.trySend(() => {
            this.channel.sendMessage(new Message(message));
        })
    }

    async getStatus () {
        let channel = this.channel;
        let host;
        try {
            host = await channel?.getStatus();
        } finally {
            // Channel was changed
            if (channel !== this.channel) {
                return this.getStatus();
            }
        }
        return {
            status: this.status,
            channel: this.channel.name,
            host,
        };
    }
    async ping () {
        return this.tryCall(() => {
            return this.channel.ping();
        });
    }
    hasPeers (path: string) {
        path = path ?? (ipc.server as any).path;
        return new Promise(resolve => {
            const socket = net
                .connect({ path: path }, function () {
                    socket?.destroy();
                    resolve(true);
                })
                .on('error', function (error) {
                    resolve(false);
                });
        });
    }


    private async tryJoin (type: IPipeType) {
        if (this.status === type || this.status === `start-${type}`) {
            return;
        }

        this.emit('starting', type);
        this.status = `start-${type}` as any;
        await this.channel?.close();

        if (type === 'host') {
            this.channel = new ChannelHost(
                this.name,
                this.shared,
                this.rpc,
                this.options,
                this,
            );
        }
        if (type === 'client') {
            this.channel = new ChannelClient(
                this.name,
                this.shared,
                this.rpc,
                this.options,
                this,
            );
        }
        try {
            await this.channel.open();
            this.status = type;
            this.onConnected();
        } catch (error) {
            this.emit('startingFailed', type, error.message);
            this.status = 'none';
            this.connection = 'none';

            if (!this.options?.clientOnly && !this.options?.serverOnly) {
                // toggle
                type = type === 'host' ? 'client' : 'host';
            }
            await this.tryJoin(type);
        }
    }

    private tryCall (fn: () => Promise<IMessageDto>, opts?: { retries?: number }) {
        if (this.status === 'stopped') {
            throw new Error(`MemSync object is stopped, remote actions is prohibited`);
        }
        let options = {
            retries: opts?.retries ?? 3
        };

        if (this.connection !== 'connected') {
            return promisify.fromEvent<IpcPipeEvents<TModel>>(this, 'connected', async () => {
                return this.tryCallInner(fn, options)
            }, {
                timeout: 20_000
            });
        }
        return this.tryCallInner(fn, options);
    }
    private async tryCallInner (fn: () => Promise<IMessageDto>, opts: { retries: number }) {
        try {
            let r = await fn();
            // if (r.result != null) {
            //     return r;
            // }
            return r;
            // if (r.status === EIpcMessageStatus.Unhandled) {
            //     return r;
            // }
            // if (opts.retries === 0) {
            //     return r;
            // }
            // console.log('Unhandled', r, opts.retries)
        } catch (error) {
            // console.log('ERROR', error);
            // network errors - silently retry
        }
        opts.retries -= 1;
        return this.tryCall(fn, opts);
    }

    private trySend (fn: () => void, opts?: { retries?: number }) {
        if (this.status === 'stopped') {
            throw new Error(`MemSync object is stopped, remote actions is prohibited`);
        }
        let options = {
            retries: opts?.retries ?? 3
        };

        if (this.connection !== 'connected') {
            return promisify.fromEvent<IpcPipeEvents<TModel>>(this, 'connected', async () => {
                return this.trySendInner(fn, options)
            }, {
                timeout: 20_000
            });
        }
        return this.trySendInner(fn, options);
    }
    private async trySendInner (fn: () => void, opts: { retries: number }) {
        try {
            fn();
            return;
        } catch (error) {

            // console.log('ERROR', error);
            // network errors - silently retry
        }
        opts.retries -= 1;
        return this.trySend(fn, opts);
    }

    private onConnected () {
        this.connection = 'connected';

        this.emit('connected', this.status as any);
        this
            .channel
            .on('receivedPatches', patches => {
                this.emit('receivedPatches', patches);
            })
            .on('event', (event, ...args) => {
                this.emit('event', event, ...args);
            })
            .on('disconnect', async () => {
                if (this.status === 'stopped') {
                    return;
                }
                this.emit('disconnected', this.status as any);
                this.connection = 'none';
                this.status = 'none';
                this.tryJoin('host');
            });

        if (this.pendingPatches.length > 0) {
            let arr = this.pendingPatches.splice(0);
            this.channel.send(arr);
        }
    }

    emit <TKey extends keyof IpcPipeEvents<TModel>> (event: TKey, ...args: Parameters<IpcPipeEvents<TModel>[TKey]>) {
        if (this.options?.logEvents) {
            console.log(`Pipe with state '${this.status}' emits '${event}' with args: `, ...args);
        }
        return super.emit(event, ...args);
    }
}
