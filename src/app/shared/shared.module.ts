import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {Http, RequestOptions, XHRBackend} from '@angular/http';

import {AuthGuard} from './guards/auth.guard';
import {AuthFacade} from './services/auth.facade';
import {AuthService} from './services/auth.service';
import {BaseService} from './services/base.service';
import {StorageService} from './services/storage.service';
import {HttpInterceptor} from './interceptors/http.interceptor';
import {AdminGuard} from './guards/admin.guard';

export function httpInterceptor(backend: XHRBackend, defaultOptions: RequestOptions, router: Router) {
    return new HttpInterceptor(backend, defaultOptions, router);
}

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [],
    providers: [AuthGuard,
        AdminGuard,
        AuthFacade,
        BaseService,
        {
            provide: Http,
            useFactory: httpInterceptor,
            deps: [XHRBackend, RequestOptions, Router]
        },
        AuthService,
        StorageService
    ]
})
export class SharedModule {
}
