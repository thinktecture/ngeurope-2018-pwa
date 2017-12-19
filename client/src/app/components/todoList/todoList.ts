import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITodoItem} from '../../models/contracts/todoItem';

@Component({
    selector: 'todo-list',
    templateUrl: 'todoList.html'
})
export class TodoListComponent {
    @Input() public items: Array<ITodoItem>;
    @Output() public itemCompletedChanged = new EventEmitter<ITodoItem>();

    public itemChanged(item: ITodoItem) {
        this.itemCompletedChanged.next(item);
    }
}
