import { MemSync } from '../../src/MemSync'

export namespace EventWorker {
    const mem = new MemSync('customEvents', { num: 0 })
    let interval;

    export async function start () {
        await mem.start();
        console.log('Started');

        interval = setInterval(() => {

            mem.events.emit('time', Date.now());

        }, 500)
    }
}

EventWorker.start();
