
export interface IRpcMethods {
    [name: string]: Function | IRpcMethods
}

export interface IRpcMethodContainer {
    ctx: any
    fn: Function
    remote: (...args) => Promise<any>
}
export interface IRpcMethodsWrapped {
    [name: string]:  IRpcMethodContainer | IRpcMethodsWrapped
}
