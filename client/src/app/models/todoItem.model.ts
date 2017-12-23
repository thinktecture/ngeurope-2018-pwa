import {ITodoItem} from './contracts/todoItem.interface';

export class TodoItem implements ITodoItem {
    public id: number;
    public text = '';
    public completed = false;

    // ISyncItem
    public syncId = '';
    public deleted = false;
    public changed = false;
}
