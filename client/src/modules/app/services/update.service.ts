import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../../shared/services/notification.service';
import {WindowRef} from '../../shared/services/windowRef';

@Injectable()
export class UpdateService {
    private _subscription: Subscription;
    private _window: Window;

    constructor(private _swUpdate: SwUpdate, private _notificationService: NotificationService, _windowRef: WindowRef) {
        this._window = _windowRef.nativeWindow;
    }

    public register(): void {
        this._subscription = this._swUpdate.available.subscribe(event => {
                this._notificationService.showNotification('Update available!', 'Please reload to update the application');
            }
        );
    }

    public unregister(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}
