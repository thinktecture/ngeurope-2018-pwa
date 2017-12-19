import Dexie from 'dexie';

export class DatabaseService extends Dexie {
    constructor() {
        super('ngEuropePWAWorkshop');
        this._initDatabase();
    }

    private _initDatabase() {
        this.version(1).stores({
            todos: '++id'
        });
    }
}
