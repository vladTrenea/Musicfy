import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http} from '@angular/http';

@Injectable()
export class BaseService {
    constructor(protected http: Http, protected router: Router) {
    }
}
