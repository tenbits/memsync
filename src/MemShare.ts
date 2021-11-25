import { class_EventEmitter } from 'atma-utils';
import { IPipeType } from './interface/IPipeType';
import { IpcPipe, IpcPipeOptions } from './IpcPipe';
import { Logger } from './log/Logger';
import { IPatch } from './SharedObject';
import { UpdateQuery } from './util/types';

interface IMemShareEvents<T> {
    receivedPatches (patches: IPatch<T>[])
    connected (type: IPipeType)
    disconnected (type: IPipeType)
}
interface IMemShareInfo {
    startedAt: Date
    status: '' | 'connected' | 'host'
}

export interface IMemShareOptions extends IpcPipeOptions {

}
export class MemShare<T> extends class_EventEmitter<IMemShareEvents<T>> {

    private logger = new Logger();
    public ipc = new IpcPipe(this.name, this.defaultObject ?? {}, this.options);
    public data: T = this.ipc.shared.data;


    constructor (public name: string, public defaultObject: T = null, public options: IMemShareOptions = null) {
        super();

        this.ipc.on('receivedPatches', patches => this.emit('receivedPatches', patches));
        this.ipc.on('connected', (type) => this.emit('connected', type));
        this.ipc.on('disconnected', (type) => this.emit('disconnected', type));
    }

    async start() {
        await this.ipc.start();
    }

    async stop() {
        await this.ipc.stop();
    }

    async patch (patch: UpdateQuery<T>) {
        await this.ipc.patch(patch)
    }
    async onceAsync <TKey extends keyof IMemShareEvents<T>> (event: TKey): Promise<Parameters<IMemShareEvents<T>[TKey]>[0]> {
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
