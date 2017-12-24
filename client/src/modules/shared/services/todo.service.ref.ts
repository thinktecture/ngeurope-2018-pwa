import {Injectable} from '@angular/core';
import {TodoService} from './base/todo.service';
import {DatabaseService} from './base/database.service';

@Injectable()
export class TodoServiceRef extends TodoService {
    constructor(_databaseService: DatabaseService) {
        super(_databaseService);
    }
}
