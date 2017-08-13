import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {EditInstrumentComponent} from './edit-instrument/edit-instrument.component';
import {ListInstrumentComponent} from './list-instrument/list-instrument.component';
import {AddInstrumentComponent} from './add-instrument/add-instrument.component';

const routes: Routes = [
    {
        path: 'add',
        component: AddInstrumentComponent,
        // canActivate: [AdminGuard],
    },
    {
        path: 'edit/:id',
        component: EditInstrumentComponent,
        // canActivate: [AdminGuard],
    },
    {
        path: 'list',
        component: ListInstrumentComponent,
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
export class InstrumentsRoutingModule {

}
