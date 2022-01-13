import { class_Dfr } from 'atma-utils'
import { Serializable } from 'class-json'
import { EIpcMessageStatus, EIpcMessageType } from '../interface/EIpcMessageType'

export interface IMessageDto<TIn = any, TOut = any> {
    id: string
    status?: EIpcMessageStatus
    type?: EIpcMessageType
    params?: TIn
    result?: TOut | null
    error?: Error | string | null
    code?: string
}

export class Message<TOut = any, TIn = any[]> extends Serializable<Message<TOut, TIn>> implements IMessageDto<TIn, TOut> {
    id: string
    status: EIpcMessageStatus
    type: EIpcMessageType
    params: TIn
    result: TOut | null
    error: Error | string | null

    private _lifecycle = new MessageLifecycle<TOut, TIn>(this);

    toJSON() {
        return {
            id: this.id,
            type: this.type,
            status: this.status,
            params: this.params,
            result: this.result,
        };
    }

    onCompleted () {
        return this._lifecycle.onCompleted();
    }
    throw (error) {
        this._lifecycle.doComplete(error);
    }
    doComplete (error, result) {
        this._lifecycle.doComplete(error, result);
    }
}

export class MessageLifecycle<TOut, TIn> {

    private dfrCompleted = new class_Dfr<Message<TOut, TIn>>();

    constructor (public message: Message<TOut, TIn>) {

    }

    onCompleted (): Promise<Message<TOut, TIn>> {
        if (this.dfrCompleted.isBusy()) {
            let { result, error } = this.message;
            if (result != null) {
                this.dfrCompleted.resolve(this.message);
            }
            if (error != null) {
                this.dfrCompleted.reject(this.message);
            }
        }
        return this.dfrCompleted as any as Promise<Message<TOut, TIn>>;
    }
    doComplete (error: null | Message<TOut, TIn>['error'], result?: Message<TOut, TIn>['result']) {
        if (error) {
            this.message.error = error;
            this.dfrCompleted.reject(this.message);
            return;
        }

        this.message.result = result;
        this.dfrCompleted.resolve(this.message);
    }
}
