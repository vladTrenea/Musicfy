import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {AuthService} from './auth.service';
import {StorageService} from './storage.service';
import {UserAuthorization} from '../models/user-authorization.model';
import {LoginModel} from '../models/login.model';

@Injectable()
export class AuthFacade {
    constructor(private authService: AuthService, private storageService: StorageService) {
    }

    login(login: LoginModel): Observable<UserAuthorization> {
        return this.authService.login(login);
    }

    logout(): Observable<any> {
        return this.authService.logout().map(response => {
            this.storageService.removeUserAuthorization();

            return null;
        });
    }

    getCurrentUserAuthorization(): UserAuthorization {
        return this.storageService.getUserAuthorization();
    }
}
