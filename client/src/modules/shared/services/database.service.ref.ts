import {DatabaseService} from './base/database.service';
import {Injectable} from '@angular/core';

@Injectable()
export class DatabaseServiceRef extends DatabaseService {
    constructor() {
        super();
    }
}
