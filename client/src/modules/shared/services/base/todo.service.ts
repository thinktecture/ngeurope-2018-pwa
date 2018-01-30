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
            // TODO
        }
        // TODO
    }

    public add(item: ITodoItem): Promise<number> {
        // TODO
    }

    public async update(item: ITodoItem): Promise<boolean> {
        item.changed = true;
        // TODO
    }

    public async delete(item: ITodoItem): Promise<boolean> {
        item.deleted = true;
        // TODO
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

