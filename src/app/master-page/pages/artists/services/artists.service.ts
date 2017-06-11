import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../../../shared/services/base.service';
import {StorageService} from '../../../../shared/services/storage.service';
import {config} from '../../../../config/configs';
import {ArtistModel} from '../models/artist.model';

@Injectable()
export class ArtistsService extends BaseService {

    constructor(http: Http, router: Router, storageService: StorageService) {
        super(http, router, storageService);
    }

    getAll(): Observable<ArtistModel[]> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.get(config.apiEndpoints.artistsEndpoint, requestOpt)
            .map(response => response.json() as ArtistModel[])
            .catch(error => this.handleError(error));
    }

    add(artist: ArtistModel): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.post(config.apiEndpoints.artistsEndpoint, requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    update(id: string, artist: ArtistModel): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.put(`${config.apiEndpoints.artistsEndpoint}/${id}`, requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    delete(id: string): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.delete(`${config.apiEndpoints.artistsEndpoint}/${id}`, requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }
}
