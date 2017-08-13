import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddSongCategoryComponent} from './add-song-category/add-song-category.component';
import {EditSongCategoryComponent} from './edit-song-category/edit-song-category.component';
import {ListSongCategoryComponent} from './list-song-category/list-song-category.component';
import {SharedModule} from '../../../shared/shared.module';
import {SongCategoriesRoutingModule} from './song-categories-routing.module';
import {ModalComponent} from '../../../shared/modals/modal/modal.component';
import {SongCategoriesFacade} from './services/song-categories.facade';
import {SongCategoriesService} from './services/song-categories.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SongCategoriesRoutingModule
    ],
    declarations: [AddSongCategoryComponent, EditSongCategoryComponent, ListSongCategoryComponent],
    entryComponents: [ModalComponent],
    providers: [SongCategoriesFacade, SongCategoriesService]
})
export class SongCategoriesModule {
}
