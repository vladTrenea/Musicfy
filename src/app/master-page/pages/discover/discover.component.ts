import {Component, OnInit} from '@angular/core';

import {AppSharedService} from '../../../shared/services/app-shared.service';
import {PageChangeEvent} from '../../../shared/models/page-change-event.model';
import {config} from '../../../config/configs';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.component.html',
    styleUrls: ['./discover.component.css']
})
export class DiscoverComponent implements OnInit {

    constructor(private sharedService: AppSharedService) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.discover, ''));
    }

    ngOnInit() {
    }
}
