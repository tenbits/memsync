import { IPatch } from '../mem/SharedObject';

export interface IChannel {
    emitPatch (patch: IPatch<any>);
}
