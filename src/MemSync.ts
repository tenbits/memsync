import { File } from 'atma-io';
import { class_Dfr, class_EventEmitter } from 'atma-utils';
import memd from 'memd';
import { IPipeType } from './interface/IPipeType';
import { IpcPipe, IpcPipeOptions } from './IpcPipe';
import { Logger } from './log/Logger';
import { IMessageDto } from './model/Message';
import { Server } from './server/Server';
import { IPatch } from './mem/SharedObject';
import { UpdateQuery } from './util/types';
import { EventsObject } from './mem/EventsObject';

interface IMemSyncEvents<T> {
    receivedPatches (patches: IPatch<T>[])
    connected (type: IPipeType)
    disconnected (type: IPipeType)
}
interface IMemSyncInfo {
    startedAt: Date
    status: '' | 'connected' | 'host'
}

export interface IMemSync<TData, TRpc> {
    name: string
    options?: IMemSyncOptions
    data?: TData
    rpc?: TRpc
}

export interface IMemSyncOptions extends IpcPipeOptions {
    server?: {
        port: number
    }
    file?: {
        path: string
    }
}
export class MemSync<
    TData,
    TRpc = any,
    TEvents extends Record<keyof TEvents, (...args: any) => any> = any
> extends class_EventEmitter<IMemSyncEvents<TData>> {

    private readonly logger = new Logger();
    private readonly fs: InstanceType<typeof File>;
    public readonly ipc: IpcPipe<TData, TRpc>
    public data: TData;

    public name: string
    public options: IMemSyncOptions;
    public events: EventsObject<TEvents>;

    public connection = new class_Dfr()

    constructor (name: string, defaultObject: TData, options?: IMemSyncOptions)
    constructor (opts: IMemSync<TData, TRpc>)
    constructor (mix: string | IMemSync<TData, TRpc>, defaultObject: TData = null, options: IMemSyncOptions = null) {
        super();

        let _name: string;
        let _default:TData;
        let _options: IMemSyncOptions;
        let _rpc: TRpc;

        if (typeof mix === 'string') {
            _name = mix;
            _default = defaultObject;
            _options = options;
        } else {
            _name = mix.name;
            _default = mix.data;
            _options = mix.options;
            _rpc = mix.rpc;
        }

        if (_name == null) {
            throw new Error(`Name not set for the MemSync`);
        }

        this.name = _name;
        this.options = _options;
        this.ipc = new IpcPipe<TData>(_name, _default ?? {}, _rpc, _options);
        this.events = new EventsObject<TEvents>(this.ipc);

        // re-emit for outer listeners
        this.ipc.on('receivedPatches', (patches) => {
            this.emit('receivedPatches', patches)
        });
        this.ipc.on('connected', (type) => {
            this.connection.resolve({ type: this.ipc.connection });
            this.emit('connected', type);
        });
        this.ipc.on('disconnected', (type) => {
            this.connection.defer();
            this.emit('disconnected', type)
        });
        this.data = this.ipc.shared.data;

        if (options?.file) {
            this.fs = new File(options.file.path, {
                processSafe: true,
                threadSafe: true
            });
        }
        if (options?.server?.port) {
            Server.create(options.server.port).register(this.name, this.ipc.shared);
        }
    }

    async start() {
        if (this.fs) {
            try {
                let { data, version, timestamp } = await this.fs.readAsync <{ data: TData, version: number, timestamp }> ();

                this.ipc.shared.setData(data, version, timestamp);
                this.ipc.on('change', () => this.flushDeferred());
                this.data = this.ipc.shared.data;
            } catch (error) {
                if (error.code !== 'ENOENT') {
                    throw error;
                }
            }
        }
        return await this.ipc.start();
    }

    async stop() {
        await this.ipc.stop();
    }

    /** Save the object to file.  */
    async flush () {
        if (this.fs == null) {
            throw new Error(`Storage not defined`);
        }
        let { data, version, timestamp } = this.ipc.shared;
        await this.fs.writeAsync({
            data, version, timestamp
        });
    }

    async patch (patch: UpdateQuery<TData>) {
        await this.ipc.patch(patch)
    }
    async onceAsync <TKey extends keyof IMemSyncEvents<TData>> (event: TKey): Promise<Parameters<IMemSyncEvents<TData>[TKey]>[0]> {
        return new Promise(resolve => {
            this.once(event, resolve as any);
        });
    }
    async call <TOut> (path, ...args): Promise<IMessageDto<any, TOut>> {
        return this.ipc.call(path, args);

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
    ping () {
        return this.ipc.ping();
    }

    setOptions (opts?: { logLevel: 'none' | 'error' | 'info' }) {

    }

    @memd.deco.debounce(100)
    private async flushDeferred () {
        if (this.fs != null) {
            this.flush();
        }
    }
}


export { MemErrors } from './model/MemErrors'
