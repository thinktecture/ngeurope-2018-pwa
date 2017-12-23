import {Injectable} from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {Observable} from 'rxjs/Observable';
import {switchMap} from 'rxjs/operators';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import {ApiService} from './base/api.service';
import {environment} from '../../environments/environment';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class PushNotificationService {
    private _subscription: Subscription;
    private _pushSubscription: PushSubscription;

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
                switchMap(subscription => {
                    this._pushSubscription = subscription;
                    return this._apiService.post('push/register', subscription)
                })
            )
            .subscribe();
    }

    public unregister(): Observable<boolean> {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        if (this._pushSubscription) {
            return Observable.fromPromise(this._pushSubscription.unsubscribe());
        }

        return Observable.of(true);
    }
}
