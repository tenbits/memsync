import { MemShare } from '../src/MemShare';
import { Shell } from 'shellbee'

UTest({
    async 'ensure we stop server' () {
        let reader = new MemShare('stoppable', { num: 0 }, {
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

        let hasPeers = await reader.hasPeers(`/tmp/app.memshare_stoppable`);
        eq_(hasPeers, true);

        await reader.stop();

        hasPeers = await reader.hasPeers(`/tmp/app.memshare_stoppable`);
        eq_(hasPeers, false);
    },
    async '!ensure we stop server and and client' () {
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


        await incProc.terminate();
        await reader.stop();
        await wait(500);

        let hasPeersAfter = await reader.hasPeers(`/tmp/app.memshare_inc`);
        eq_(hasPeersAfter, false);
    }

});

function wait (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}
