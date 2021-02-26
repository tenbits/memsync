import { MemShare } from '../../src/MemShare'

export namespace ReadWorker {
    const mem = new MemShare('inc', { num: 0 })
    let interval;

    export async function start () {
        await mem.start();

        interval = setInterval(() => {
            console.log('[Reader] Patched', mem.ipc.shared.data.num);
        }, 1000)
    }
}

ReadWorker.start();
