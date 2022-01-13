import { class_EventEmitter, obj_getProperty } from 'atma-utils';
import { obj_patch, obj_patchKeys } from '../util/patch';
import { UpdateQuery } from '../util/types';
import { type IpcPipe } from '../IpcPipe';
import { RpcWrapper } from '../util/RpcWrapper';

interface ISharedObjectEvents {
    change ()
}
export class SharedObject<T> extends class_EventEmitter<ISharedObjectEvents>{
    version: number = 1
    timestamp: number = 0

    readonly data: T
    patches: IPatch<T>[] = [];
    observers: {
        [path: string]: Function[]
    } = {};

    constructor (defaultObject: any = {}) {
        super();
        this.data = defaultObject ?? {};
    }

    patch (update: UpdateQuery<T>, version?: number) {
        this.version = version ?? (this.version + 1);
        this.timestamp = Date.now();
        const patch = {
            version: this.version,
            timestamp: this.timestamp,
            patch: update
        };
        this.patches.push(patch);
        obj_patch(this.data, update);

        let keys;
        for (let path in this.observers) {
            let cbs = this.observers[path];
            if (cbs == null || cbs.length === 0) {
                continue;
            }
            keys = keys ?? obj_patchKeys(update);
            for (let key in keys) {
                let a = `${key}.`;
                let b = `${path}.`;
                if (key === path || a.startsWith(b) || b.startsWith(a)) {
                    let val = obj_getProperty(this.data, path);
                    for (let i = 0; i < cbs.length; i++) {
                        cbs[i](val);
                    }
                    continue;
                }
            }
        }
        this.emit('change');
        return patch;
    }

    /** returns current as json if  current is newer */
    fullSync (obj: { version, timestamp, data }) {
        if (this.version > obj.version) {
            return this.toJson();
        }
        this.setData(obj.data, obj.timestamp, obj.version);
        return null;
    }

    observe (path: string, cb) {
        let cbs = this.observers[path];
        if (cbs == null) {
            cbs = this.observers[path] = [];
        }
        cbs.push(cb);
    }

    toJson () {
        return {
            version: this.version,
            timestamp: this.timestamp,
            data: this.data,
        };
    }

    setData (data: T, timestamp: number, version: number) {
        // Refill the object to maintain the object reference
        for (let key in data) {
            this.data[key] = data[key];
        }
        for (let key in this.data) {
            if (key in data === false) {
                delete this.data[key];
            }
        }
        this.version = version ?? this.version;
        this.timestamp = timestamp ?? this.timestamp;
    }
}

export interface IPatch<T = any> {
    version: number
    timestamp: number
    patch: UpdateQuery<T>
}
