import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Router} from '@angular/router';

import {BaseService} from './base.service';

@Injectable()
export class AuthService extends BaseService {
    constructor(http: Http, router: Router) {
        super(http, router);
    }
}
