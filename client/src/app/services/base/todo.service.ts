import {DatabaseService} from './database.service';
import {ITodoItem} from '../../models/contracts/todoItem';
import Dexie from 'dexie';

export class TodoService {
    protected table: Dexie.Table<ITodoItem, number>;

    constructor(private _databaseService: DatabaseService) {
        this.table = this._databaseService.table('todos');
    }

    public getAll(): Promise<Array<ITodoItem>> {
        return this.table.toArray();
    }

    public add(item: ITodoItem): Promise<number> {
        return this.table.put(item);
    }

    public update(item: ITodoItem): Promise<boolean> {
        return this.table.update(item.id, item)
            .then(success => !!success)
    }

    public delete(item: ITodoItem): Promise<void> {
        return this.table.delete(item.id);
    }
}

