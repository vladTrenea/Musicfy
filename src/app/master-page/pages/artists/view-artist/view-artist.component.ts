import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {ArtistsFacade} from '../services/artists.facade';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {config} from '../../../../config/configs';
import {ArtistModel} from '../models/artist.model';

@Component({
    selector: 'app-view-artist',
    templateUrl: './view-artist.component.html',
    styleUrls: ['./view-artist.component.css']
})
export class ViewArtistComponent implements OnInit {

    artist: ArtistModel;

    constructor(private sharedService: AppSharedService,
                private artistsFacade: ArtistsFacade,
                private router: Router,
                private route: ActivatedRoute) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.artists, config.breadcrumb.subSections.view));
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = params['id'];

            this.artistsFacade.getArtist(id)
                .map((artist: ArtistModel) => {
                    this.artist = artist;
                })
                .subscribe();
        });
    }

    goToList() {
        this.router.navigate(['artists/list']);
    }
}
