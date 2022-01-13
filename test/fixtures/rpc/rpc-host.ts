import { MemSync } from '../../../src/MemSync'

export namespace RpcChecker {
    const mem = new MemSync({
        name: 'rpcCheck',
        rpc: {
            getBar() {
                return {
                    name: 'BarHost',
                    date: new Date().getDate(),
                };
            }
        },
        options: {
            logEvents: false
        }
    });

    export async function start () {
        console.log('StartingRpcHost');
        try {
            await mem.start();
            console.log('StartedRpcHost');
        } catch (error) {
            console.log(error);
        }
    }
}
RpcChecker.start();
