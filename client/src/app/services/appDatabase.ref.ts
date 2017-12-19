import {AppDatabase} from './base/appDatabase';
import {Injectable} from '@angular/core';

@Injectable()
export class AppDatabaseRef extends AppDatabase {
    constructor() {
        super();
    }
}
