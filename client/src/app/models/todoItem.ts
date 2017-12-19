import {ITodoItem} from './contracts/todoItem';

export class TodoItem implements ITodoItem {
    public id: number;
    public text = '';
    public completed = false;
}
