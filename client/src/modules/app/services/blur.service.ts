import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class BlurService {
    private readonly _onBlurChange = new BehaviorSubject<boolean>(false);

    public get onBlurChange(): Observable<boolean> {
        return this._onBlurChange;
    }

    public toggleBlur(): void {
        this._onBlurChange.next(!this._onBlurChange.getValue());
    }

    public blurApplication(): void {
        this._onBlurChange.next(true);
    }

    public focusApplication(): void {
        this._onBlurChange.next(false);
    }
}
