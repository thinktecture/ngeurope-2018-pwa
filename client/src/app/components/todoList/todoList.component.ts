import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITodoItem} from '../../models/contracts/todoItem.interface';

@Component({
    selector: 'todo-list',
    templateUrl: 'todoList.component.html',
    styleUrls: ['todoList.component.scss']
})
export class TodoListComponent {
    @Input() public items: Array<ITodoItem>;
    @Output() public itemChanged = new EventEmitter<ITodoItem>();
    @Output() public itemDeleted = new EventEmitter<ITodoItem>();

    public editableItem: ITodoItem;

    public changeItem(item: ITodoItem, completed: boolean): void {
        item.completed = completed;
        this.itemChanged.emit(item);
    }

    public deleteItem(item: ITodoItem): void {
        this.itemDeleted.emit(item);
    }

    public editItem(item: ITodoItem): void {
        this.editableItem = Object.create(item);
    }

    public cancelEdit(): void {
        this.editableItem = null;
    }

    public saveItem(itemIndex: number): void {
        if (this.editableItem.text) {
            this.items[itemIndex] = this.editableItem;
            this.editableItem = null;
            this.itemChanged.emit(this.items[itemIndex]);
        }
    }
}

