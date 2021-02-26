import { MemShare } from '../src/MemShare';
import { Shell } from 'shellbee'

UTest({
    async 'should check increments' () {

        let incProc = new Shell({
            command: `atma run ./test/fixtures/inc.ts`,
            matchReady: /Patched 5/,
            detached: false,
        })
        incProc.run();

        await incProc.onReadyAsync();

        let reader = new MemShare('inc', { num: 0 });

        await reader.start();

        gte_(reader.data.num, 5);

        await incProc.terminate();
        await reader.stop();
    }
});
