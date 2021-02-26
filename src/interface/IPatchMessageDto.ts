import { IPatch } from '../SharedObject';

export interface IPatchMessageDto {
    senderId: number
    netVersion: number
    timestamp: number
    patches: IPatch<any>[]
}

export interface ISyncMessageDto {
    senderId: number
    version: number
    timestamp: number
    data: any
}
