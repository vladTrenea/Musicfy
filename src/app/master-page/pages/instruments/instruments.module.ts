import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AddInstrumentComponent} from './add-instrument/add-instrument.component';
import {EditInstrumentComponent} from './edit-instrument/edit-instrument.component';
import {ListInstrumentComponent} from './list-instrument/list-instrument.component';
import {SharedModule} from '../../../shared/shared.module';
import {InstrumentsRoutingModule} from './instruments-routing.module';
import {ModalComponent} from '../../../shared/modals/modal/modal.component';
import {InstrumentsFacade} from './services/instruments.facade';
import {InstrumentsService} from './services/instruments.service';

@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        InstrumentsRoutingModule
    ],
    declarations: [AddInstrumentComponent, EditInstrumentComponent, ListInstrumentComponent],
    entryComponents: [ModalComponent],
    providers: [InstrumentsFacade, InstrumentsService]
})
export class InstrumentsModule {
}
