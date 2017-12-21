import {Component, OnDestroy, OnInit} from '@angular/core';
import {PushNotificationService} from '../../services/pushNotification.service';
import {UpdateService} from '../../services/update.service';

@Component({
    selector: 'app-root',
    templateUrl: 'root.html',
    styleUrls: ['root.scss']
})
export class RootComponent implements OnInit, OnDestroy {
    constructor(private _pushNotifcationService: PushNotificationService, private _updateService: UpdateService) {
    }

    public ngOnInit(): void {
        this._pushNotifcationService.register();
        this._updateService.register();
    }

    public ngOnDestroy(): void {
        this._pushNotifcationService.unregister();
        this._updateService.unregister();
    }
}
