import {Component, EventEmitter, Output} from '@angular/core';
import {ITodoItem} from '../../../shared/models/contracts/todoItem.interface';
import {TodoItem} from '../../../shared/models/todoItem.model';

@Component({
    selector: 'todo-list-add',
    templateUrl: 'todoListAdd.component.html',
    styleUrls: ['todoListAdd.component.scss']
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
