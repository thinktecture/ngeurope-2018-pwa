import {NotificationService} from './notification';
import {ShareService} from './share';
import {WindowRef} from './windowRef';
import {AppDatabase} from './base/appDatabase';
import {AppDatabaseRef} from './appDatabase.ref';

export const APP_SERVICES = [
    NotificationService,
    ShareService,
    WindowRef,
    { provide: AppDatabase, useClass: AppDatabaseRef }
];

