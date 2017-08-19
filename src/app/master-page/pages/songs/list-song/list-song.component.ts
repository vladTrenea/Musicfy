import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';

import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {SongsFacade} from '../services/songs.facade';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {config} from '../../../../config/configs';
import {PaginationModel} from '../../../../shared/models/pagination.model';
import {SongItemModel} from '../models/song-item.model';
import {ModalComponent} from '../../../../shared/modals/modal/modal.component';
import {ModalResponse} from '../../../../shared/modals/modal-response.model';
import {UserAuthorization} from '../../../../shared/models/user-authorization.model';
import {AuthFacade} from '../../../../shared/services/auth.facade';

@Component({
    selector: 'app-list-song',
    templateUrl: './list-song.component.html',
    styleUrls: ['./list-song.component.css']
})
export class ListSongComponent implements OnInit {

    userAuthorization: UserAuthorization;

    pagination: PaginationModel<SongItemModel>;
    isDataLoading: boolean;

    constructor(private sharedService: AppSharedService,
                private songsFacade: SongsFacade,
                private authFacade: AuthFacade,
                private router: Router,
                private dialog: MdDialog) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.songs, config.breadcrumb.subSections.list));
    }

    ngOnInit() {
        this.loadSongs(1);

        this.authFacade.getCurrentUserAuthorization();
    }

    goToAddSong() {
        this.router.navigate(['songs/add']);
    }

    goToViewSong(id: string) {
        this.router.navigate([`songs/view/${id}`]);
    }

    goToEditSong(id: string) {
        this.router.navigate([`songs/edit/${id}`]);
    }

    onDeleteSongClick(id: string) {
        const dialogRef = this.dialog.open(ModalComponent);
        dialogRef.componentInstance.initDialog('Delete', 'Are you sure?', true);
        dialogRef.afterClosed().subscribe((result: ModalResponse) => {
            if (result && result.isCallback) {
                this.songsFacade.delete(id)
                    .subscribe(() => {
                        location.reload();
                    });
            }
        });
    }

    onSongPageClick(pageNumber: number): void {
        if (pageNumber !== this.pagination.page && pageNumber >= 1 && pageNumber <= this.pagination.totalPages) {
            this.loadSongs(pageNumber);
        }
    }

    private loadSongs(pageNumber: number): void {
        this.isDataLoading = true;
        this.songsFacade.getSongs(pageNumber)
            .map((pagination: PaginationModel<SongItemModel>) => {
                this.pagination = pagination;
            })
            .subscribe(() => {
                this.isDataLoading = false;
            });
    }
}
