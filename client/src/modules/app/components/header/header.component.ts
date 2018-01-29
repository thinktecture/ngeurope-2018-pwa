import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {filter, map, mergeMap, tap} from 'rxjs/operators';
import {AppStateService} from '../../../shared/services/appState.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
    private _onlineChangeSubscription: Subscription;

    public title: string;
    public isAppOnline = true;

    constructor(private _router: Router, private _route: ActivatedRoute, private _appStateService: AppStateService) {
    }

    public ngOnInit(): void {
        this._router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this._route),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                mergeMap((route) => route.data),
                tap(event => this.title = event.title)
            ).subscribe();

        this._appStateService.initialize();
        this._onlineChangeSubscription = this._appStateService.onlineStateChange.subscribe(online => this.isAppOnline = online);
    }

    public ngOnDestroy(): void {
        this._appStateService.dispose();
        if (this._onlineChangeSubscription) {
            this._onlineChangeSubscription.unsubscribe();
        }
    }
}
