import {FeatureService} from './feature.service';
import {Subject} from 'rxjs/Subject';
import {AppNotification} from '../models/appNotification.model';
import {Injectable} from '@angular/core';
import {BrowserFeatureKey} from '../models/browserFeatureKey.model';

@Injectable()
export class NotificationService {
    public notifications = new Subject<AppNotification>();

    constructor(private _featureService: FeatureService) {

    }

    public showNotification(title: string, message: string): void {
        if (!this._featureService.detectFeature(BrowserFeatureKey.NotificationsAPI).supported || this._featureService.isMobileAndroid()) {
            this._showInAppNotification(title, message);
        } else {
            Notification.requestPermission(permission => {
                if (permission === 'granted') {
                    const notification = new Notification(title, {
                        body: message
                    });
                } else {
                    this._showInAppNotification(title, message);
                }
            });
        }
    }

    private _showInAppNotification(title: string, message: string): void {
        this.notifications.next(new AppNotification(title, message));
    }
}
