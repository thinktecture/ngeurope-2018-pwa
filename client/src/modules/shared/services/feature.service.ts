import {Inject, Injectable} from '@angular/core';
import {BrowserFeatureKey} from '../models/browserFeatureKey.model';
import {BrowserFeature} from '../models/browserFeature.model';
import {detect} from 'detect-browser';
import {WINDOW} from './window.token';

@Injectable()
export class FeatureService {
    private _nav: Navigator;
    private _browser: any;

    private _features: any;

    constructor(@Inject(WINDOW) private _window: Window) {
        this._nav = this._window.navigator;
        this._browser = detect();

        this._features = {
            [BrowserFeatureKey.ServiceWorker]: 'serviceWorker' in this._window.navigator,
            [BrowserFeatureKey.Cache]: 'caches' in this._window,
            [BrowserFeatureKey.PushAPI]: 'PushManager' in this._window,
            [BrowserFeatureKey.NotificationsAPI]: 'Notification' in this._window,
            [BrowserFeatureKey.BeforeInstallPromptEvent]: 'BeforeInstallPromptEvent' in this._window,
            [BrowserFeatureKey.BackgroundSync]: 'SyncManager' in this._window,
            [BrowserFeatureKey.NavigationPreloadManager]: 'NavigationPreloadManager' in this._window,
            [BrowserFeatureKey.BudgetAPI]: 'budget' in this._nav && 'reserve' in (<any>this._nav).budget,
            [BrowserFeatureKey.StorageEstimation]: 'storage' in this._nav && 'estimate' in (<any>this._nav).storage,
            [BrowserFeatureKey.PersistentStorage]: 'storage' in this._nav && 'persist' in (<any>this._nav).storage,
            [BrowserFeatureKey.WebShareAPI]: 'share' in this._nav,
            [BrowserFeatureKey.MediaSessionAPI]: 'mediaSession' in this._nav,
            [BrowserFeatureKey.MediaCapabilities]: 'mediaCapabilities' in this._nav,
            [BrowserFeatureKey.DeviceMemory]: 'deviceMemory' in this._nav,
            [BrowserFeatureKey.RelatedApps]: 'getInstalledRelatedApps' in this._nav,
            [BrowserFeatureKey.PaymentRequestAPI]: 'PaymentRequest' in this._window,
            [BrowserFeatureKey.CredentialManagement]: 'credentials' in this._nav,
            [BrowserFeatureKey.WebBluetoothAPI]: 'bluetooth' in this._nav,
        };
    }

    public detectFeatures(): Array<BrowserFeature> {
        return Object.keys(this._features).map(key => new BrowserFeature(key, this._features[key]));
    }

    public detectFeature(feature: BrowserFeatureKey): BrowserFeature {
        return new BrowserFeature(feature, this._features[feature]);
    }

    public getBrowserName() {
        return this._browser.name;
    }

    public getBrowserVersion() {
        return this._browser.version;
    }

    public isMobileAndroid(): boolean {
        return this._window.navigator.userAgent.toLowerCase().indexOf('android') > -1;
    }
}
