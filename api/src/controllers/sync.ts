import {BaseController} from './base';
import {HttpServer} from '../server/httpServer';
import {Request, Response} from 'restify';
import {ISyncItem} from '../models/syncItem.interface';
import uuid = require('uuid');

export class SyncController implements BaseController {
    private _items: Array<ISyncItem> = [];

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
