import { IPatch } from '../SharedObject';

export interface IChannel {
    emitPatch (patch: IPatch<any>);
}
