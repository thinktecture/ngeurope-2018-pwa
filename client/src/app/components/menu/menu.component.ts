import { Component } from '@angular/core';
import { WindowRef } from '../../services/windowRef';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrls: ['menu.component.scss']
})
export class MenuComponent {
  public isMenuOpen: boolean;
  private readonly _bodyCssClass = 'show-menu';

  constructor(private _windowRef: WindowRef) {
  }

  public toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this._windowRef.nativeWindow.document.body.classList.toggle(this._bodyCssClass);
  }

  public closeMenu() {
    this.isMenuOpen = false;
    this._windowRef.nativeWindow.document.body.classList.remove(this._bodyCssClass);
  }
}
