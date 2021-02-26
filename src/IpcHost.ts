import { class_EventEmitter, obj_getProperty } from 'atma-utils';
import memd from 'memd';
import * as ipc from 'node-ipc';
import { EIpcMessageType } from './interface/EIpcMessageType';
import { IPatchMessageDto } from './interface/IPatchMessageDto';

export interface IIpcSocketEvents {
    onPatchMessage (message: IPatchMessageDto)
    disconnect ()
}

interface IIpcIcomeMessage {
    id?: number
    method?: string
    type: EIpcMessageType,
    data: any
}

export class IpcHost extends class_EventEmitter<IIpcSocketEvents> {

    private rpcHandlers: any = {};

    registerRpcHandlers (rpc) {
        this.rpcHandlers = rpc;
    }

    constructor (public pipeName: string) {
        super();
    }

    stop () {
        ipc.server.stop();
        (this as any).create.clearAll();
    }

    send (event: string, data) {
        (ipc.server as any).broadcast(event, data);
    }

    @memd.deco.memoize({ perInstance: true })
    create() {

        return new Promise((resolve, reject) => {
            ipc.config.id = `memshare_${this.pipeName}`;
            ipc.config.silent = true;

            ipc.serve(() => {

                ipc.server.on('message', (message: IIpcIcomeMessage, socket) => {

                    this
                        .onIncomeMessage(message)
                        .then(res => {
                            if (res == null || message.id == null) {
                                return;
                            }
                            ipc.server.emit(socket, 'message', {
                                id: message.id,
                                error: res.error,
                                result: res.result,
                            });
                        })
                        .catch(error => {
                            if (message.id == null) {
                                return;
                            }
                            ipc.server.emit(socket, 'message', {
                                id: message.id,
                                error: error,
                            });
                        })
                    //
                });
                resolve(null);
            });
            ipc.server.on('error', error => {
                reject(error);
            });
            ipc.server.on('connect', () => {

            });
            ipc.server.on('disconnect', () => {

            });

            ipc.server.start();
        });
    }



    private async onIncomeMessage (message: IIpcIcomeMessage) {
        switch (message.type) {
            case EIpcMessageType.Rpc:
                return this.processRpc(message);
        }
        return null;
    }

    private async processRpc(message: IIpcIcomeMessage): Promise<{ error?, result? }> {
        let fn = obj_getProperty(this.rpcHandlers ?? {}, message.method);
        if (typeof fn !== 'function') {
            return { error: new Error(`${message.method} is not a function`) };
        }
        try {
            let result = await fn.call(null, ...(Array.isArray(message.data) ? message.data : [ message.data ]));
            return { result }
        } catch (error) {
            return { error };
        }
    }
}
