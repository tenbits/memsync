import { class_Dfr, class_EventEmitter, obj_getProperty } from 'atma-utils';
import memd from 'memd';
import { Socket } from 'net';
import * as ipc from 'node-ipc';
import { EIpcMessageType } from './interface/EIpcMessageType';
import { IPatchMessageDto } from './interface/IPatchMessageDto';
import { IIpcSocketEvents } from './IpcHost';
import { IPatch } from './SharedObject';



interface IClientOptions {
    clientOnly?: boolean
}

export class IpcClient extends class_EventEmitter<IIpcSocketEvents> {

    private isConnected = false
    private disposed = false
    private rpcId = 0;
    private rpcListeners = new Map<number, class_Dfr>()
    private channelName: string;
    private socket: Socket;


    constructor (public pipeName: string, public clientId: number, public clientOptions?: IClientOptions) {
        super();
        this.channelName = `memshare_${pipeName}`;
    }


    async sendPatch(patch: IPatchMessageDto) {
        return this.send(EIpcMessageType.PatchMessage, patch);
    }


    async callRpc <TResult = any > (method: string, ...args: any[]): Promise<TResult> {
        if (this.disposed) {
            return Promise.reject(new Error(`IpcClient was disposed`));
        }

        let dfr = new class_Dfr();
        let id = ++this.rpcId;
        this.rpcListeners.set(id, dfr);
        try {
            await this.sendRpc(id, method, args);
        } catch (error) {
            this.rpcListeners.delete(id);
            dfr.reject(error);
        }
        return dfr;
    }


    private async send (type: EIpcMessageType, data) {
        if (this.isConnected === false) {
            await this.connect();
        }
        ipc.of[this.channelName].emit('message', {
            type,
            data
        });
    }
    private async sendRpc (id: number, method: string, args: any[]) {
        if (this.isConnected === false) {
            await this.connect();
        }
        ipc.of[this.channelName].emit('message', {
            type: EIpcMessageType.Rpc,
            id,
            method,
            data: args
        });
    }

    async stop () {
        const name = this.channelName;

        this.disposed = true;
        ipc.config.stopRetrying = true;
        if (ipc.of[name] != null) {
            ipc.of[name]
                .off('error', '*')
                .off('connect', '*')
                .off('disconnect', '*')
                .off('message', '*')
                .off('onPatchMessage', '*')
                ;

            this.socket = (ipc.of[name] as any).socket;
        }

        ipc.disconnect(name);

        (this as any).connect.clearAll();

        setImmediate(() => {
            this
                .rpcListeners
                .forEach(x => x.reject(new Error(`IpcClient is disposed`)));
        });
    }

    @memd.deco.memoize()
    connect() {
        return new Promise((resolve, reject) => {
            const name = this.channelName;

            ipc.config.id = `client_${this.clientId}`;
            ipc.config.silent = true;
            if (this.clientOptions?.clientOnly !== true) {
                ipc.config.maxRetries = 1;
            }

            ipc.connectTo(name, () => {
                ipc.of[name].on('connect', () => {
                    this.isConnected = true;
                    resolve(null);
                });
                ipc.of[name].on('destroy', () => {
                    this.isConnected = false;
                    this.emit('disconnect');
                });
                ipc.of[name].on('message', data => {
                    this.onMessage(data)
                });
                ipc.of[name].on('onPatchMessage', data => {
                    this.emit('onPatchMessage', data);
                });
                ipc.of[name].on('error', (err) => {
                    reject(err);
                });
            });
        });
    }

    private onMessage(data: { id, error?, result?}) {
        if (data.id) {
            let dfr = this.rpcListeners.get(data.id);
            if (dfr) {
                this.rpcListeners.delete(data.id);

                if (data.error) {
                    dfr.reject(data.error);
                } else {
                    dfr.resolve(data.result);
                }
            }
        }
    }

}


function wait (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}
