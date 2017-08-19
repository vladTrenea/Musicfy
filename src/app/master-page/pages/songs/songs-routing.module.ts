import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AdminGuard} from '../../../shared/guards/admin.guard';
import {AddSongComponent} from './add-song/add-song.component';
import {EditSongComponent} from './edit-song/edit-song.component';
import {ViewSongComponent} from './view-song/view-song.component';
import {ListSongComponent} from './list-song/list-song.component';

const routes: Routes = [
    {
        path: 'add',
        component: AddSongComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'edit/:id',
        component: EditSongComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'view/:id',
        component: ViewSongComponent
    },
    {
        path: 'list',
        component: ListSongComponent
    },
    {
        path: '',
        redirectTo: 'list',
        pathMatch: 'prefix'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SongsRoutingModule {

}
