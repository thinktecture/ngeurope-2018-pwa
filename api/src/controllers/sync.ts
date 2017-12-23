import {BaseController} from './base';
import {HttpServer} from '../server/httpServer';
import {Request, Response} from 'restify';
import {ISyncItem} from '../models/syncItem.interface';
import uuid = require('uuid');

export class SyncController implements BaseController {
    private _items: Array<any> = [{
        syncId: '11e94ce4-e717-41d5-9a67-e70331cd7a42',
        deleted: false,
        completed: false,
        text: 'Prepare ngEurope demo'
    }, {
        syncId: '60d09e91-651d-41d3-bc6b-5500cbcc53bf',
        deleted: false,
        completed: false,
        text: 'Prepare ngEurope slides'
    }];

    public setup(httpServer: HttpServer): void {
        httpServer.post('/sync', this._sync.bind(this));
    }

    private async _sync(req: Request, res: Response) {
        const list: Array<ISyncItem> = req.body;

        list.forEach(syncItem => {
            console.log('Item: ', syncItem);
            const index = this._items.findIndex(item => item.syncId === syncItem.syncId);
            console.log(index);
            if (index >= 0) {
                this._items[index] = syncItem;
            } else {
                if (!syncItem.syncId) {
                    syncItem.syncId = uuid.v4();
                }

                this._items.push(syncItem);
            }
        });

        res.send(200, this._items);
    }
}
