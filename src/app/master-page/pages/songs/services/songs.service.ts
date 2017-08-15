import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../../../shared/services/base.service';
import {StorageService} from '../../../../shared/services/storage.service';
import {PaginationModel} from '../../../../shared/models/pagination.model';
import {config} from '../../../../config/configs';
import {SongItemModel} from '../models/song-item.model';
import {SongModel} from '../models/song.model';

@Injectable()
export class SongsService extends BaseService {

    constructor(http: Http, router: Router, storageService: StorageService) {
        super(http, router, storageService);
    }

    get(pageNumber: number): Observable<PaginationModel<SongItemModel>> {
        const requestOpt = this.createAuthRequestOptions();
        const params: URLSearchParams = new URLSearchParams();
        params.set('pageNumber', pageNumber.toString());
        requestOpt.params = params;

        return this.http.get(config.apiEndpoints.songsEndpoint, requestOpt)
            .map(response => response.json() as SongItemModel[])
            .catch(error => this.handleError(error));
    }

    add(song: SongModel): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.post(config.apiEndpoints.songsEndpoint, JSON.stringify(song), requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    delete(id: string): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.delete(`${config.apiEndpoints.songsEndpoint}/${id}`, requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }
}
