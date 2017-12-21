import {ShareService} from './share';
import {WindowRef} from './windowRef';
import {DatabaseService} from './base/database.service';
import {DatabaseServiceRef} from './database.service.ref';
import {TodoService} from './base/todo.service';
import {TodoServiceRef} from './todo.service.ref';
import {ApiServiceRef} from './api.service.ref';
import {ApiService} from './base/api.service';
import {UpdateService} from './update.service';
import {PushNotificationService} from './pushNotification.service';

export const APP_SERVICES = [
    PushNotificationService,
    ShareService,
    WindowRef,
    UpdateService,
    { provide: DatabaseService, useClass: DatabaseServiceRef },
    { provide: TodoService, useClass: TodoServiceRef },
    { provide: ApiService, useClass: ApiServiceRef },
];
