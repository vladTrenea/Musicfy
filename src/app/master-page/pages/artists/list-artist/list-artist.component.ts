import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {ArtistModel} from '../models/artist.model';
import {ArtistsFacade} from '../services/artists.facade';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {PaginationModel} from '../../../../shared/models/pagination.model';
import {config} from '../../../../config/configs';

@Component({
    selector: 'app-list-artist',
    templateUrl: './list-artist.component.html',
    styleUrls: ['./list-artist.component.css']
})
export class ListArtistComponent implements OnInit {

    pagination: PaginationModel<ArtistModel>;
    isDataLoading: boolean;

    constructor(private sharedService: AppSharedService,
                private artistsFacade: ArtistsFacade,
                private router: Router) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.artists, config.breadcrumb.subSections.list));
    }

    ngOnInit() {
        this.loadArtists(1);
    }

    goToAddArtist() {
        this.router.navigate(['artists/add']);
    }

    goToViewArtist(id: string) {
        this.router.navigate([`artists/view/${id}`]);
    }

    goToEditArtist(id: string) {
        this.router.navigate([`artists/edit/${id}`]);
    }

    onArtistPageClick(pageNumber: number): void {
        if (pageNumber >= 1 && pageNumber <= this.pagination.totalPages) {
            this.loadArtists(pageNumber);
        }
    }

    private loadArtists(pageNumber: number): void {
        this.isDataLoading = true;
        this.artistsFacade.getArtists(pageNumber)
            .map((pagination: PaginationModel<ArtistModel>) => {
                this.pagination = pagination;
            })
            .subscribe(() => {
                this.isDataLoading = false;
            });
    }
}
