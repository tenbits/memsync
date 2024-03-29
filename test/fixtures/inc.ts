import { MemSync } from '../../src/MemSync'

export namespace IncWorker {
    const mem = new MemSync('inc', { num: 0 })
    let interval;

    export async function start () {
        await mem.start();

        interval = setInterval(() => {
            mem.patch({
                $inc: {
                    num: 1
                }
            });
            console.log('[inc] Patched', mem.data.num);

        }, 500)
    }
}

IncWorker.start();
