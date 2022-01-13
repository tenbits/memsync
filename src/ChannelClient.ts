import { Channel } from './Channel';
import { IPatchMessageDto } from './interface/IPatchMessageDto';
import { NetClient } from './NetClient';
import { IpcPipe, IpcPipeOptions } from './IpcPipe';
import { Message } from './model/Message';
import { IPatch, SharedObject } from './mem/SharedObject';
import { RpcObject } from './mem/RpcObject';


export class ChannelClient<T = any> extends Channel<T> {

    name = 'client'

    private client: NetClient = new NetClient(this.pipeName, this, this.options);


    constructor (public pipeName: string, public shared: SharedObject<T>, public rpc: RpcObject, public options: IpcPipeOptions, ipc: IpcPipe) {
        super(shared, rpc, options);

        this.client.on('disconnect', (...args) => {
            this.emit('disconnect');
        })
    }



    async send(patches: IPatch<any>[]): Promise<any> {

        let  { result: { prevPatches, netVersion } } = await this.client.callRpc<{ prevPatches, netVersion }>('host.patch', <IPatchMessageDto> {
            senderId: this.channelId,
            netVersion: this.netVersion,
            patches: patches,
        });
        if (prevPatches) {
            prevPatches.forEach(patch => {
                this.shared.patch(patch)
            });
        }
        if (netVersion) {
            this.netVersion = netVersion;
        }
    }

    async open () {
        await this.client.connect();
        await this.onJoined();
    }
    async close () {
        await this.client.stop();
    }
    async getStatus () {
        let { result: status } = await this.client.callRpc('host.getStatus');
        return status;
    }
    async ping () {
        return this.client.ping();
    }
    async call (path: string, args: any[]): Promise<any> {
        return this.client.callRpc(path, args);
    }

    sendMessage(message: Message): void {
        this.client.sendMessage(message);
    }


    async onServerCreated () {

    }

    private async onJoined () {

        this.client.on('onPatchMessage', message => {
            if (message.senderId === this.channelId) {
                return;
            }
            message.patches?.forEach(patch => {
                this.shared.patch(patch.patch);
            });
            this.netVersion = message.netVersion;
            this.shared.timestamp = message.timestamp;
            this.emit('receivedPatches', message.patches);
        });

        this.client.on('onRpcMessage', message => {


        });
    }
}
