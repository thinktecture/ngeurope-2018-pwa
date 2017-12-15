import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ModelHelperService } from '../../services/modelHelper';
import { PokemonService } from '../../services/pokemon';
import { ShareService } from '../../services/share';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: 'detail.html'
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  public id: number;
  public modelProperties: Array<{ key: string, value: string }>;
  private _subscription: Subscription;

  constructor(private _activatedRoute: ActivatedRoute, private _pokemonService: PokemonService, private _shareService: ShareService) {
  }

  public ngOnInit(): void {
    this._subscription = this._activatedRoute.params
      .switchMap(params => {
        this.id = +params['id'];

        return this._pokemonService.get(this.id);
      })
      .subscribe(model => this.modelProperties = ModelHelperService.objectPropertiesToArray(model));
  }

  public ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  public share(): void {
    this._shareService.share('Pokemon!',
      `Wow! Take a look at this amazing pokemon:\r\n\r\n${this.modelProperties.map(o => o.key + ': ' + o.value).join('\r\n')}`);
  }
}
