import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ArtistsFacade} from '../services/artists.facade';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {config} from '../../../../config/configs';
import {ArtistModel} from '../models/artist.model';

@Component({
    selector: 'app-edit-artist',
    templateUrl: './edit-artist.component.html',
    styleUrls: ['./edit-artist.component.css']
})
export class EditArtistComponent implements OnInit {

    artist: ArtistModel;
    errorMessage: string;
    formSubmitted: boolean;

    constructor(private sharedService: AppSharedService,
                private artistsFacade: ArtistsFacade,
                private router: Router,
                private route: ActivatedRoute) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.artists, config.breadcrumb.subSections.edit));
    }

    ngOnInit() {
        this.route.params.map(params => {
            this.artistsFacade.getArtist((+params['id']).toString())
                .map((artist: ArtistModel) => {
                    this.artist = artist;
                });
        }).subscribe();
    }

    editArtist(valid: boolean) {
        this.formSubmitted = true;
        this.errorMessage = '';

        if (valid) {
            this.artistsFacade
                .update(this.artist.id, this.artist)
                .subscribe(() => {
                        this.goToList();
                    },
                    (error: Error) => {
                        this.errorMessage = error.message;
                    });
        }
    }

    goToList() {
        this.router.navigate(['artists/list']);
    }
}
