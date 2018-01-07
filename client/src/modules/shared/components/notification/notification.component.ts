import {Component, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: 'notification.component.html',
})
export class NotificationComponent implements OnInit {
    public title: string;
    public message: string;
    public isActive: boolean;

    constructor(private _notificationService: NotificationService) {

    }

    public ngOnInit(): void {
        this._notificationService.notifications.subscribe(notification => {
            this.title = notification.title;
            this.message = notification.message;
            this.isActive = true;
        })
    }

    public close():void {
        this.isActive = false;
    }
}
