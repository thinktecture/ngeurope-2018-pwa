import {Injectable} from '@angular/core';
import {BrowserFeature} from '../models/browserFeature';
import {WindowRef} from './windowRef';

@Injectable()
export class FeatureService {
    private _window: Window;
    private _nav: Navigator;

    constructor(windowRef: WindowRef) {
        this._window = windowRef.nativeWindow;
        this._nav = this._window.navigator;
    }

    public detectFeatures(): Array<BrowserFeature> {
        return [
            new BrowserFeature('Offline Capabilities', 'caches' in this._window),
            new BrowserFeature('Push', 'PushManager' in this._window),
            new BrowserFeature('Notifications', 'Notification' in this._window),
            new BrowserFeature('Add to Homescreen', 'BeforeInstallPromptEvent' in this._window),
            new BrowserFeature('Background sync', 'SyncManager' in this._window),
            new BrowserFeature('Navigation Preload', 'NavigationPreloadManager' in this._window),
            new BrowserFeature('Budget API', 'budget' in this._nav && 'reserve' in (<any>this._nav).budget),
            new BrowserFeature('Storage Estimation', 'storage' in this._nav && 'estimate' in (<any>this._nav).storage),
            new BrowserFeature('Persistent Storage', 'storage' in this._nav && 'persist' in (<any>this._nav).storage),
            new BrowserFeature('Web Share', 'share' in this._nav),
            new BrowserFeature('Media Session', 'mediaSession' in this._nav),
            new BrowserFeature('Media Capibilities', 'mediaCapabilities' in this._nav),
            new BrowserFeature('Device Memory', 'deviceMemory' in this._nav),
            new BrowserFeature('Getting Installed Related Apps', 'getInstalledRelatedApps' in this._nav),
            new BrowserFeature('Payment Request', 'PaymentRequest' in this._window),
            new BrowserFeature('Credential Management', 'credentials' in this._nav)
        ];
    }
}
