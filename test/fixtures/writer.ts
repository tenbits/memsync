import { MemSync } from '../../src/MemSync'

export namespace IncWorker {
    const mem = new MemSync({
        name: 'writerCheck',
        data: { num: 0 },
        options: {
            peer: {
                roles: [ 'writer' ]
            },
            network: {
                maxWriters: 1
            }
        }
    });

    let interval;

    export async function start () {
        await mem.start();
        console.log('Started');

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
