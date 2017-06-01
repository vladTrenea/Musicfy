import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';

import {AuthFacade} from '../services/auth.facade';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authFacade: AuthFacade, private router: Router) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        //verify if auth token is present

        return true;
    }
}
