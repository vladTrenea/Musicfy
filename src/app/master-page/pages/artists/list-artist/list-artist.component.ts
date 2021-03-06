import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';

import {ArtistModel} from '../models/artist.model';
import {ArtistsFacade} from '../services/artists.facade';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {PaginationModel} from '../../../../shared/models/pagination.model';
import {config} from '../../../../config/configs';
import {ModalResponse} from '../../../../shared/modals/modal-response.model';
import {ModalComponent} from '../../../../shared/modals/modal/modal.component';
import {UserAuthorization} from '../../../../shared/models/user-authorization.model';
import {AuthFacade} from '../../../../shared/services/auth.facade';

@Component({
    selector: 'app-list-artist',
    templateUrl: './list-artist.component.html',
    styleUrls: ['./list-artist.component.css']
})
export class ListArtistComponent implements OnInit {

    userAuthorization: UserAuthorization;

    pagination: PaginationModel<ArtistModel>;
    isDataLoading: boolean;

    constructor(private sharedService: AppSharedService,
                private artistsFacade: ArtistsFacade,
                private authFacade: AuthFacade,
                private router: Router,
                private dialog: MdDialog) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.artists, config.breadcrumb.subSections.list));
    }

    ngOnInit() {
        this.loadArtists(1);

        this.userAuthorization = this.authFacade.getCurrentUserAuthorization();
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

    onDeleteArtistClick(id: string) {
        const dialogRef = this.dialog.open(ModalComponent);
        dialogRef.componentInstance.initDialog('Delete', 'Are you sure?', true);
        dialogRef.afterClosed().subscribe((result: ModalResponse) => {
            if (result && result.isCallback) {
                this.artistsFacade.delete(id)
                    .subscribe(() => {
                        location.reload();
                    });
            }
        });
    }

    onArtistPageClick(pageNumber: number): void {
        if (pageNumber !== this.pagination.page && pageNumber >= 1 && pageNumber <= this.pagination.totalPages) {
            this.loadArtists(pageNumber);
        }
    }

    private loadArtists(pageNumber: number): void {
        this.isDataLoading = true;
        this.artistsFacade.getArtists(pageNumber)
            .map((pagination: PaginationModel<ArtistModel>) => {
                this.pagination = pagination;
            })
            .finally(() => {
                this.isDataLoading = false;
            })
            .subscribe();
    }
}
