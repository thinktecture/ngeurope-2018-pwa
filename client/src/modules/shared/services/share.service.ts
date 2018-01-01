import {Injectable} from '@angular/core';
import {FeatureService} from './feature.service';
import {WindowRef} from './windowRef';
import {Observable} from 'rxjs/Observable';
import {BrowserFeatureKey} from '../models/browserFeatureKey.model';

@Injectable()
export class ShareService {
    private _window: Window;

    constructor(private _featureService: FeatureService, _windowRef: WindowRef) {
        this._window = _windowRef.nativeWindow;
    }

    public share(title: string, text: string, url: string): Observable<boolean> {
        const feature = this._featureService.detectFeature(BrowserFeatureKey.WebShareAPI);
        if (feature.supported) {
            return Observable.fromPromise(this._share(title, text, url));
        } else {
            this._sendMail(title, text, url);
            return Observable.of(true);
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
