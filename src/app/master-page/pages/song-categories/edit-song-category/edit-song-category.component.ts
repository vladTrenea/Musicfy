import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {SongCategoryModel} from '../models/song-category.model';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {SongCategoriesFacade} from '../services/song-categories.facade';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {config} from '../../../../config/configs';

@Component({
    selector: 'app-edit-song-category',
    templateUrl: './edit-song-category.component.html',
    styleUrls: ['./edit-song-category.component.css']
})
export class EditSongCategoryComponent implements OnInit {

    songCategory: SongCategoryModel;
    errorMessage: string;
    formSubmitted: boolean;
    isDataLoading: boolean;

    constructor(private sharedService: AppSharedService,
                private songCategoriesFacade: SongCategoriesFacade,
                private router: Router,
                private route: ActivatedRoute) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.songCategories, config.breadcrumb.subSections.edit));
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];

            this.isDataLoading = true;
            this.songCategoriesFacade.getSongCategory(id)
                .map((songCategory: SongCategoryModel) => {
                    this.songCategory = songCategory;
                })
                .finally(() => {
                    this.isDataLoading = false;
                })
                .subscribe();
        });
    }

    editSongCategory(valid: boolean) {
        this.formSubmitted = true;
        this.errorMessage = '';

        if (valid) {
            this.songCategoriesFacade
                .update(this.songCategory.id, this.songCategory)
                .subscribe(() => {
                        this.goToList();
                    },
                    (error: Error) => {
                        this.errorMessage = error.message;
                    });
        }
    }

    goToList() {
        this.router.navigate(['songCategories/list']);
    }
}
