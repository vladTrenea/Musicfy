import {Router} from '@angular/router';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';

import {BaseService} from '../../../../shared/services/base.service';
import {StorageService} from '../../../../shared/services/storage.service';
import {InstrumentModel} from '../models/instrument.model';
import {config} from '../../../../config/configs';

@Injectable()
export class InstrumentsService extends BaseService {
    constructor(http: Http, router: Router, storageService: StorageService) {
        super(http, router, storageService);
    }

    getAll(): Observable<InstrumentModel[]> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.get(config.apiEndpoints.instrumentsEndpoint, requestOpt)
            .map(response => response.json() as InstrumentModel[])
            .catch(error => this.handleError(error));
    }

    getById(id: string): Observable<InstrumentModel> {
        const requestOpt = this.createAuthRequestOptions();
        const url = `${config.apiEndpoints.instrumentsEndpoint}/${id}`;

        return this.http.get(url, requestOpt)
            .map(response => response.json() as InstrumentModel)
            .catch(error => this.handleError(error));
    }

    add(instrument: InstrumentModel): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.post(config.apiEndpoints.instrumentsEndpoint, JSON.stringify(instrument), requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    update(id: string, instrument: InstrumentModel): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.put(`${config.apiEndpoints.instrumentsEndpoint}/${id}`, JSON.stringify(instrument), requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    delete(id: string): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.delete(`${config.apiEndpoints.instrumentsEndpoint}/${id}`, requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }
}
