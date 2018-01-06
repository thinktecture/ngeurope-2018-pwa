import {Component} from '@angular/core';

@Component({
    selector: 'app-menu',
    templateUrl: 'menu.component.html',
})
export class MenuComponent {
    public isOpen: boolean;

    public toggle(): void {
        this.isOpen = !this.isOpen;
        // TODO
        document.querySelector('.tt__blur-container').classList.toggle('active');
    }

    public close(): void {
        this.isOpen = false;
        // TODO
        document.querySelector('.tt__blur-container').classList.remove('active');
    }
}
