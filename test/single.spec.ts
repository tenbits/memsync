import { MemSync } from '../src/MemSync';

UTest({
    async 'start single' () {
        let mem = new MemSync('single', { foo: 'foo' }, {
            logEvents: false
        });

        await mem.start();

        let status = await mem.getStatus();
        has_(status, {
            status: 'host',
            channel: 'host',
            host: {
                started: true,
                connections: 0
            }
        });

        eq_(mem.data.foo, 'foo');
    }
})
