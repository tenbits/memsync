import { class_EventEmitter } from 'atma-utils'

export namespace $promisify {

    export function when <TEvents extends Record<keyof TEvents, (...args: any) => any> = any> (
        ctx: class_EventEmitter<TEvents>,
        event: keyof TEvents,
        handlerFn: () => any | Promise<any>
    ) {
        return new Promise((resolve, reject) => {
            ctx.once(event, <any> (async () => {
                try {
                    let r = await handlerFn();
                    resolve(r);
                } catch (error) {
                    reject(error)
                }
            }));
        })
    }
}
