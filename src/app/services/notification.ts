import { HttpClient } from '@angular/common/http';
import { Injectable, Optional } from '@angular/core';
import { SwPush } from '@angular/service-worker';
import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class NotificationService {
  constructor(@Optional() private _swPush: SwPush, private _http: HttpClient) {
  }

  public register(): void {
    if (!this._swPush) {
      return;
    }

    // Key generation: https://web-push-codelab.glitch.me/
    Observable.fromPromise(this._swPush.requestSubscription({
      serverPublicKey: 'BBh_zx5aEnlMyrM8W8anuyxx2ibkb9cUxZclHHDHuBd3uX7PNp-minttLaWe0jpOiHvNfUHXD1rUXTfYf87URlE'
    }))
      .pipe(
        switchMap(subscription => console.log(subscription) || this._http.post('http://localhost:9090/push/register', subscription))
      )
      .subscribe();
  }
}
