import alot from 'alot';
import { Channel } from './Channel';
import { IPatchMessageDto, ISyncMessageDto } from './interface/IPatchMessageDto';
import { IpcHost } from './IpcHost';
import { IpcPipeOptions } from './IpcPipe';
import { IPatch, SharedObject } from './SharedObject';
import { obj_patchConflict } from './util/patch';

export class ChannelHost<T> extends Channel<T> {

    name = 'host'

    async send(patches: IPatch<any>[]): Promise<any> {
        this.host.send('onPatchMessage', {
            senderId: this.id,
            netVersion: this.shared.version,
            timestamp: this.shared.timestamp,
            patches: patches,
        });
    }

    private host = new IpcHost(this.pipeName);
    private rpc = {
        sync: async (message: ISyncMessageDto) => {
            if (this.shared.version > message.version) {
                return this.shared.toJson();
            }
            this.shared.setData(message.data, message.timestamp, message.version);
            return null;
        },
        patch: async (message: IPatchMessageDto) => {

            let prevPatches: IPatch[];
            if (this.localVersion > message.netVersion) {
                let patches = this.patches.filter(x => x.version > message.netVersion);
                let conflict = alot(patches).map(patch => {
                    return alot(message.patches).map(p => {
                        return obj_patchConflict(patch.patch, p.patch);
                    }).filter(x => x != null).first();
                }).filter(x => x != null).first();

                if (conflict) {
                    return {
                        conflict,
                        netVersion: this.localVersion,
                        patches: patches,
                    };
                }
                prevPatches = patches;
            }

            message.patches.forEach(patch => {
                this.shared.patch(patch.patch);
            });

            this.host.emit('onPatchMessage', {
                senderId: message.senderId,
                netVersion: this.shared.version,
                patches: message.patches,
                timestamp: this.shared.timestamp,
            });
            this.emit('receivedPatches', message.patches)

            return {
                prevPatches: prevPatches,
                netVersion: this.shared.version,
            };
        },
        getStatus: async () => {
            let status = await this.getStatus();
            return status;
        }
    }

    constructor (public pipeName: string, public shared: SharedObject, public options: IpcPipeOptions) {
        super(shared);
    }

    async open () {
        await this.host.create();
        this.host.registerRpcHandlers(this.rpc);
    }
    async close () {
        this.host.stop();
    }
    async getStatus () {
        return this.host?.getStatus();
    }

    async onServerCreated () {

    }

    async onClientConnected () {

    }
}
