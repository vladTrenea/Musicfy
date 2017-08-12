import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {SongsFacade} from '../services/songs.facade';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';

@Component({
    selector: 'app-list-song',
    templateUrl: './list-song.component.html',
    styleUrls: ['./list-song.component.css']
})
export class ListSongComponent implements OnInit {

    constructor(private sharedService: AppSharedService,
                private songsFacade: SongsFacade,
                private route: ActivatedRoute) {
        sharedService.emitPageChange(new PageChangeEvent('Songs', 'List'));
    }

    ngOnInit() {
    }
}
