import { MemSync } from '../src/MemSync';
import { Shell } from 'shellbee'

UTest({
    async 'ensure we stop server' () {
        let reader = new MemSync('stoppable', { num: 0 }, {
            logEvents: false
        });
        await reader.start();


        let status = await reader.getStatus();

        has_(status, {
            status: 'host',
            host: {
                started: true
            }
        });

        let hasPeers = await reader.hasPeers();
        eq_(hasPeers, true);

        await reader.stop();

        hasPeers = await reader.hasPeers();
        eq_(hasPeers, false);
    },
    async 'ensure we stop server and and client' () {
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
        gte_(reader.data.num, 3, 'Number should be already >3');


        await reader.stop();
        await incProc.terminate();
        await wait(1000);

        let hasPeersAfter = await reader.hasPeers();
        eq_(hasPeersAfter, false);
    }

});

function wait (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}
