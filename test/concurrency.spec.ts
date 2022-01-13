import { MemSync, MemErrors } from '../src/MemSync';
import { Shell } from 'shellbee'

UTest({
    async 'should check increments' () {

        let incProc = new Shell({
            command: `atma run ./test/fixtures/writer.ts`,
            matchReady: /Started/,
            detached: false,
        });
        incProc.run();

        await incProc.onReadyAsync();

        let writer = new MemSync({
            name: 'writerCheck',
            data: { num: 0 },
            options: {
                logEvents: true,
                peer: {
                    roles: [ 'writer' ]
                },
                network: {
                    maxWriters: 1
                }
            },
        });

        let error = await (async () => {
            try {
                await writer.start();
            } catch (error) {
                return error;
            }
        })();

        eq_(error.code, MemErrors.ERR_MAX_WRITERS);
    }
});
