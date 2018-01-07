import {Component, ElementRef, ViewChild} from '@angular/core';
import {WindowRef} from '../../../shared/services/windowRef';
import {TodoService} from '../../../shared/services/base/todo.service';
import {PushNotificationService} from '../../../shared/services/pushNotification.service';
import {NotificationService} from '../../../shared/services/notification.service';
import {ApiService} from '../../../shared/services/base/api.service';

@Component({
    templateUrl: 'debug.component.html',
    styleUrls: ['debug.component.scss']
})
export class DebugComponent {
    private _window: Window;

    @ViewChild('info')
    public info: ElementRef;
    public debugInfo = '';

    constructor(windowRef: WindowRef, private _todoService: TodoService, private _pushNotificationService: PushNotificationService,
                private _notificationService: NotificationService, private _apiService: ApiService) {
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

    public showTestNotification(): void {
        this._notificationService.showNotification('ngEurope 2018 Workshop', 'Hello audience! Nice to meet you!');
    }

    public sendPushNotification(): void {
        this._apiService.post('push/notifyAll', {
            title: 'Push Notification',
            body: 'This is a push notification!'
        }).subscribe();
    }

    private _addDebugInfo(info: string) {
        this.debugInfo += `${info}\r\n`;
        this.info.nativeElement.scrollTop = this.info.nativeElement.scrollHeight;
    }
}
