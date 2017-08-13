import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddArtistComponent} from './add-artist/add-artist.component';
import {EditArtistComponent} from './edit-artist/edit-artist.component';
import {ViewArtistComponent} from './view-artist/view-artist.component';
import {ListArtistComponent} from './list-artist/list-artist.component';
import {SharedModule} from '../../../shared/shared.module';
import {ArtistsRoutingModule} from './artists-routing.module';
import {ArtistsFacade} from './services/artists.facade';
import {ArtistsService} from './services/artists.service';
import {ModalComponent} from '../../../shared/modals/modal/modal.component';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        ArtistsRoutingModule
    ],
    declarations: [AddArtistComponent, EditArtistComponent, ViewArtistComponent, ListArtistComponent],
    entryComponents: [ModalComponent],
    providers: [ArtistsFacade, ArtistsService]
})
export class ArtistsModule {
}
