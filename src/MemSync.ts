import { class_EventEmitter } from 'atma-utils';
import { IPipeType } from './interface/IPipeType';
import { IpcPipe, IpcPipeOptions } from './IpcPipe';
import { Logger } from './log/Logger';
import { IPatch } from './SharedObject';
import { UpdateQuery } from './util/types';

interface IMemSyncEvents<T> {
    receivedPatches (patches: IPatch<T>[])
    connected (type: IPipeType)
    disconnected (type: IPipeType)
}
interface IMemSyncInfo {
    startedAt: Date
    status: '' | 'connected' | 'host'
}

export interface IMemSyncOptions extends IpcPipeOptions {

}
export class MemSync<T> extends class_EventEmitter<IMemSyncEvents<T>> {

    private logger = new Logger();
    public ipc = new IpcPipe(this.name, this.defaultObject ?? {}, this.options);
    public data: T = this.ipc.shared.data;


    constructor (public name: string, public defaultObject: T = null, public options: IMemSyncOptions = null) {
        super();

        this.ipc.on('receivedPatches', patches => this.emit('receivedPatches', patches));
        this.ipc.on('connected', (type) => this.emit('connected', type));
        this.ipc.on('disconnected', (type) => this.emit('disconnected', type));
    }

    async start() {
        return await this.ipc.start();
    }

    async stop() {
        await this.ipc.stop();
    }

    async patch (patch: UpdateQuery<T>) {
        await this.ipc.patch(patch)
    }
    async onceAsync <TKey extends keyof IMemSyncEvents<T>> (event: TKey): Promise<Parameters<IMemSyncEvents<T>[TKey]>[0]> {
        return new Promise(resolve => {
            this.once(event, resolve as any);
        });
    }
    hasPeers (path?: string) {
        return this.ipc.hasPeers(path);
    }

    observe (property: string, cb: (val) => void): this {
        this.ipc.shared.observe(property, cb);
        return this;
    }

    getStatus () {
        return this.ipc.getStatus();
    }
    setOptions (opts?: { logLevel: 'none' | 'error' | 'info' }) {

    }
}
