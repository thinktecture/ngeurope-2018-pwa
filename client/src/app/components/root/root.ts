import {Component, OnDestroy, OnInit} from '@angular/core';
import {NotificationService} from '../../services/notification.service';
import {UpdateService} from '../../services/update.service';

@Component({
    selector: 'app-root',
    templateUrl: 'root.html',
    styleUrls: ['root.scss']
})
export class RootComponent implements OnInit, OnDestroy {
    constructor(private _notifcationService: NotificationService, private _updateService: UpdateService) {
    }

    public ngOnInit(): void {
        this._notifcationService.register();
        this._updateService.register();
    }

    public ngOnDestroy(): void {
        this._notifcationService.unregister();
        this._updateService.unregister();
    }
}
