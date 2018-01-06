import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

@Component({
    selector: 'app-header',
    templateUrl: 'header.component.html',
})
export class HeaderComponent implements OnInit {
    public title: string;

    constructor(private _router: Router, private _route: ActivatedRoute) {
    }

    public ngOnInit():void {
        this._router.events
            .filter((event) => event instanceof NavigationEnd)
            .map(() => this._route)
            .map((route) => {
                while (route.firstChild) route = route.firstChild;
                return route;
            })
            .mergeMap((route) => route.data)
            .subscribe((event) => {
                this.title = event.title;
            });
    }
}
