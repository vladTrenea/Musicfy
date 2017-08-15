import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../../../shared/services/base.service';
import {StorageService} from '../../../../shared/services/storage.service';
import {TagModel} from '../models/tag.model';
import {config} from '../../../../config/configs';

@Injectable()
export class TagsService extends BaseService {
    constructor(http: Http, router: Router, storageService: StorageService) {
        super(http, router, storageService);
    }

    getAll(): Observable<TagModel[]> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.get(config.apiEndpoints.tagsEndpoint, requestOpt)
            .map(response => response.json() as TagModel[])
            .catch(error => this.handleError(error));
    }

    getById(id: string): Observable<TagModel> {
        const requestOpt = this.createAuthRequestOptions();
        const url = `${config.apiEndpoints.tagsEndpoint}/${id}`;

        return this.http.get(url, requestOpt)
            .map(response => response.json() as TagModel)
            .catch(error => this.handleError(error));
    }

    add(tag: TagModel): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.post(config.apiEndpoints.tagsEndpoint, JSON.stringify(tag), requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    update(id: string, tag: TagModel): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.put(`${config.apiEndpoints.tagsEndpoint}/${id}`, JSON.stringify(tag), requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    delete(id: string): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.delete(`${config.apiEndpoints.tagsEndpoint}/${id}`, requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }
}
