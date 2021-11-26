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

        let [ patch ] = await reader.onceAsync('receivedPatches');
        gte_(patch.version, 4);

        await incProc.terminate();
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
