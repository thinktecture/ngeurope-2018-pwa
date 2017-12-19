import Dexie from 'dexie';
import {TodoItem} from '../../models/todoItem';

export class AppDatabase extends Dexie {

    public todos: Dexie.Table<TodoItem, number>;

    constructor() {
        super('ngEuropePWAWorkshop');
        this._initDatabase();
    }

    private _initDatabase() {
        this.version(1).stores({
            todos: '++id, text, completed'
        });

        this.todos.mapToClass(TodoItem);
    }
}
