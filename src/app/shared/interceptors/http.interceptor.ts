import {
    Http,
    Request,
    RequestOptionsArgs,
    Response,
    RequestOptions,
    ConnectionBackend,
    Headers
} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/empty';

import {config} from '../../config/configs';

export class HttpInterceptor extends Http {

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private router: Router) {
        super(backend, defaultOptions);
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.request(url, options));
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.intercept(super.get(url, this.getRequestOptionArgs(options)).map(res => {
            return res;
        }));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let requestOptions = this.getRequestOptionArgs(options);
        requestOptions.headers.set(config.headers.contentTypeHeaderName, config.headers.contentTypeHeader);

        return this.intercept(super.post(url, body, requestOptions));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        let requestOptions = this.getRequestOptionArgs(options);
        requestOptions.headers.set(config.headers.contentTypeHeaderName, config.headers.contentTypeHeader);

        return this.intercept(super.put(url, body, requestOptions));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        let requestOptions = this.getRequestOptionArgs(options);
        requestOptions.headers.set(config.headers.contentTypeHeaderName, config.headers.contentTypeHeader);

        return this.intercept(super.delete(url, requestOptions));
    }

    getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }

        return options;
    }

    intercept(observable: Observable<Response>): Observable<Response> {
        return observable.catch((err, source) => {
            return Observable.throw(err);
        });
    }
}
