import { class_EventEmitter } from 'atma-utils';
import { EIpcMessageType } from '../interface/EIpcMessageType';
import { IpcPipe } from '../IpcPipe';
import { Message } from '../model/Message';

export class EventsObject <TEvents extends Record<keyof TEvents, (...args: any) => any>> extends class_EventEmitter<TEvents> {

    constructor (public ipc: IpcPipe) {
        super();

        ipc.on('event', (event, ...args: Parameters<TEvents[any]>) => {
            super.emit(event as any, ...args);
        });
    }

    emit<TKey extends keyof TEvents>(event: TKey, ...args: Parameters<TEvents[TKey]>) {

        this.ipc.send(new Message({
            type: EIpcMessageType.Event,
            params: [ event, args ]
        }));
        super.emit(event, ...args);
        return this;
    }
}
