import {Inject, Injectable} from '@angular/core';
import {FeatureService} from './feature.service';
import {Observable} from 'rxjs/Observable';
import {WINDOW} from './window.token';

@Injectable()
export class ShareService {
    constructor(private _featureService: FeatureService, @Inject(WINDOW) private _window: Window) {
    }

    public share(title: string, text: string, url: string): Observable<boolean> {
        // TODO
    }

    private _share(title: string, text: string, url: string): Promise<boolean> {
        // TODO
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
