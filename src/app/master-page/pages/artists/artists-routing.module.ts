import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AddArtistComponent} from './add-artist/add-artist.component';
import {AdminGuard} from '../../../shared/guards/admin.guard';
import {EditArtistComponent} from './edit-artist/edit-artist.component';
import {ViewArtistComponent} from './view-artist/view-artist.component';
import {ListArtistComponent} from './list-artist/list-artist.component';

const routes: Routes = [
    {
        path: 'add',
        component: AddArtistComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'edit',
        component: EditArtistComponent,
        canActivate: [AdminGuard],
    },
    {
        path: 'view',
        component: ViewArtistComponent
    },
    {
        path: 'list',
        component: ListArtistComponent,
    },
    {
        path: '',
        redirectTo: '/artists/list',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ArtistsRoutingModule {

}
