import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ListTagComponent} from './list-tag/list-tag.component';
import {EditTagComponent} from './edit-tag/edit-tag.component';
import {AddTagComponent} from './add-tag/add-tag.component';
import {SharedModule} from '../../../shared/shared.module';
import {TagsRoutingModule} from './tags-routing.module';
import {ModalComponent} from '../../../shared/modals/modal/modal.component';
import {TagsService} from './services/tags.service';
import {TagsFacade} from './services/tags.facade';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        TagsRoutingModule
    ],
    declarations: [ListTagComponent, EditTagComponent, AddTagComponent],
    entryComponents: [ModalComponent],
    providers: [TagsFacade, TagsService]
})
export class TagsModule {
}
