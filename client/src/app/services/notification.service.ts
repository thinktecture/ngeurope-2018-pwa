import {Injectable} from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {Observable} from 'rxjs/Observable';
import {switchMap} from 'rxjs/operators';
import 'rxjs/add/observable/fromPromise';
import {ApiService} from './base/api.service';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class NotificationService {
    private _subscription: Subscription;

    constructor(private _swPush: SwPush, private _apiService: ApiService) {
    }

    public register(): void {
        if (!this._swPush.isEnabled) {
            return;
        }

        // Key generation: https://web-push-codelab.glitch.me/
        this._subscription = Observable
            .fromPromise(this._swPush.requestSubscription({
                serverPublicKey: environment.push.publicKey
            }))
            .pipe(
                switchMap(subscription => console.log(subscription) || this._apiService.post('push/register', subscription))
            )
            .subscribe();
    }

    public unregister(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}
