import {Component, EventEmitter, Output} from '@angular/core';
import {ITodoItem} from '../../models/contracts/todoItem';
import {TodoItem} from '../../models/todoItem';

@Component({
    selector: 'todo-list-add',
    templateUrl: 'todoListAdd.html',
    styleUrls: ['todoListAdd.scss']
})
export class TodoListAddComponent {
    @Output() public itemAdded = new EventEmitter<ITodoItem>();
    public item = new TodoItem();

    public addItem() {
        if (!this.item.text) {
            return;
        }
        this.itemAdded.emit(this.item);
        this.item = new TodoItem();
    }
}
