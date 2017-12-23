import {ITodoItem} from './contracts/todoItem.interface';

export class TodoItem implements ITodoItem {
    public text = '';
    public completed = false;

    // IDatabaseItem
    public id: number;

    // ISyncItem
    public syncId = '';
    public deleted = false;
    public changed = false;
}
