import {HttpClient} from '@angular/common/http';
import {ApiService} from './base/api.service';
import {Observable} from 'rxjs/Observable';
import {environment} from '../../environments/environment';
import {Injectable} from '@angular/core';

@Injectable()
export class ApiServiceRef extends ApiService {
    private _apiBaseUrl: string;

    constructor(private _httpClient: HttpClient) {
        super();

        this._apiBaseUrl = environment.apiUrl;
        if (!this._apiBaseUrl.endsWith('/')) {
            this._apiBaseUrl += '/';
        }
    }

    public get(urlSuffix: string): Observable<any> {
        return this._httpClient.get(this._getApiUrl(urlSuffix));
    }

    public put(urlSuffix: string, payload: any): Observable<any> {
        return this._httpClient.put(this._getApiUrl(urlSuffix), payload);
    }

    public post(urlSuffix: string, payload: any): Observable<any> {
        return this._httpClient.post(this._getApiUrl(urlSuffix), payload);
    }

    public delete(urlSuffix: string): Observable<any> {
        return this._httpClient.delete(this._getApiUrl(urlSuffix));
    }

    private _getApiUrl(urlSuffix: string): string {
        return `${this._apiBaseUrl}${urlSuffix}`;
    }
}
