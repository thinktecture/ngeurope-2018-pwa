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

    public async update(item: ITodoItem): Promise<boolean> {
        item.changed = true;
        return !!(await this.table.update(item.id, item));
    }

    public async delete(item: ITodoItem): Promise<boolean> {
        if (!item.syncId) {
            await this.table.delete(item.id);
            return Promise.resolve(true);
        } else {
            item.deleted = true;
            return !!(await this.table.update(item.id, item));
        }
    }

    public async overwrite(list: Array<ITodoItem>): Promise<Array<ITodoItem>> {
        // Delete IDs to prevent duplicate key
        list.forEach(item => delete item.id);

        await this.table.clear();
        await this.table.bulkAdd(list);
        return this.getAll(false);
    }

    public clear(): Promise<void> {
        return this.table.clear();
    }
}

