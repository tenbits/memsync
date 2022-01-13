import { ServerResponse, IncomingMessage } from 'http';
import { SharedObject } from '../mem/SharedObject';

export class Middleware {

    private objects: { [name: string]: SharedObject } = {};

    register(name: string, object: SharedObject) {
        this.objects[name] = object;
    }

    process (req: IncomingMessage, res: ServerResponse, next) {
        let name = req.url.substring(1);
        let obj = this.objects[name];
        if (obj == null) {
            next();
            return;
        }
        let json = JSON.stringify(obj.data, null, 2);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(json);
    }
}
