import { class_EventEmitter, obj_getProperty } from 'atma-utils';
import memd from 'memd';
import * as ipc from 'node-ipc';
import * as net from 'net';
import * as fs from 'fs';
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

    private _rpcHandlers: any = {};
    private _status = {
        started: false,
        connections: 0
    };

    registerRpcHandlers (rpc) {
        this._rpcHandlers = rpc;
    }

    constructor (public pipeName: string) {
        super();
    }

    stop () {
        if (typeof (ipc.server as any).server !== 'boolean') {
            // workaround: node-ipc if server is not connected/created, the property is boolean
            ipc.server.stop();
        }
        (this as any).create.clearAll();
    }

    send (event: string, data) {
        (ipc.server as any).broadcast(event, data);
    }

    getStatus () {
        return this._status;
    }

    @memd.deco.memoize({ perInstance: true })
    create() {

        return new Promise((resolve, reject) => {
            ipc.config.id = `memsync_${this.pipeName}`;
            ipc.config.silent = true;
            ipc.config.unlink = false;

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
                this._status.started = true;
                resolve(null);
            });
            ipc.server.on('error', async error => {
                if (error.code === 'EADDRINUSE') {
                    let cleaned = await this.checkStalled();
                    if (cleaned) {
                        ipc.server.start();
                        return;
                    }
                }
                reject(error);
            });
            ipc.server.on('connect', (client) => {
                this._status.connections++;
            });
            ipc.server.on('disconnect', () => {
                this._status.connections--;
            });

            ipc.server.start();
        });
    }

    private checkStalled() {
        const path = (ipc.server as any).path;
        // double check
        return new Promise(resolve => {
            const socket = net
                .connect({ path: path }, function () {
                    socket?.destroy();
                    resolve(false);
                })
                .on('error', function (error: { code }) {

                    if (error.code === 'ECONNREFUSED') {
                        // not in use: delete it and re-listen
                        fs.unlink(path, (err) => {
                            resolve(err == null);
                        });
                        return;
                    }
                    resolve(false);
                });
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
        let fn = obj_getProperty(this._rpcHandlers ?? {}, message.method);
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
