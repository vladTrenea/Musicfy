import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {SongCategoryModel} from '../models/song-category.model';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {SongCategoriesFacade} from '../services/song-categories.facade';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {config} from '../../../../config/configs';

@Component({
    selector: 'app-add-song-category',
    templateUrl: './add-song-category.component.html',
    styleUrls: ['./add-song-category.component.css']
})
export class AddSongCategoryComponent {

    songCategory: SongCategoryModel = new SongCategoryModel();
    errorMessage: string;
    formSubmitted: boolean;

    constructor(private sharedService: AppSharedService,
                private songCategoriesFacade: SongCategoriesFacade,
                private router: Router) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.songCategories, config.breadcrumb.subSections.add));
    }

    addSongCategory(valid: boolean) {
        this.formSubmitted = true;
        this.errorMessage = '';

        if (valid) {
            this.songCategoriesFacade
                .add(this.songCategory)
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
