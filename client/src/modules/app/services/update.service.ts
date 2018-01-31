import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {Subscription} from 'rxjs/Subscription';
import {NotificationService} from '../../shared/services/notification.service';

@Injectable()
export class UpdateService {
    private _subscription: Subscription;

    constructor(private _swUpdate: SwUpdate, private _notificationService: NotificationService) {
    }

    public register(): void {
        if (!this._swUpdate.isEnabled) {
            return;
        }
        this._subscription = this._swUpdate.available.subscribe(() => this._notificationService
            .showNotification('Update available!', 'Please reload to update the application'));
    }

    public unregister(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}
