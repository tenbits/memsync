import { obj_getProperty } from 'atma-utils';
import { timeStamp } from 'console';
import { obj_patch, obj_patchKeys } from './util/patch';
import { UpdateQuery } from './util/types';

export class SharedObject<T = any> {
    version: number = 1
    timestamp: number = 0

    data: T
    patches: IPatch<T>[] = [];
    observers: {
        [path: string]: Function[]
    } = {};

    constructor (defaultObject: any = {}) {
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

        return patch;
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
        this.version = version;
        this.timestamp = timestamp;
    }
}

export interface IPatch<T = any> {
    version: number
    timestamp: number
    patch: UpdateQuery<T>
}
