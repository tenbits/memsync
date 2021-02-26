import { class_EventEmitter } from 'atma-utils';
import { IPatchMessageDto } from './interface/IPatchMessageDto';
import { IPatch, SharedObject } from './SharedObject';
import { UpdateQuery } from './util/types';

export interface IChannelEvents<T> {
    patchReceived (patch: IPatch<T>[])
    disconnect ()
}
export abstract class Channel<T> extends class_EventEmitter<IChannelEvents<T>> {

    abstract name: string;

    localVersion: number = 0
    netVersion: number = 0

    id = Math.round(Math.random() * 10**10)

    patches: IPatch[] = []
    pending: IPatch[] = []

    isReady = true

    constructor (public shared: SharedObject) {
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

    protected onOpen () {
        this.isReady = true;
    }
}
