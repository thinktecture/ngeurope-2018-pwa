import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITodoItem} from '../../models/contracts/todoItem.interface';

@Component({
    selector: 'todo-list',
    templateUrl: 'todoList.component.html',
    styleUrls: ['todoList.component.scss']
})
export class TodoListComponent {
    @Input() public items: Array<ITodoItem>;
    @Output() public itemCompletedChanged = new EventEmitter<ITodoItem>();
    @Output() public itemDeleted = new EventEmitter<ITodoItem>();

    public itemChanged(item: ITodoItem, completed: boolean): void {
        item.completed = completed;
        this.itemCompletedChanged.emit(item);
    }

    public deleteItem(item: ITodoItem): void {
        this.itemDeleted.emit(item);
    }
}

