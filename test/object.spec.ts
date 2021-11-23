import { MemShare } from '../src/MemShare';
import { Shell } from 'shellbee'

UTest({
    async 'should check increments' () {

        let incProc = new Shell({
            command: `atma run ./test/fixtures/inc.ts`,
            matchReady: /Patched 3/,
            detached: false,
        });
        incProc.run();

        await incProc.onReadyAsync();

        let reader = new MemShare('inc', { num: 0 }, {
            logEvents: false
        });
        await reader.start();

        gte_(reader.data.num, 3);

        let status = await reader.getStatus();
        has_(status, {
            status: 'client',
            host: {
                connections: 1
            }
        });

        await incProc.terminate();

        '> host was terminated, make current object to host'

        status = await reader.getStatus();
        has_(status, {
            status: 'start-host',
            host: {
                started: false
            }
        });

        await wait(1000);
        status = await reader.getStatus();
        has_(status, {
            status: 'host',
            host: {
                started: true
            }
        });

        await reader.stop();
    }
});


function wait (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}
