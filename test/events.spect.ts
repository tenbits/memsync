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

        let [ patch ] = await reader.onceAsync('receivedPatches');
        gte_(patch.version, 4);

        await incProc.terminate();
        await reader.stop();
    }
});
