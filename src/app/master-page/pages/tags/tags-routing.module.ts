import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {AddTagComponent} from './add-tag/add-tag.component';
import {EditTagComponent} from './edit-tag/edit-tag.component';
import {ListTagComponent} from './list-tag/list-tag.component';

const routes: Routes = [
    {
        path: 'add',
        component: AddTagComponent,
        // canActivate: [AdminGuard],
    },
    {
        path: 'edit/:id',
        component: EditTagComponent,
        // canActivate: [AdminGuard],
    },
    {
        path: 'list',
        component: ListTagComponent,
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
export class TagsRoutingModule {

}
