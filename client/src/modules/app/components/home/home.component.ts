import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {TodoService} from '../../../shared/services/base/todo.service';
import {ITodoItem} from '../../../shared/models/contracts/todoItem.interface';
import {SyncService} from '../../../shared/services/base/sync.service';
import {TodoItem} from '../../../shared/models/todoItem.model';
import {TodoListComponent} from '../todoList/todoList.component';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    @ViewChild(TodoListComponent) public list: TodoListComponent;

    public items: Array<ITodoItem>;

    constructor(private _todoService: TodoService, private _syncService: SyncService, private _changeDetectorRef: ChangeDetectorRef) {
    }

    public ngOnInit(): void {
        this._todoService.getAll(false)
            .then(items => this.items = items);
    }

    public updateItem(item: ITodoItem): void {
        if (item.id) {
            this._todoService.update(item);
        } else {
            this._todoService.add(item);
        }

    }

    public deleteItem(item: ITodoItem): void {
        if (item.id) {
            this._todoService.delete(item)
                .then(
                    () => {
                        this._removeItemFromList(item);
                    },
                    (error) => console.log('Error while deleting!', error)
                );
        } else {
            this._removeItemFromList(item);
        }
    }

    public createItem(): void {
        const item = new TodoItem();
        this.items.unshift(item);
        this._changeDetectorRef.detectChanges();
        this.list.activateItem(item);
    }

    public sync(): void {
        this._todoService.getAll(true)
            .then(items => {
                return this._syncService.sync(items)
                    .subscribe(result => {
                        this._todoService.overwrite(result)
                            .then(items => this.items = items);
                    });
            });
    }

    private _removeItemFromList(item: ITodoItem): void {
        const index = this.items.findIndex(listItem => listItem.id === item.id);
        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }
}
