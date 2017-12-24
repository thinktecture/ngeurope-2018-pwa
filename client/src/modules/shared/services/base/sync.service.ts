import {ISyncItem} from '../../models/contracts/syncItem.interface';

export abstract class SyncService {
    abstract sync(collection: Array<ISyncItem>): any;
}
