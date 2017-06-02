import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Headers, Http, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {config} from '../../config/configs';
import {Error} from '../models/error.model';

@Injectable()
export class BaseService {
    constructor(protected http: Http, protected router: Router) {
    }

    protected handleError(err: Response) {
        if (err.status === config.statusCodes.notFound
            || err.status === config.statusCodes.forbidden
            || err.status === config.statusCodes.internalServerError) {
            this.router.navigate(['/error', err.status]);

            return;
        }
        else if (err.status === config.statusCodes.unauthorized && this.router.url !== '/login') {
            localStorage.removeItem(config.localStorageKeys.userAuthorization);
            this.router.navigate(['/login']);

            return;
        }

        const errorModel: Error = new Error();
        return err.text().then(errorText => {
            errorModel.message = errorText;

            return Observable.throw(errorModel);
        });
    }

    protected createAuthRequestOptions(token: string): RequestOptions {
        const requestOpt = new RequestOptions();
        requestOpt.headers = this.getAuthHeader(token);

        return requestOpt;
    }

    private getAuthHeader(token: string): Headers {
        let header = new Headers();
        header.set(config.headers.tokenHeaderName, token);

        return header;
    }
}
