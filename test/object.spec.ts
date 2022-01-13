import { MemSync } from '../src/MemSync';
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

        let reader = new MemSync('inc', { num: 0 }, {
            logEvents: false
        });

        await reader.start();

        gte_(reader.data.num, 3);

        let status = await reader.getStatus();
        has_(status, {
            status: 'client',
            host: {
                started: true
            }
        });

        let p1 = await reader.ping();
        eq_(p1.connection, 'client');
        await incProc.terminate();


        let p2 = await reader.ping();
        eq_(p2.connection, 'host');


        '> host was terminated, make current object to host'
        status = await reader.getStatus();
        has_(status, {
            status: 'host',
            host: {
                started: true
            }
        });

        await reader.stop();
        await wait(500);

        let hasPeers = await reader.hasPeers();
        eq_(hasPeers, false);
    }
});


function wait (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}
