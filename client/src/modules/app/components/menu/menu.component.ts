import {Component} from '@angular/core';
import {BlurService} from '../../services/blur.service';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
})
export class MenuComponent {
    public isOpen: boolean;

    constructor(private _blurService: BlurService) {
    }

    public toggle(): void {
        this.isOpen = !this.isOpen;
        this._blurService.toggleBlur();
    }

    public close(): void {
        this.isOpen = false;
        this._blurService.focusApplication();
    }
}
