import {Injectable} from '@angular/core';

import {AuthService} from './auth.service';
import {StorageService} from './storage.service';

@Injectable()
export class AuthFacade {
    constructor(private authService: AuthService, private storageService: StorageService) {

    }
}
