import {IDatabaseItem} from '../../models/contracts/databaseItem.interface';

export abstract class SyncService {
    abstract sync(collection: Array<IDatabaseItem>);
}
