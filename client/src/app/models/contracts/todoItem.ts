import {IDatabaseItem} from './databaseItem';

export class ITodoItem implements IDatabaseItem {
    id: number;
    text: string;
    completed: boolean;
}
