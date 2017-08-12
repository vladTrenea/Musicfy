import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {ArtistsFacade} from '../services/artists.facade';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {ArtistModel} from '../models/artist.model';
import {config} from '../../../../config/configs';

@Component({
    selector: 'app-add-artist',
    templateUrl: './add-artist.component.html',
    styleUrls: ['./add-artist.component.css']
})
export class AddArtistComponent {

    artist: ArtistModel = new ArtistModel();
    errorMessage: string;
    formSubmitted: boolean;

    constructor(private sharedService: AppSharedService,
                private artistsFacade: ArtistsFacade,
                private router: Router) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.artists, config.breadcrumb.subSections.add));
    }

    addArtist(valid: boolean) {
        this.formSubmitted = true;
        this.errorMessage = '';

        if (valid) {
            this.artistsFacade
                .add(this.artist)
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
