import * as http from 'http'
import { SharedObject } from '../mem/SharedObject';
import { Middleware } from './Middleware';

const servers: { [port: string]: Server} = {};

export class Server {

    private middleware = new Middleware()

    register(name: string, object: SharedObject) {
        this.middleware.register(name, object);
    }


    start(port: number): this {
        http
            .createServer((req, res) => {
                this.middleware.process(req, res, () => {
                    res.statusCode = 404;
                    res.end();
                });
            })
            .listen(port);
        return this;
    }

    static create (port: number): Server {
        return servers[port] ?? (servers[port] = new Server().start(port))
    }
}
