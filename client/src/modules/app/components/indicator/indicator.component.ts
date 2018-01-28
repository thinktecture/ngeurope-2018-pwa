import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppStateService} from '../../../shared/services/appState.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-indicator',
    templateUrl: 'indicator.component.html'
})
export class IndicatorComponent implements OnInit, OnDestroy {
    private _stateChangeSubscription: Subscription;
    public isAppOnline: boolean;

    constructor(private _appStateService: AppStateService) {
    }

    public ngOnInit(): void {
        this._appStateService.initialize();
        this._stateChangeSubscription = this._appStateService.onlineStateChange.subscribe(online => this.isAppOnline = online);
    }

    public ngOnDestroy(): void {
        this._appStateService.dispose();
        if (this._stateChangeSubscription) {
            this._stateChangeSubscription.unsubscribe();
        }
    }
}
