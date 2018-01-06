import {DatabaseService} from './database.service';
import {ITodoItem} from '../../models/contracts/todoItem.interface';
import Dexie from 'dexie';

export class TodoService {
    protected table: Dexie.Table<ITodoItem, number>;

    constructor(private _databaseService: DatabaseService) {
        this.table = this._databaseService.table('todos');
    }

    public getAll(includeDeleted: boolean): Promise<Array<ITodoItem>> {
        if (includeDeleted) {
            return this.table.toArray();
        }
        return this.table.filter(item => !item.deleted).reverse().toArray();
    }

    public add(item: ITodoItem): Promise<number> {
        return this.table.put(item);
    }

    public update(item: ITodoItem): Promise<boolean> {
        item.changed = true;
        return this.table.update(item.id, item)
            .then(success => !!success)
    }

    public delete(item: ITodoItem): Promise<boolean> {
        item.deleted = true;
        return this.table.update(item.id, item)
            .then(success => !!success);
    }

    public overwrite(list: Array<ITodoItem>): Promise<Array<ITodoItem>> {
        // Delete IDs to prevent duplicate key
        list.forEach(item => delete item.id);

        return this.table.clear()
            .then(() => this.table.bulkAdd(list))
            .then(() => this.getAll(false));
    }

    public clear(): Promise<void> {
        return this.table.clear();
    }
}

