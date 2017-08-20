import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AuthFacade} from '../shared/services/auth.facade';
import {LoginModel} from '../shared/models/login.model';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent {

    loginModel: LoginModel = new LoginModel();
    formSubmitted = false;
    errorMessage: string;

    constructor(private authFacade: AuthFacade,
                private router: Router) {
    }

    login(valid: boolean): void {
        this.formSubmitted = true;

        if (valid) {
            this.authFacade.login(this.loginModel).subscribe(
                () => {
                    this.router.navigate(['/songs']);
                },
                error => {
                    this.errorMessage = error.message;
                });
        }
    }
}
