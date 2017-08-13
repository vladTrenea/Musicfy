import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';

import {SongCategoryModel} from '../models/song-category.model';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {SongCategoriesFacade} from '../services/song-categories.facade';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {config} from '../../../../config/configs';
import {ModalResponse} from '../../../../shared/modals/modal-response.model';
import {ModalComponent} from '../../../../shared/modals/modal/modal.component';

@Component({
    selector: 'app-list-song-category',
    templateUrl: './list-song-category.component.html',
    styleUrls: ['./list-song-category.component.css']
})
export class ListSongCategoryComponent implements OnInit {

    songCategories: SongCategoryModel[];
    isDataLoading: boolean;

    constructor(private sharedService: AppSharedService,
                private songCategoriesFacade: SongCategoriesFacade,
                private router: Router,
                private dialog: MdDialog) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.songCategories, config.breadcrumb.subSections.list));
    }

    ngOnInit() {
        this.loadSongCategories();
    }

    goToAddSongCategory() {
        this.router.navigate(['songCategories/add']);
    }

    goToEditSongCategory(id: string) {
        this.router.navigate([`songCategories/edit/${id}`]);
    }

    onDeleteSongCategoryClick(id: string) {
        const dialogRef = this.dialog.open(ModalComponent);
        dialogRef.componentInstance.initDialog('Delete', 'Are you sure?', true);
        dialogRef.afterClosed().subscribe((result: ModalResponse) => {
            if (result && result.isCallback) {
                this.songCategoriesFacade.delete(id)
                    .subscribe(() => {
                        location.reload();
                    });
            }
        });
    }

    private loadSongCategories() {
        this.isDataLoading = true;
        this.songCategoriesFacade.getSongCategories()
            .map((songCategories: SongCategoryModel[]) => {
                this.songCategories = songCategories;
            })
            .finally(() => {
                this.isDataLoading = false;
            })
            .subscribe();
    }
}
