import {Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren} from '@angular/core';
import {ITodoItem} from '../../../shared/models/contracts/todoItem.interface';
import {ShareService} from '../../../shared/services/share.service';
import {NotificationService} from '../../../shared/services/notification.service';
import {WindowRef} from '../../../shared/services/windowRef';

@Component({
    selector: 'todo-list',
    templateUrl: 'todoList.component.html',
})
export class TodoListComponent {
    @Input() public items: Array<ITodoItem>;
    @Output() public itemChanged = new EventEmitter<ITodoItem>();
    @Output() public itemDeleted = new EventEmitter<ITodoItem>();
    @ViewChildren('text') public inputFields: QueryList<ElementRef>;

    public activeItemIndex: number;

    private _shareUrl: string;
    private _itemCopy: ITodoItem;
    private _isNewItem: boolean;

    constructor(private _shareService: ShareService, private _notificationService: NotificationService, _windowRef: WindowRef) {
        this._shareUrl = _windowRef.nativeWindow.location.href;
    }

    public changeItemCompleted(item: ITodoItem, completed: boolean): void {
        item.completed = completed;
        this.saveItem(item);
    }

    public saveItem(item: ITodoItem): void {
        this.itemChanged.emit(item);
    }

    public deleteItem(item: ITodoItem): void {
        this.itemDeleted.emit(item);
    }

    public shareItem(item: ITodoItem): void {
        this._shareService.share('New Todo!', item.text, this._shareUrl)
            .subscribe(success => {
                if (!success) {
                    this._notificationService.showNotification('Error!', 'Sharing Todo item failed!');
                }
            })
    }

    public setEditModeForItemByIndex(itemIndex: number) {
        this.inputFields.forEach((item, index) => {
            if (index === itemIndex) {
                item.nativeElement.focus();
            }
        });
    }

    public enterEditFieldByIndex(itemIndex: number): void {
        this.activeItemIndex = itemIndex;
        this._isNewItem = !this.items[itemIndex].text;
        this._itemCopy = Object.assign({}, this.items[itemIndex]);
    }

    public leaveEditField(itemIndex: number): void {
        if (this.activeItemIndex === itemIndex && !this._isNewItem) {
            const item = this.items[itemIndex];
            this.saveItem(item);
            this.activeItemIndex = -1;
        }
    }

    public cancel(): void {
        if (this.activeItemIndex >= 0) {
            if (this._itemCopy.text) {
                this.items[this.activeItemIndex] = this._itemCopy;
            } else {
                this.deleteItem(this.items[this.activeItemIndex]);
            }
            this.inputFields.forEach((item, itemIndex) => {
                if (itemIndex === this.activeItemIndex) {
                    item.nativeElement.blur();
                }
            });
        }
    }

    public handleKey(event) {
        if (event.keyCode === 13) { // Enter
            if (!this.items[this.activeItemIndex].text) {
                this.deleteItem(this.items[this.activeItemIndex]);
            }
            this._isNewItem = false;
            this.inputFields.forEach((item, itemIndex) => {
                if (itemIndex === this.activeItemIndex) {
                    item.nativeElement.blur();
                    this.activeItemIndex = -1;
                    return
                }
            });
        }
    }

    public readonly trackByFn = index => index;
}

