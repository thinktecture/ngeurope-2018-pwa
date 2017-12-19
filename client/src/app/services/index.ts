import {NotificationService} from './notification';
import {ShareService} from './share';
import {WindowRef} from './windowRef';
import {DatabaseService} from './base/database.service';
import {DatabaseServiceRef} from './database.service.ref';

export const APP_SERVICES = [
    NotificationService,
    ShareService,
    WindowRef,
    { provide: DatabaseService, useClass: DatabaseServiceRef },
];

