import {Injectable} from '@angular/core';
import {SwPush} from '@angular/service-worker';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/observable/of';
import {ApiService} from './base/api.service';
import {environment} from '../../../environments/environment';

@Injectable()
export class PushNotificationService {
    private _pushSubscription: PushSubscription;

    constructor(private _swPush: SwPush, private _apiService: ApiService) {
    }

    public async register(): Promise<void> {
        if (!this._swPush.isEnabled) {
            console.log('Push:', this._swPush.isEnabled);
            return;
        }

        const subscription = await this._swPush.requestSubscription({ serverPublicKey: environment.push.publicKey });
        this._pushSubscription = subscription;
        this._apiService.post('push/register', subscription).subscribe();
    }

    public unregister(): Observable<boolean> {
        if (this._pushSubscription) {
            return Observable.fromPromise(this._pushSubscription.unsubscribe());
        }

        return Observable.of(true);
    }
}
