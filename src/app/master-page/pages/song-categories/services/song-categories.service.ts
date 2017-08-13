import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from '../../../../shared/services/base.service';
import {StorageService} from '../../../../shared/services/storage.service';
import {Observable} from 'rxjs/Observable';
import {SongCategoryModel} from '../models/song-category.model';
import {config} from '../../../../config/configs';

@Injectable()
export class SongCategoriesService extends BaseService {
    constructor(http: Http, router: Router, storageService: StorageService) {
        super(http, router, storageService);
    }

    getAll(): Observable<SongCategoryModel[]> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.get(config.apiEndpoints.songCategoriesEndpoint, requestOpt)
            .map(response => response.json() as SongCategoryModel[])
            .catch(error => this.handleError(error));
    }

    getById(id: string): Observable<SongCategoryModel> {
        const requestOpt = this.createAuthRequestOptions();
        const url = `${config.apiEndpoints.songCategoriesEndpoint}/${id}`;

        return this.http.get(url, requestOpt)
            .map(response => response.json() as SongCategoryModel)
            .catch(error => this.handleError(error));
    }

    add(songCategory: SongCategoryModel): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.post(config.apiEndpoints.songCategoriesEndpoint, JSON.stringify(songCategory), requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    update(id: string, songCategory: SongCategoryModel): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.put(`${config.apiEndpoints.songCategoriesEndpoint}/${id}`, JSON.stringify(songCategory), requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    delete(id: string): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.delete(`${config.apiEndpoints.songCategoriesEndpoint}/${id}`, requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }
}
