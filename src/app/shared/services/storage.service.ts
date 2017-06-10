import {Injectable} from '@angular/core';

import {UserAuthorization} from '../models/user-authorization.model';
import {config} from '../../config/configs';

@Injectable()
export class StorageService {
    constructor() {

    }

    getUserAuthorization(): UserAuthorization {
        return JSON.parse(localStorage.getItem(config.localStorageKeys.userAuthorization));
    }

    setUserAuthorization(authorization: UserAuthorization) {
        localStorage.setItem(config.localStorageKeys.userAuthorization, JSON.stringify(authorization));
    }

    removeUserAuthorization() {
        localStorage.removeItem(config.localStorageKeys.userAuthorization);
    }
}
