import {Component, OnInit} from '@angular/core';

import {AppSharedService} from '../../../shared/services/app-shared.service';
import {PageChangeEvent} from '../../../shared/models/page-change-event.model';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    constructor(private sharedService: AppSharedService) {
        sharedService.emitPageChange(new PageChangeEvent('Dashboard', 'Profile'));
    }

    ngOnInit() {
    }
}
