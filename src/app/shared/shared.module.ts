import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Router} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {Http, RequestOptions, XHRBackend} from '@angular/http';
import {MaterialModule, MdCoreModule, MdProgressSpinnerModule} from '@angular/material';

import {AuthGuard} from './guards/auth.guard';
import {AuthFacade} from './services/auth.facade';
import {AuthService} from './services/auth.service';
import {BaseService} from './services/base.service';
import {StorageService} from './services/storage.service';
import {HttpInterceptor} from './interceptors/http.interceptor';
import {AdminGuard} from './guards/admin.guard';
import {EmptyValidator} from './validators/empty-validator.directive';
import { ProgressSpinnerComponent } from './components/progress-spinner/progress-spinner.component';
import { ModalComponent } from './modals/modal/modal.component';

export function httpInterceptor(backend: XHRBackend, defaultOptions: RequestOptions, router: Router) {
    return new HttpInterceptor(backend, defaultOptions, router);
}

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MdProgressSpinnerModule,
        MdCoreModule,
    ],
    declarations: [EmptyValidator, ProgressSpinnerComponent, ModalComponent],
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
    ],
    exports: [
        FormsModule,
        EmptyValidator,
        MaterialModule,
        ProgressSpinnerComponent
    ]
})
export class SharedModule {
}
