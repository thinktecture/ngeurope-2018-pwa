import {ITodoItem} from './contracts/todoItem.interface';

export class TodoItem implements ITodoItem {
    public id: number;
    public text = '';
    public completed = false;
    public syncId = '';
    public deleted = false;
}
