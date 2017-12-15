import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { ModelHelperService } from '../../services/modelHelper';
import { ShareService } from '../../services/share';
import { StarWarsService } from '../../services/starWars';

@Component({
  selector: 'app-star-wars-detail',
  templateUrl: 'detail.html'
})
export class StarWarsDetailComponent implements OnInit, OnDestroy {
  public modelName: string;
  public id: number;
  public modelProperties: Array<{ key: string, value: string }>;
  private _serviceMap: Map<string, Function> = new Map<string, Function>();
  private _subscription: Subscription;

  constructor(private _activatedRoute: ActivatedRoute, private _starWarsService: StarWarsService, private _shareService: ShareService) {
    this._initMap();
  }

  public ngOnInit(): void {
    this._subscription = this._activatedRoute.params
      .switchMap(params => {
        this.id = +params['id'];
        const model = params['model'];
        this.modelName = model.substring(0, 1).toUpperCase() + model.substring(1);

        return this._serviceMap.get(model)(this.id);
      })
      .subscribe(model => this.modelProperties = ModelHelperService.objectPropertiesToArray(model));
  }

  public ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  public share(): void {
    this._shareService.share('StarWars!',
      `Wow! Take a look at this amazing character:\r\n\r\n${this.modelProperties.map(o => o.key + ': ' + o.value).join('\r\n')}`);
  }

  private _initMap() {
    this._serviceMap.set('people', this._starWarsService.getPeople.bind(this._starWarsService));
    this._serviceMap.set('planets', this._starWarsService.getPlanet.bind(this._starWarsService));
  }
}
