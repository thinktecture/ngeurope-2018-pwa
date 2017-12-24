import {Component, OnInit} from '@angular/core';
import {TodoService} from '../../../shared/services/base/todo.service';
import {ITodoItem} from '../../../shared/models/contracts/todoItem.interface';
import {SyncService} from '../../../shared/services/base/sync.service';

@Component({
    selector: 'app-home',
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {
    public items: Array<ITodoItem>;

    constructor(private _todoService: TodoService, private _syncService: SyncService) {
    }

    public ngOnInit(): void {
        this._todoService.getAll(false)
            .then(items => this.items = items);
    }

    public updateItem(item: ITodoItem): void {
        this._todoService.update(item)
            .then(success => console.log(success));
    }

    public addItem(item: ITodoItem): void {
        this._todoService.add(item)
            .then(id => {
                if (id) {
                    this.items.push(item);
                }
            });
    }

    public deleteItem(item: ITodoItem): void {
        this._todoService.delete(item)
            .then(
                () => {
                    const index = this.items.indexOf(item);
                    if (index >= 0) {
                        this.items.splice(index, 1);
                    }
                },
                (error) => console.log('Error while deleting!', error)
            );
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
}
