import {Component, OnDestroy, OnInit} from '@angular/core';
import {PushNotificationService} from '../../services/pushNotification.service';
import {UpdateService} from '../../services/update.service';

@Component({
    selector: 'app-root',
    templateUrl: 'root.component.html',
    styleUrls: ['root.component.scss']
})
export class RootComponent implements OnInit, OnDestroy {
    constructor(private _pushNotificationService: PushNotificationService, private _updateService: UpdateService) {
    }

    public ngOnInit(): void {
        this._pushNotificationService.register();
        this._updateService.register();
    }

    public ngOnDestroy(): void {
        this._pushNotificationService.unregister();
        this._updateService.unregister();
    }
}
