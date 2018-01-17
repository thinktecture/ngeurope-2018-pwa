import {Inject, Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../../shared/services/notification.service';
import {WINDOW} from '../../shared/services/window.token';

@Injectable()
export class UpdateService {
    private _subscription: Subscription;

    constructor(private _swUpdate: SwUpdate, private _notificationService: NotificationService,
                @Inject(WINDOW) private _window: Window) {
    }

    public register(): void {
        this._subscription = this._swUpdate.available.subscribe(() => {
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
