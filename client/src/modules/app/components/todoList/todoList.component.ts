import {
    ChangeDetectorRef, Component, ElementRef, EventEmitter, Inject, Input, OnChanges, Output, QueryList, SimpleChanges,
    ViewChildren
} from '@angular/core';
import {ITodoItem} from '../../../shared/models/contracts/todoItem.interface';
import {ShareService} from '../../../shared/services/share.service';
import {NotificationService} from '../../../shared/services/notification.service';
import {TodoItem} from '../../../shared/models/todoItem.model';
import {ActivatedRoute, Router} from '@angular/router';
import {WINDOW} from '../../../shared/services/window.token';

@Component({
    selector: 'todo-list',
    templateUrl: 'todoList.component.html',
})
export class TodoListComponent implements OnChanges {
    @Input() public items: Array<ITodoItem>;
    @Output() public itemChanged = new EventEmitter<ITodoItem>();
    @Output() public itemDeleted = new EventEmitter<ITodoItem>();
    @ViewChildren('text') public inputFields: QueryList<ElementRef>;

    public activeItemIndex: number;

    private _shareUrl: string;
    private _itemCopy: ITodoItem;
    private _hasNewItem: boolean;

    constructor(private _shareService: ShareService, private _notificationService: NotificationService, @Inject(WINDOW) _window: Window,
                private _changeDetectorRef: ChangeDetectorRef, private _activatedRoute: ActivatedRoute, private _router: Router) {
        this._shareUrl = _window.location.href;
    }

    public ngOnChanges(changes: SimpleChanges): void {
        if (changes.items && this.items) {
            const itemIndex = this.items.findIndex(item => item.syncId && item.syncId === this._activatedRoute.snapshot.queryParams.id);
            if (itemIndex >= 0) {
                this.activeItemIndex = itemIndex;
            }
        }
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

    public onFocusItem(item: ITodoItem, index: number): void {
        this.activeItemIndex = index;
        this._hasNewItem = !item.text;
        this._itemCopy = Object.assign({}, item);
        this._router.navigate(['/home'], { queryParams: { id: item.syncId } })
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

    public addNewItem(): void {
        const newItem = new TodoItem();
        if (this.activeItemIndex >= 0) {
            this.leaveEditMode(this.activeItemIndex, true);
        }
        this.items.unshift(newItem);
        this._changeDetectorRef.detectChanges(); // Refresh ViewChildren
        this.activateItem(newItem);
    }

    public leaveEditMode(itemIndex: number, blurInputField: boolean): void {
        if (this.activeItemIndex === itemIndex) {
            const item = this.items[itemIndex];
            // Necessary because FAB is an outsideclick
            if (this._hasNewItem && !item.text) {
                this._hasNewItem = false;
                return;
            }
            this._hasNewItem = false;
            if (this._itemCopy.text) {
                if (item.text) {
                    this.saveItem(item);
                } else {
                    this.items[itemIndex] = this._itemCopy;
                }
            } else {
                if (item.text) {
                    this.saveItem(item);
                } else {
                    this._deleteItem(this.items[itemIndex]);
                }
            }

            if (blurInputField) {
                this._blurInputField(itemIndex);
            }
        }
    }

    public cancel(): void {
        const activeItem = this.items[this.activeItemIndex];
        if (this._itemCopy.text) {
            this.items[this.activeItemIndex] = this._itemCopy;
        } else {
            this._deleteItem(activeItem);

        }
        this.activeItemIndex = -1;
        this._blurAllFields(); // List has changed and blur is necessary
    }

    public handleKey(event) {
        if (event.keyCode === 13) { // Enter
            const item = this.items[this.activeItemIndex];
            if (!item.text) {
                if (this._itemCopy.text) {
                    this.items[this.activeItemIndex] = this._itemCopy;
                } else {
                    this._deleteItem(this.items[this.activeItemIndex]);
                }
            }
            this._blurInputField(this.activeItemIndex);
            this.activeItemIndex = -1;
        }
    }

    public leaveList() {
        if (!this._hasNewItem && this.activeItemIndex >= 0) {
            this.leaveEditMode(this.activeItemIndex, false);
            this.activeItemIndex = -1;
            this._blurAllFields();
        }
    }

    public readonly trackByFn = index => index;

    private _blurInputField(index: number) {
        this.inputFields.forEach((field, fieldIndex) => {
            if (fieldIndex === index) {
                field.nativeElement.blur();
            }
        });
    }

    private _blurAllFields(): void {
        this.inputFields.forEach((field) => {
            field.nativeElement.blur();
        });
    }
}

