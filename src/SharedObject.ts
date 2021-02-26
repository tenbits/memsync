import { timeStamp } from 'console';
import { obj_patch } from './util/patch';
import { UpdateQuery } from './util/types';

export class SharedObject<T = any> {
    version: number = 1
    timestamp: number = 0

    data: T
    patches: IPatch<T>[] = [];

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
        return patch;
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
