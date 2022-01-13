import alot from 'alot';
import { obj_extend, obj_getProperty } from 'atma-utils';
import { EIpcMessageStatus } from '../interface/EIpcMessageType';
import { IRpcMessageDto } from '../interface/IPatchMessageDto';
import { IRpcMethodContainer, IRpcMethods, IRpcMethodsWrapped } from '../interface/IRpcMethods';
import { type IpcPipe } from '../IpcPipe';
import { IMessageDto, Message } from '../model/Message';
import { RpcWrapper } from '../util/RpcWrapper';


export class RpcObject<TRpc = any> {
    private _wrapped: IRpcMethodsWrapped;
    private _keys: string[]
    private _keysDict: {
        [path: string]: 1
    };

    constructor (rpc: IRpcMethods, ipc: IpcPipe<any>) {
        let { wrapped, keys } = RpcWrapper.wrap(rpc ?? {}, ipc);

        this._wrapped = wrapped;
        this._keys = keys;
    }

    async processLocal (message: IMessageDto<IRpcMessageDto>): Promise<IMessageDto<IRpcMessageDto>> {

        let { path, args } = message.params;
        let fnWrapped: IRpcMethodContainer = obj_getProperty(this._wrapped, path);
        if (fnWrapped == null) {
            message.status = EIpcMessageStatus.Unhandled;
            return message;
        }
        try {
            let result = await fnWrapped.fn.apply(fnWrapped.ctx, args);
            message.status = EIpcMessageStatus.Completed;
            message.result = result;
            return message;
        } catch (error) {
            message.status = EIpcMessageStatus.Completed;
            message.error = error;
            return message;
        }
    }

    keys(): {
        [path: string]: 1
    } {
        if (this._keysDict == null) {
            this._keysDict = alot(this._keys).toDictionary(x => x, x => 1);
        }
        return this._keysDict;
    }

    extend (rpc: IRpcMethods, ipc: IpcPipe<any> ) {
        let { wrapped, keys } = RpcWrapper.wrap(rpc, ipc);
        obj_extend(this._wrapped, wrapped);

        this._keys = (this._keys ?? []).concat(keys);
        this._keysDict = null;
    }
}
