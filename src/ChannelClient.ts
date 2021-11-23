import { Channel } from './Channel';
import { IPatchMessageDto } from './interface/IPatchMessageDto';
import { IpcClient } from './IpcClient';
import { IpcPipeOptions } from './IpcPipe';
import { IPatch, SharedObject } from './SharedObject';


export class ChannelClient<T> extends Channel<T> {

    name = 'client'

    private client = new IpcClient(this.pipeName, this.id, this.options);


    async send(patches: IPatch<any>[]): Promise<any> {
        let { prevPatches, netVersion} = await this.client.callRpc<{ prevPatches, netVersion }>('patch', <IPatchMessageDto> {
            senderId: this.id,
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

    constructor (public pipeName: string, public shared: SharedObject, public options: IpcPipeOptions) {
        super(shared);

        this.client.on('disconnect', (...args) => this.emit('disconnect'))
    }


    async open () {
        await this.client.connect();
        await this.onJoined();
    }
    async close () {
        await this.client.stop();
    }

    async getStatus () {
        let status = await this.client.callRpc('getStatus');
        return status;
    }

    async onServerCreated () {

    }

    private async onJoined () {

        let remote = await this.client.callRpc<{ version, timestamp, data }>('sync', this.shared.toJson());
        if (remote == null) {
            return;
        }

        if (remote.timestamp > this.shared.timestamp) {
            this.shared.setData(remote.data, remote.timestamp, remote.version);
        }
        this.client.on('onPatchMessage', message => {
            if (message.senderId === this.id) {
                return;
            }
            message.patches?.forEach(patch => {
                this.shared.patch(patch.patch);
            });
            this.netVersion = message.netVersion;
            this.shared.timestamp = message.timestamp;
            this.emit('receivedPatches', message.patches);
        });
    }
}
