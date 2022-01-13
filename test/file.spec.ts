import { MemSync } from '../src/MemSync';
import { Shell } from 'shellbee'
import { File } from 'atma-io'

UTest({
    async $before () {
        await File.removeAsync('./test/tmp/store.json');
    },
    async 'load data from store' () {
        let reader = new MemSync('storage', { num: 0 }, {
            file: {
                path: './test/fixtures/store.json'
            }
        });
        await reader.start();
        eq_(reader.data.num, 12);

        await reader.stop();
    },
    async 'write data to store' () {
        let reader = new MemSync('storage', { num: 0 }, {
            file: {
                path: './test/tmp/store.json'
            }
        });
        await reader.start();

        let num = Date.now();
        await reader.patch({
            $set: { num }
        });
        await reader.flush();
        await reader.stop();

        let { data } = await File.readAsync<{ data }>('./test/tmp/store.json');
        eq_(data.num, num);
    }
});

function wait (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}
