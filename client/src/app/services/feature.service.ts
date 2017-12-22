import {Injectable} from '@angular/core';
import {FeatureSupport} from '../models/featureSupport';
import {WindowRef} from './windowRef';

@Injectable()
export class FeatureService {
    private _window: Window;
    private _nav: Navigator;

    constructor(windowRef: WindowRef) {
        this._window = windowRef.nativeWindow;
        this._nav = this._window.navigator;
    }

    public detectFeatures(): Array<FeatureSupport> {
        return [
            new FeatureSupport('Offline Capabilities', 'caches' in this._window),
            new FeatureSupport('Push', 'PushManager' in this._window),
            new FeatureSupport('Notifications', 'Notification' in this._window),
            new FeatureSupport('Add to Homescreen', 'BeforeInstallPromptEvent' in this._window),
            new FeatureSupport('Background sync', 'SyncManager' in this._window),
            new FeatureSupport('Navigation Preload', 'NavigationPreloadManager' in this._window),
            new FeatureSupport('Budget API', 'budget' in this._nav && 'reserve' in (<any>this._nav).budget),
            new FeatureSupport('Storage Estimation', 'storage' in this._nav && 'estimate' in (<any>this._nav).storage),
            new FeatureSupport('Persistent Storage', 'storage' in this._nav && 'persist' in (<any>this._nav).storage),
            new FeatureSupport('Web Share', 'share' in this._nav),
            new FeatureSupport('Media Session', 'mediaSession' in this._nav),
            new FeatureSupport('Media Capibilities', 'mediaCapabilities' in this._nav),
            new FeatureSupport('Device Memory', 'deviceMemory' in this._nav),
            new FeatureSupport('Getting Installed Related Apps', 'getInstalledRelatedApps' in this._nav),
            new FeatureSupport('Payment Request', 'PaymentRequest' in this._window),
            new FeatureSupport('Credential Management', 'credentials' in this._nav)
        ];
    }
}
