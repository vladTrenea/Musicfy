import {Component, OnInit} from '@angular/core';

import {AuthFacade} from '../../shared/services/auth.facade';
import {AppSharedService} from '../../shared/services/app-shared.service';
import {config} from '../../config/configs';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.component.html',
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

    sections = config.breadcrumb.sections;

    userLoggedIn: string;
    section: string;
    subSection: string;

    constructor(private authFacade: AuthFacade,
                private sharedService: AppSharedService) {
        sharedService.changeEmitted$.subscribe(page => {
            this.section = page.section;
            this.subSection = page.subsection;
        });
    }

    ngOnInit() {
        this.userLoggedIn = this.authFacade.getCurrentUserAuthorization().username;
    }
}
