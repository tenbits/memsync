import { class_EventEmitter } from 'atma-utils';
import { IpcPipe } from './IpcPipe';
import { IPatch } from './SharedObject';
import { UpdateQuery } from './util/types';

interface IMemShareEvents<T> {
    patchReceived (patches: IPatch<T>[])
}

export class MemShare<T> extends class_EventEmitter<IMemShareEvents<T>> {
    public ipc = new IpcPipe(this.name, this.defaultObject ?? {});
    public data: T = this.ipc.shared.data;

    constructor (public name: string, public defaultObject: T = null) {
        super();

        this.ipc.on('patchReceived', patches => this.emit('patchReceived', patches))
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
}
