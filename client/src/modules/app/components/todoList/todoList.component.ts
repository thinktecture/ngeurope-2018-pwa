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
        this._deleteItem(item);
        this.activeItemIndex = -1;
    }

    private _deleteItem(item: ITodoItem): void {
        this.itemDeleted.emit(item);
    }

    public shareItem(item: ITodoItem): void {
        if (item.syncId) {
            this._shareService.share('New Todo!', item.text, this._shareUrl)
                .subscribe(success => {
                    if (!success) {
                        this._notificationService.showNotification('Error!', 'Sharing Todo item failed!');
                    }
                })
        }
    }

    public focusItem(item: ITodoItem, index: number): void {
        this.activeItemIndex = index;
        this._isNewItem = !item.text;
        this._itemCopy = Object.assign({}, item);
    }

    public activateItem(itemToActivate: ITodoItem): void {
        const index = this.items.findIndex(item => item === itemToActivate);
        if (index >= 0) {
            this.inputFields.forEach((inputField, itemIndex) => {
                if (itemIndex === index) {
                    inputField.nativeElement.focus();
                }
            });
        }
    }

    public leaveEditMode(itemIndex: number): void {
        if (this.activeItemIndex === itemIndex) {
            const item = this.items[itemIndex];
            if (this._isNewItem && !item.text) {
                this._isNewItem = false;
                return;
            }
            this._isNewItem = false;
            if (this._itemCopy.text) {
                if (item.text) {
                    this.saveItem(item);
                } else {
                    this.items[this.activeItemIndex] = this._itemCopy;
                }
            } else {
                this._deleteItem(this.items[this.activeItemIndex]);
            }

            this.inputFields.forEach((field, fieldIndex) => {
                if(fieldIndex === this.activeItemIndex){
                    field.nativeElement.blur();
                }
            });
            this.activeItemIndex = -1;
        }
    }

    public cancel(): void {
        const activeItem = this.items[this.activeItemIndex];
        this.inputFields.forEach((inputField, itemIndex) => {
            if (itemIndex === this.activeItemIndex) {
                inputField.nativeElement.blur();
            }
        });
        if (this._itemCopy.text) {
            this.items[this.activeItemIndex] = this._itemCopy;
        } else {
            this._deleteItem(activeItem);
        }

        this.activeItemIndex = -1;
    }

    public handleKey(event) {
        if (event.keyCode === 13) { // Enter
            const item = this.items[this.activeItemIndex];
            if (!item.text) {
                this._deleteItem(this.items[this.activeItemIndex]);
            } else {
                this.saveItem(item);
            }
            this.inputFields.forEach((item, itemIndex) => {
                if (itemIndex === this.activeItemIndex) {
                    item.nativeElement.blur();
                    this.activeItemIndex = -1;
                    return;
                }
            });
        }
    }

    public readonly trackByFn = index => index;
}

