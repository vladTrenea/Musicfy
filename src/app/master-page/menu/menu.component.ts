import {Component, OnInit} from '@angular/core';

import {AuthFacade} from '../../shared/services/auth.facade';
import {AppSharedService} from '../../shared/services/app-shared.service';
import {config} from '../../config/configs';
import {Router} from '@angular/router';
import {UserAuthorization} from '../../shared/models/user-authorization.model';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    sections = config.breadcrumb.sections;

    userAuthorization: UserAuthorization;

    section: string;
    subSection: string;
    topMenuOpened: boolean = false;

    constructor(private authFacade: AuthFacade,
                private sharedService: AppSharedService,
                private router: Router) {
        sharedService.changeEmitted$.subscribe(page => {
            this.section = page.section;
            this.subSection = page.subsection;
        });
    }

    ngOnInit() {
        this.userAuthorization = this.authFacade.getCurrentUserAuthorization();
    }

    openTopMenu() {
        this.topMenuOpened = !this.topMenuOpened;
    }

    logout() {
        this.authFacade.logout().subscribe(() => {
            this.router.navigate(['/login']);
        });
    }
}
