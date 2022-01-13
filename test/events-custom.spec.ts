import { MemSync } from '../src/MemSync';
import { Shell } from 'shellbee'

let eventsProc: Shell;
UTest({
    async $after () {
        await eventsProc.terminate();
    },
    async 'should listen to events' () {

        eventsProc = new Shell({
            command: `atma run ./test/fixtures/events.ts`,
            matchReady: /started/i,
            detached: false,
        });
        eventsProc.run();

        await eventsProc.onReadyAsync();

        let reader = new MemSync('customEvents', { num: 0 }, {
            logEvents: false
        });
        await reader.start();

        let catched = [];
        reader.events.on('time', ms => {
            catched.push(ms);
        });
        await wait(1000);

        gt_(catched.length, 0);
    }
});



function wait (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}
