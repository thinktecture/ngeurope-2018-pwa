import {Injectable} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class UpdateService {
    private _subscription: Subscription;

    constructor(private _swUpdate: SwUpdate) {
    }

    public register(): void {
        console.log('udapte registered');
        this._subscription = this._swUpdate.available.subscribe(event => {
                console.log('Update available:');
                console.log('Current version: ', event.current.hash);
                console.log('Available version: ', event.available.hash);
            }
        );
    }

    public unregister(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    }
}
