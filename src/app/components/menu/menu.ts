import { Component } from '@angular/core';
import { WindowRef } from '../../services/windowRef';

@Component({
  selector: 'app-menu',
  templateUrl: 'menu.html',
  styleUrls: ['menu.scss']
})
export class MenuComponent {
  public isStarWarsMenuOpen: boolean;
  public isPokemonMenuOpen: boolean;
  private readonly _bodyCssClass = 'show-menu';

  constructor(private _windowRef: WindowRef) {
  }

  public toggleStarWarsMenu() {
    if (this.isPokemonMenuOpen) {
      this.closeMenu();
    }
    this.isStarWarsMenuOpen = !this.isStarWarsMenuOpen;
    this._windowRef.nativeWindow.document.body.classList.toggle(this._bodyCssClass);
  }

  public togglePokemonMenu() {
    if (this.isStarWarsMenuOpen) {
      this.closeMenu();
    }
    this.isPokemonMenuOpen = !this.isPokemonMenuOpen;
    this._windowRef.nativeWindow.document.body.classList.toggle(this._bodyCssClass);
  }

  public closeMenu() {
    this.isStarWarsMenuOpen = false;
    this.isPokemonMenuOpen = false;
    this._windowRef.nativeWindow.document.body.classList.remove(this._bodyCssClass);
  }
}
