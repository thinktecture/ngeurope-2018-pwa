import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { BaseModel } from '../../models/baseModel';
import { StarWarsService } from '../../services/starWars';

@Component({
  selector: 'app-star-wars-list',
  templateUrl: 'list.html'
})
export class StarWarsListComponent implements OnInit, OnDestroy {
  public modelList: BaseModel[];
  public model: string;
  public modelName: string;
  public page: number;
  private _serviceMap: Map<string, Function> = new Map<string, Function>();
  private _subscription: Subscription;

  constructor(private _activatedRoute: ActivatedRoute, private _starWarsService: StarWarsService) {
    this._initMap();
  }

  public ngOnInit(): void {
    this._subscription = this._activatedRoute.params
      .switchMap(params => {
        this.page = +params['page'];
        this.model = params['model'];
        this.modelName = this.model.substring(0, 1).toUpperCase() + this.model.substring(1);

        return this._serviceMap.get(this.model)(this.page);
      })
      .subscribe((model: BaseModel[]) => this.modelList = model);
  }

  public ngOnDestroy(): void {
    if (this._subscription) {
      this._subscription.unsubscribe();
    }
  }

  private _initMap() {
    this._serviceMap.set('people', this._starWarsService.listPeople.bind(this._starWarsService));
    this._serviceMap.set('planets', this._starWarsService.listPlanets.bind(this._starWarsService));
  }
}
