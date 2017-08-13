import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {InstrumentModel} from '../models/instrument.model';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {InstrumentsFacade} from '../services/instruments.facade';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {config} from '../../../../config/configs';

@Component({
    selector: 'app-add-instrument',
    templateUrl: './add-instrument.component.html',
    styleUrls: ['./add-instrument.component.css']
})
export class AddInstrumentComponent {

    instrument: InstrumentModel = new InstrumentModel();
    errorMessage: string;
    formSubmitted: boolean;

    constructor(private sharedService: AppSharedService,
                private instrumentsFacade: InstrumentsFacade,
                private router: Router) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.instruments, config.breadcrumb.subSections.add));
    }

    addInstrument(valid: boolean) {
        this.formSubmitted = true;
        this.errorMessage = '';

        if (valid) {
            this.instrumentsFacade
                .add(this.instrument)
                .subscribe(() => {
                        this.goToList();
                    },
                    (error: Error) => {
                        this.errorMessage = error.message;
                    });
        }
    }

    goToList() {
        this.router.navigate(['instruments/list']);
    }
}
