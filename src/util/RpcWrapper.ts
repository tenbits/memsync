import { is_rawObject } from 'atma-utils';
import { IRpcMethods, IRpcMethodsWrapped } from '../interface/IRpcMethods';
import { IpcPipe } from '../IpcPipe';

export namespace RpcWrapper {
    export function wrap<T>(rpc: IRpcMethods, ipc: IpcPipe<T>): { wrapped: IRpcMethodsWrapped, keys: string[] } {
        let value = rpc;
        let keys = [];
        for (let key in value) {
            _wrap(value, key, value[key], [ key ], ipc, keys);
        }
        return {
            wrapped: value as IRpcMethodsWrapped,
            keys
        };
    }


    function _wrap<T> (owner, property: string, value: any, path: string[], ipc: IpcPipe<T>, keys: string[]) {

        if (typeof value === 'function') {
            let _path = [...path, property].join('.');

            keys.push(_path);
            owner[property] = {
                ctx: owner,
                fn: value,
                remote: function (...args) {
                    return ipc.call(_path, args)
                }
            };
            return;
        }

        if (is_rawObject(value) === false) {
            // look for methods in Objects only
            return;
        }
        for (let key in value) {
            _wrap(value, key, value[key], [...path, key], ipc, keys);
        }
    }
}
