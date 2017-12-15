import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Pokemon } from '../models/pokemon';

// This could be merged with the StarWars Service, since both APIs are quite identical. But that would introduce a not necessary
// complexity for a demo.
@Injectable()
export class PokemonService {
  private readonly _baseUrl: string;
  private readonly _pageOffsetSize = 20;

  constructor(private _http: HttpClient) {
    this._baseUrl = 'https://pokeapi.co/api/v2/';
  }

  public list(page: number = 1): Observable<Pokemon[]> {
    return this._http.get(`${this._baseUrl}pokemon?offset=${(page - 1) * this._pageOffsetSize}`)
      .switchMap((json: any) => Observable.from(json.results))
      .map(obj => Pokemon.deserialize(obj))
      .toArray();
  }

  public get(id: number): Observable<Pokemon> {
    return this._http.get(`${this._baseUrl}pokemon/${id}`)
      .map(obj => Pokemon.deserialize(obj));
  }
}
