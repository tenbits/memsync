import { Shell } from 'shellbee'
import { MemSync } from '../src/MemSync';

let rpcProc: Shell;
UTest({
    async '$after' () {
        await rpcProc?.terminate()
    },

    async 'execute RPC' () {
        rpcProc = new Shell({
            command: `atma run ./test/fixtures/rpc/rpc-host.ts`,
            matchReady: /Started/,
            detached: false,
        });
        rpcProc.run();

        await rpcProc.onReadyAsync();

        let reader = new MemSync({
            name: 'rpcCheck',
            rpc: {
                getKey() {
                    throw new Error('Not the RPC')
                }
            },
            options: {
                timeout: 2000,
                logEvents: false
            }
        });

        await reader.start();

        let status = await reader.getStatus();
        has_(status, {
            status: 'client',
            host: {
                started: true
            }
        });

        let { result: value } = await reader.call<{ date, name }>('getBar');
        eq_(value.name, 'BarHost');
        eq_(value.date, new Date().getDate());
    },
})
