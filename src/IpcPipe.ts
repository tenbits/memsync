
import { class_EventEmitter } from 'atma-utils';
import { Channel } from './Channel';
import { ChannelClient } from './ChannelClient';
import { ChannelHost } from './ChannelHost';
import { IChannel } from './interface/IChannel';
import { IPatchMessageDto } from './interface/IPatchMessageDto';
import { IPipeType } from './interface/IPipeType';
import { IpcClient } from './IpcClient';
import { IpcHost } from './IpcHost';
import { IPatch, SharedObject } from './SharedObject';
import { UpdateQuery } from './util/types';


export interface IpcPipeEvents <T> {
    starting (type: IPipeType)
    startingFailed (type: IPipeType, error?)
    connected (type: IPipeType)
    patchReceived (patches: IPatch<T>[])
}
export interface IpcPipeOptions {
    serverOnly?: boolean
    clientOnly?: boolean
    logEvents?: boolean
}

export class IpcPipe<T = any> extends class_EventEmitter<IpcPipeEvents<T>> {

    status: 'none' | 'start-host' | 'start-client' | 'host' | 'client' = 'none';
    connection: 'none' | 'connected' = 'none';

    shared: SharedObject<T>

    channel: Channel<T>

    pending: IPatch[] = []

    constructor (public name: string, defaultObject: any, public options?: IpcPipeOptions) {
        super();
        this.shared = new SharedObject(defaultObject);

        // console.log('SUBSCRIBE')
        // process.on('SIGINT', () => {
        //     console.log('SIGINT!!')
        //     this.channel?.close();
        //     process.exit(0);
        // });
        // process.on('SIGTERM', () => {
        //     console.log('SIGTERM!!')
        //     this.channel?.close();

        //  });
    }

    async start () {
        const type: 'client' | 'host' = this.options?.clientOnly ? 'client' : 'host';
        await this.tryJoin(type);
    }
    async stop () {
        await this.channel?.close();
    }

    async patch (update: UpdateQuery<T>) {
        let patch = this.shared.patch(update);

        if (this.connection !== 'connected') {
            this.pending.push(patch)
        } else {
            this.channel.send([ patch ]);
        }
    }
    async get () {
        if (this.status == null) {
            await this.start();
        }
    }

    private async tryJoin (type: IPipeType) {
        if (this.status?.startsWith('create')) {
            return;
        }

        this.emit('starting', type);
        this.status = `start-${type}` as any;
        await this.channel?.close();

        if (type === 'host') {
            this.channel = new ChannelHost(this.name, this.shared, this.options);
        }
        if (type === 'client') {
            this.channel = new ChannelClient(this.name, this.shared, this.options);
        }
        try {
            await this.channel.open();
            this.status = type;
            this.onConnected();

        } catch (error) {
            this.emit('startingFailed', type, error);
            this.status = 'none';
            this.connection = 'none';

            if (!this.options?.clientOnly && !this.options?.serverOnly) {
                // toggle
                type = type === 'host' ? 'client' : 'host';
            }
            await this.tryJoin(type);
        }
    }

    private onConnected () {
        this.connection = 'connected';

        this.emit('connected', this.status as any);
        this
            .channel
            .on('disconnect', async () => {
                this.connection = 'none';
                this.status = 'none';
                this.tryJoin('host');
            });

        if (this.pending.length > 0) {
            let arr = this.pending.splice(0);
            this.channel.send(arr);
        }
    }

    emit <TKey extends keyof IpcPipeEvents<T>> (event: TKey, ...args: Parameters<IpcPipeEvents<T>[TKey]>) {
        if (this.options?.logEvents) {
            console.log(`Pipe ${this.status}`, event, ...args);
        }
        return super.emit(event, ...args);
    }
}
