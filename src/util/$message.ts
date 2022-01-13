import { EIpcMessageType } from '../interface/EIpcMessageType';
import { ErrorCode } from '../model/ErrorCode';
import { IMessageDto } from '../model/Message';

export namespace $message {
    export function getLogName (message: IMessageDto) {
        let key = '';
        if (message.type === EIpcMessageType.Rpc) {
            key = `:${message.params?.path}`;
        }
        let name = `${message.type}(${message.id}${key})`;
        return name;
    }
    export function toError (message: IMessageDto): ErrorCode {
        let err = new ErrorCode(message.error?.toString() ?? 'Unknown error');
        err.code = message.code;
        return err;
    }
}
