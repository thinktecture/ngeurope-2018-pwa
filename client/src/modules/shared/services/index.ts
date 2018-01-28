import {FeatureService} from './feature.service';
import {TodoService} from './base/todo.service';
import {TodoServiceRef} from './todo.service.ref';
import {PushNotificationService} from './pushNotification.service';
import {ApiService} from './base/api.service';
import {ApiServiceRef} from './api.service.ref';
import {SyncService} from './base/sync.service';
import {SyncServiceRef} from './sync.service.ref';
import {DatabaseService} from './base/database.service';
import {DatabaseServiceRef} from './database.service.ref';
import {NotificationService} from './notification.service';
import {ShareService} from './share.service';
import {AppStateService} from './appState.service';

export const SHARED_SERVICES = [
    FeatureService,
    PushNotificationService,
    { provide: TodoService, useClass: TodoServiceRef },
    { provide: ApiService, useClass: ApiServiceRef },
    { provide: SyncService, useClass: SyncServiceRef },
    { provide: DatabaseService, useClass: DatabaseServiceRef },
    NotificationService,
    ShareService,
    AppStateService,
];
