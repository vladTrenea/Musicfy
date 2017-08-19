import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AddSongCategoryComponent} from './add-song-category/add-song-category.component';
import {EditSongCategoryComponent} from './edit-song-category/edit-song-category.component';
import {ListSongCategoryComponent} from './list-song-category/list-song-category.component';
import {AdminGuard} from '../../../shared/guards/admin.guard';

const routes: Routes = [
    {
        path: 'add',
        component: AddSongCategoryComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'edit/:id',
        component: EditSongCategoryComponent,
        canActivate: [AdminGuard]
    },
    {
        path: 'list',
        component: ListSongCategoryComponent,
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
export class SongCategoriesRoutingModule {

}
