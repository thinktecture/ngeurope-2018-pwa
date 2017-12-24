import {Component, ElementRef, ViewChild} from '@angular/core';
import {WindowRef} from '../../../shared/services/windowRef';
import {TodoService} from '../../../shared/services/base/todo.service';
import {PushNotificationService} from '../../../shared/services/pushNotification.service';

@Component({
    templateUrl: 'debug.component.html',
    styleUrls: ['debug.component.scss']
})
export class DebugComponent {
    private _window: Window;

    @ViewChild('info')
    public info: ElementRef;
    public debugInfo = '';

    constructor(windowRef: WindowRef, private _todoService: TodoService, private _pushNotificationService: PushNotificationService) {
        this._window = windowRef.nativeWindow;
    }

    public clearDatabase(): void {
        this._todoService.clear().then(() => this._addDebugInfo('Database cleared.'))
    }

    public unregisterPush(): void {
        this._pushNotificationService.unregister()
            .subscribe(success => {
                if (success) {
                    this._addDebugInfo('Push notifications unregistered.');
                } else {
                    this._addDebugInfo('Unregister push notification failed.')
                }
            })
    }

    public unregisterServiceWorker(): void {
        this._window.navigator.serviceWorker.getRegistrations()
            .then(registrations => {
                registrations.forEach(registration => registration.unregister());
                this._addDebugInfo('Service worker unregistered.');
            })
    }

    public clearInfo(): void {
        this.debugInfo = '';
    }

    private _addDebugInfo(info: string) {
        this.debugInfo += `${info}\r\n`;
        this.info.nativeElement.scrollTop = this.info.nativeElement.scrollHeight;
    }
}
