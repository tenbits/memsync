import { MemSync } from '../src/MemSync'
import axios from 'axios'

UTest({
    async 'should observe property' () {

        let port = 8838;
        let mem = new MemSync('inc-server', { num: 0 }, {
            logEvents: false,
            server: { port }
        });
        await mem.start();
        await wait(1000);


        let { data } = await axios.get('http://localhost:8838/inc-server');
        deepEq_(data, { num: 0 });

        await mem.patch({ $set: { num: 5 }});

        let { data: dataAfter } = await axios.get('http://localhost:8838/inc-server');
        deepEq_(dataAfter, { num: 5 });
    }
});



function wait (ms) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    });
}
