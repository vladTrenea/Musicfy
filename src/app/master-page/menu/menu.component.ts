import {Component, OnInit} from '@angular/core';

import {AuthFacade} from '../../shared/services/auth.facade';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    userLoggedIn: string;

    constructor(private authFacade: AuthFacade) {
    }

    ngOnInit() {
        this.userLoggedIn = this.authFacade.getCurrentUserAuthorization().username;
    }
}
