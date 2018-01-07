import {FeatureService} from './feature.service';
import {Subject} from 'rxjs/Subject';
import {Notification} from '../models/notification.model';
import {Injectable} from '@angular/core';

@Injectable()
export class NotificationService {
    public notifications = new Subject<Notification>();

    constructor(private _featureService: FeatureService) {

    }

    public showNotification(title: string, text: string): void {
        this.notifications.next(new Notification(title, text));
    }
}
