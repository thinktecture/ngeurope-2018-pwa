import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ITodoItem} from '../../../shared/models/contracts/todoItem.interface';
import {ShareService} from '../../../shared/services/share.service';
import {NotificationService} from '../../../shared/services/notification.service';
import {WindowRef} from '../../../shared/services/windowRef';

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
    private _shareUrl: string;

    constructor(private _shareService: ShareService, private _notificationService: NotificationService, _windowRef: WindowRef) {
        this._shareUrl = _windowRef.nativeWindow.location.href;
    }

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

    public shareItem(item: ITodoItem): void {
        this._shareService.share('New Todo!', item.text, this._shareUrl)
            .subscribe(success => {
                if (!success) {
                    this._notificationService.showNotification('Error!', 'Sharing Todo item failed!');
                }
            })
    }
}

