import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {BaseService} from './base.service';
import {UserAuthorization} from '../models/user-authorization.model';
import {LoginModel} from '../models/login.model';
import {config} from '../../config/configs';

@Injectable()
export class AuthService extends BaseService {
    constructor(http: Http, router: Router) {
        super(http, router);
    }

    login(login: LoginModel): Observable<UserAuthorization> {
        return this.http.post(config.apiEndpoints.loginEndpoint, JSON.stringify(login))
            .map(response => response.json() as UserAuthorization)
            .catch(err => this.handleError(err));
    }

    logout(): Observable<any> {
        return this.http.post(config.apiEndpoints.logoutEndpoint, '')
            .catch(err => this.handleError(err));
    }
}
