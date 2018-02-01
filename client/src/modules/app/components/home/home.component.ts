import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TodoService} from '../../../shared/services/base/todo.service';
import {ITodoItem} from '../../../shared/models/contracts/todoItem.interface';
import {SyncService} from '../../../shared/services/base/sync.service';
import {TodoListComponent} from '../todoList/todoList.component';
import {AppStateService} from '../../../shared/services/appState.service';
import {Subscription} from 'rxjs/Subscription';
import {
    switchMap,
    take
} from 'rxjs/operators';
import {fromPromise} from 'rxjs/observable/fromPromise';

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
    private _stateChangeSubscription: Subscription;

    @ViewChild(TodoListComponent) public list: TodoListComponent;

    public items: Array<ITodoItem>;
    public isAppOnline = true;

    constructor(private _todoService: TodoService, private _syncService: SyncService, private _appStateAService: AppStateService) {
    }

    public async ngOnInit(): Promise<void> {
        this.items = await this._todoService.getAll(false);
        this._stateChangeSubscription = this._appStateAService.onlineStateChange.subscribe(online => this.isAppOnline = online);
    }

    public ngOnDestroy(): void {
        if (this._stateChangeSubscription) {
            this._stateChangeSubscription.unsubscribe();
        }
    }

    public updateItem(item: ITodoItem): void {
        if (item.id) {
            this._todoService.update(item);
        } else {
            this._todoService.add(item);
        }

    }

    public async deleteItem(item: ITodoItem): Promise<void> {
        if (item.id) {
            try {
                await this._todoService.delete(item);
                this._removeItemFromList(item);
            } catch (error) {
                console.log('Error while deleting!', error);
            }
        } else {
            this._removeItemFromList(item);
        }
    }

    public createItem(): void {
        this.list.addNewItem();
    }

    public sync(): void {
        fromPromise(this._todoService.getAll(true))
        .pipe(
            switchMap(items => this._syncService.sync(items)),
            switchMap(result => fromPromise(this._todoService.overwrite(result as Array<ITodoItem>))),
            take(1)
        ).subscribe(items => this.items = items);
    }

    private _removeItemFromList(item: ITodoItem): void {
        const index = this.items.findIndex(listItem => listItem.id === item.id);
        if (index >= 0) {
            this.items.splice(index, 1);
        }
    }
}
