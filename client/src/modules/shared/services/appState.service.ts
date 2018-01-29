import {Inject, Injectable, Renderer2, RendererFactory2} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {WINDOW} from './window.token';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AppStateService {
    private _renderer: Renderer2;
    private readonly _stateChange = new BehaviorSubject<boolean>(true);
    private _onlineListenerFn = () => void 0;
    private _offlineListenerFn = () => void 0;

    public get onlineStateChange(): Observable<boolean> {
        return this._stateChange;
    }

    constructor(_factory: RendererFactory2, @Inject(WINDOW) private _window) {
        this._renderer = _factory.createRenderer(this._window, null);
        this._stateChange.next(this._window.navigator.onLine);
    }

    public initialize(): void {
        this._onlineListenerFn = this._renderer.listen(this._window, 'online', () => this._stateChange.next(true));
        this._offlineListenerFn = this._renderer.listen(this._window, 'offline', () => this._stateChange.next(false));
    }

    public dispose(): void {
        this._onlineListenerFn();
        this._onlineListenerFn();
    }
}
