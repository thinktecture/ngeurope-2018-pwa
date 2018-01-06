import {Component, OnDestroy, OnInit} from '@angular/core';
import {UpdateService} from '../../services/update.service';
import {PushNotificationService} from '../../../shared/services/pushNotification.service';

@Component({
    selector: 'app-root',
    templateUrl: 'root.component.html',
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
