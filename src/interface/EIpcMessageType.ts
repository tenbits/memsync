
export enum EIpcMessageType {
    Rpc = 'rpc',
    PatchMessage = 'patchMessage',
    Handshake = 'handshake',
    Ping = 'ping',
    Event = 'event',
}

export enum EIpcMessageStatus {
    Unhandled = 0,
    Completed = 1,
}
