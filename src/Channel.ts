import { class_EventEmitter } from 'atma-utils';
import { type IpcPipeOptions } from './IpcPipe';
import { IMessageDto, Message } from './model/Message';
import { RpcObject } from './mem/RpcObject';
import { IPatch, SharedObject } from './mem/SharedObject';
import { $id } from './util/$id';

export interface IChannelEvents<T> {
    receivedPatches (patch: IPatch<T>[])
    event (event: string, ...args)
    disconnect ()
}
export abstract class Channel<T> extends class_EventEmitter<IChannelEvents<T>> {

    abstract name: string;

    localVersion: number = 0
    netVersion: number = 0

    channelId = $id.gen()

    patches: IPatch[] = []
    pending: IPatch[] = []

    isReady = true

    constructor (public shared: SharedObject<T>, public rpc: RpcObject, public options: IpcPipeOptions) {
        super();
    }

    // patch (patch: UpdateQuery<T>) {
    //     if (this.isReady === false) {
    //         this.pending.push({
    //             version: ++this.localVersion,
    //             timestamp: Date.now(),
    //             patch: patch
    //         });
    //     }
    // }

    abstract open(): Promise<any>
    abstract close(): Promise<any>
    abstract send (patches: IPatch<any>[]): Promise<any>;
    abstract getStatus(): Promise<any>
    abstract call<TResult = any> (path: string, args: any[]): Promise<IMessageDto<any, TResult>>

    abstract sendMessage (message: Message): void

    abstract ping (): Promise<any>

    protected onOpen () {
        this.isReady = true;
    }

    log (...args) {
        if (this.options?.logEvents) {
            console.log(...args);
        }
    }
}
