import { IpcPipeOptions } from '../IpcPipe';

export type THandshackeMessageReq = {
    version: number

    senderId: string
    rpc: object
    shared: {
        version: number
        timestamp: number
        data: any
    }

    peer: IpcPipeOptions['peer'],
    network: IpcPipeOptions['network']
}


export type THandshackeMessageRes = {
    host: {
        id: string
        ver: string
    },
    // Is present in response, only if the data on the HOST side is newer
    shared?: {
        version: number
        timestamp: number
        data: any
    }
}
