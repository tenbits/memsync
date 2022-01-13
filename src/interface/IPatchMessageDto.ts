import { IPatch } from '../mem/SharedObject';

export interface IPatchMessageDto {
    senderId: string
    netVersion: number
    timestamp: number
    patches: IPatch<any>[]
}

export interface IRpcMessageDto {
    senderId: string
    path: string
    args: any[]
}

export interface ISyncMessageDto {
    senderId: string
    version: number
    timestamp: number
    data: any
}
