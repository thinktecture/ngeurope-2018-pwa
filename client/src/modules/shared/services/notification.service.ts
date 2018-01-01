import {Observable} from 'rxjs/Observable';

export class NotificationService {
    public showNotification(title: string, text: string): Observable<boolean> {

        console.log(`${title}:${text}`);
        return Observable.of(true);
    }
}
