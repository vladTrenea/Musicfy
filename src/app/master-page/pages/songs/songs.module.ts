import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddSongComponent} from './add-song/add-song.component';
import {EditSongComponent} from './edit-song/edit-song.component';
import {ViewSongComponent} from './view-song/view-song.component';
import {ListSongComponent} from './list-song/list-song.component';
import {SharedModule} from '../../../shared/shared.module';
import {SongsRoutingModule} from './songs-routing.module';
import {SongsFacade} from './services/songs.facade';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SongsRoutingModule
    ],
    declarations: [AddSongComponent, EditSongComponent, ViewSongComponent, ListSongComponent],
    providers: [SongsFacade]
})
export class SongsModule {
}
