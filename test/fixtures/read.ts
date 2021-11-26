import { MemSync } from '../../src/MemSync'

export namespace ReadWorker {
    const mem = new MemSync('inc', { num: 0 })
    let interval;

    export async function start () {
        await mem.start();

        interval = setInterval(() => {
            console.log('[Reader] Patched', mem.ipc.shared.data.num);
        }, 1000)
    }
}

ReadWorker.start();
