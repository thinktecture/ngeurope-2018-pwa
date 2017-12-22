import {IDatabaseItem} from './databaseItem.interface';
import {ISyncItem} from './syncItem.interface';

export interface ITodoItem extends IDatabaseItem, ISyncItem {
    text: string;
    completed: boolean;
    syncId: string;
}
