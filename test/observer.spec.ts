import { MemShare } from '../src/MemShare';
import { Shell } from 'shellbee'

UTest({
    async 'should observe property' () {

        let incProc = new Shell({
            command: `atma run ./test/fixtures/inc.ts`,
            matchReady: /Patched 1/,
            detached: false,
        });
        incProc.run();

        await incProc.onReadyAsync();

        let reader = new MemShare('inc', { num: 0 }, {
            logEvents: false
        });
        await reader.start();

        let started = reader.data;
        let startedVal = started.num;
        gte_(startedVal, 1);

        return new Promise(resolve => {
            reader.observe('num', async val => {
                eq_(val, started.num);
                eq_(val, startedVal + 1);

                await incProc.terminate();
                await reader.stop();
                await wait(1000);

                let hasPeers = await reader.hasPeers();
                eq_(hasPeers, false);
                resolve(null);
            });
        })

    }
});



function wait (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}
