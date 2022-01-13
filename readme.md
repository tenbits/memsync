# MemSync

<p align='center'>
    <img src='./assets/background.jpg'/>
</p>

----
[![Build Status](https://travis-ci.com/tenbits/memsync.svg?branch=master)](https://travis-ci.com/tenbits/memsync)
[![NPM version](https://badge.fury.io/js/memsync.svg)](http://badge.fury.io/js/memsync)
![ts](https://badgen.net/badge/icon/typescript?icon=typescript&label)

Process-to-process communication and object synchronization. Backed by [`node-ipc`](https://github.com/RIAEvangelist/node-ipc).

* ⚙️ Multiple NodeJS processes can write to and read from the **shared** object.
* 🤝 Multiple NodeJS processes can communicate via **RPC** calls or **EventBus**.
* ✨ No extra server host process is needed, each process acts as a host or client, when the host process exits, the host role is taken over by another process.
* 🛡️ Enhanced concurrency control

----

##### &#9776;

- `1` [Initialization](#init)
- `2` [Object changes](#change)
- `3` [Race conditions and conflict resolutions](#race-conditions)
- `4` [RPC](#rpc)
- `5` [Events](#events)
- `6` [Object Observer](#observer)
- `7` [Mutex](#mutex)
- `8` [Storage](#storage)
- `9` [Server](#server)
- `10` [Stop](#stop)


### `1` Initialization  <a id='init'>§</a>

> MemSync sample initialization

```ts
import { MemSync } from 'memsync'
let memsync = new MemSync({
    /* some unique/global name */
    name: 'my_shared_object',
    data: {
        foo: 1,
        bar: 2,
        qux: [ 'one', 'two' ]
    },
    rpc: {
        foo () { return 'bar'; }
    },
    options: {
        /* optional */
        server: {
            port: 80
        }
        /* optional */
        file: {
            path: './file/persistence.json'
        },
        /* optional */
        peer: {
            roles: ['writer']
        }
        /* optional */
        network: {
            maxWriters: 1
        },
        logEvents: false
        timeout: 30_000
    }
);
await memsync.start();
```

`start` discovers other nodes
1. When the server already exists, we connect to the server and receive current object. Now our process holds the up-to-date data, receives new patches from the network and sends the changes to the host. When the host exits, we rediscover the network, and will try to act as a server, as we now holding the up-to-date object.
2. When the process-to-process network does not exists, we create a server and start accepting new processes to join and will later share the current data with the clients


### `2` Object changes <a id='change'>§</a>

To read values you would use it as simple object `let foo = memsync.data.foo`, but for changes use  `mongodb` [update operators](https://docs.mongodb.com/manual/reference/operator/update/)

```ts
await memsync.patch({
    $set: {
        foo: 2
    }
})
```

We apply the patch immediately the object, and will try to
1. if client: send to the host, which will accept the patch to itself, and broadcast the patch to other nodes.
2. if server: broadcast the patch to nodes, if any.

### `3` Race conditions and conflict resolutions <a id='race-conditions'>§</a>

1. When multiple processes modify different parts of the object - there is no conflicts and the patch order has no matter.
2. When multiple patches for the same data are made - the host acts as the source of truth - it accepts the patches by timestamp (_patch creation date by client_),  if for any reason a patch is delivered to the host with older timestamp, as already was applied, it will be rejected and the sender (the client) will be notified about current state and current patches.


### `4` RPC <a id='rpc'>§</a>

```ts
// process #1
let memsync = new MemSync({
    name: 'foo',
    rpc: {
        getFoo () { return 'bar'; }
    }
);
await memsync.start();
```

```ts
// process #2
let memsync = new MemSync({
    name: 'foo',
});
await memsync.start();

let str = await memsync.call('getFoo');
// str === 'bar'
```

### `5` [Events](#events)

Each process can emit and listen to events

```ts
// process #1
memsync.events.emit('foo', 123);

// process #2
memsync.events.on('foo', num => {
    console.log('Lorem', 123);
})
```

### `6` Object Observer <a id='observer'>§</a>

Observe the objects properties
```ts
memsync.observe('foo', (fooValue) => {
    console.log(`FooValue changed`, fooValue);
})
```

### `7` Mutex <a id='mutex'>§</a>

By using `writer` role and specifying a `maxWriters` property to `1` for the instance, you make sure there is only one worker at a time.


```ts
// process #1
import { MemSync } from 'memsync'
let memsync = new MemSync({
    name: 'foo',
    options: {
        peer: {
            roles: ['writer']
        }
        network: {
            maxWriters: 1
        }
    }
});
await memsync.start();

// process #2
import { MemSync, MemErrors } from 'memsync'

let memsync = new MemSync({
    name: 'foo',
    options: {
        peer: {
            roles: ['writer']
        }
        network: {
            maxWriters: 1
        }
    }
});
try {
    await  memsync.start();
} catch (error) {
    error.code === MemErrors.ERR_MAX_WRITERS
}


```

### `8` Storage <a id='storage'>§</a>

You can load/save objects to the fs. We use [`atma-io`](https://github.com/atmajs/atma-io) for this, and so you can use not just `file://` protocol, but any other load `atma-io` supports, for example [`atma-io-transport-s3`](https://github.com/atmajs/atma-io-transport-s3) to load from any `S3` compatible storage.
```ts
let mem = new MemSync('storage', { num: 0 }, {
    file: {
        path: 's3://my/storage.json'
    }
});
```



### `9` Server <a id='server'>§</a>

The process may expose a server to query the object and its current state

```js
let memory = new MemSync('foo-bar', { num: 0 }, {
    server: { port: 8883 }
});
// Starts memory sync process, and also exposes the 8883 for http queries
await memory.start();
```

You can query the state of the `foo-bar` object from extern

```sh
curl http://localhost:8883/foo-bar

//e.g.> `{ num: 1 }`
```


### `stop` Stop <a id='stop'>§</a>

You can stop the node anytime
1. if it is a client, it just disconnects
2. if it is a server, it also stops listening, and one of alive nodes (if any) will act then as a server

```ts
memsync.stop()
```



----
