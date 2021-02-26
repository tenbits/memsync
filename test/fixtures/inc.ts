import { MemShare } from '../../src/MemShare'

export namespace IncWorker {
    const mem = new MemShare('inc', { num: 0 })
    let interval;

    export async function start () {
        await mem.start();

        interval = setInterval(() => {
            console.log('[inc] Patched', mem.ipc.shared.data.num);
            mem.patch({
                $inc: {
                    num: 1
                }
            });
        }, 500)
    }
}

IncWorker.start();
