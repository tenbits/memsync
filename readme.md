# MemSync

<p align='center'>
    <img src='./assets/background.jpg'/>
</p>

----
[![Build Status](https://travis-ci.com/tenbits/memsync.svg?branch=master)](https://travis-ci.com/tenbits/memsync)
[![NPM version](https://badge.fury.io/js/memsync.svg)](http://badge.fury.io/js/memsync)


Process-to-process object synchronization. Backed by [`node-ipc`](https://github.com/RIAEvangelist/node-ipc).

* Multiple NodeJS processes can write to and read from the shared object.
* No extra server host process is needed, every process can act as a host, when the host process exits, the host role is taken over by another process.


## API


### Instantiate the memsync object

```ts
import { MemSync } from 'memsync'
let memsync = new MemSync(/* name */ 'my_shared_object', /* defaultObject */ {
    foo: 1,
    bar: 2,
    qux: [ 'one', 'two' ]
});

await memsync.start();
```

`start` discovers other nodes
1. When the server already exists, we connect to the server and receive current object. Now our process holds the up-to-date data, receives new patches from the network and sends the changes to the host. When the host exits, we rediscover the network, and will try to act as a server, as we now holding the up-to-date object.
2. When the process-to-process network does not exists, we create a server and start accepting new processes to join and will later share the current data with the clients


### Make changes

We support partially the `mongodb` [update operators](https://docs.mongodb.com/manual/reference/operator/update/)

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

##### Race conditions and conflict resolutions

1. When multiple processes modify different parts of the object - there is no conflicts and the patch order has no matter.
2. When multiple patches for the same data are made - the host acts as the source of truth - it accepts the patches by timestamp (_patch creation date by client_),  if for any reason a patch is delivered to the host with older timestamp, as already was applied, it will be rejected and the sender (the client) will be notified about current state and current patches.



### Stop

You can stop the node anytime
1. if it is a client, it just disconnects
2. if it is a server, it also stops listening, and one of alive nodes (if any) will act then as a server

```ts
memsync.stop()
```


### Observe

Observe the objects properties
```ts
memsync.observe('foo', (fooValue) => {
    console.log(`FooValue changed`, fooValue);
})
```

----
