import {Inject, Injectable} from '@angular/core';
import {FeatureService} from './feature.service';
import {Observable} from 'rxjs/Observable';
import {BrowserFeatureKey} from '../models/browserFeatureKey.model';
import {WINDOW} from './window.token';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {of} from 'rxjs/observable/of';

@Injectable()
export class ShareService {
    constructor(private _featureService: FeatureService, @Inject(WINDOW) private _window: Window) {
    }

    public share(title: string, text: string, url: string): Observable<boolean> {
        const feature = this._featureService.detectFeature(BrowserFeatureKey.WebShareAPI);
        if (feature.supported) {
            return fromPromise(this._share(title, text, url));
        } else {
            this._sendMail(title, text, url);
            return of(true);
        }
    }

    private _share(title: string, text: string, url: string): Promise<boolean> {
        return this._window.navigator.share({
            title: title,
            text: text,
            url: url
        });
    }

    private _sendMail(title: string, text: string, url: string) {
        let body = text;
        if (url) {
            body += '\r\n';
            body += url;
        }

        this._window.location.href = `mailto:?subject=${title}&body=${encodeURIComponent(body)}`;
    }
}
