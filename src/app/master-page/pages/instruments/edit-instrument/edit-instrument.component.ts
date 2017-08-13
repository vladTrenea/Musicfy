import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {InstrumentsFacade} from '../services/instruments.facade';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {InstrumentModel} from '../models/instrument.model';
import {config} from '../../../../config/configs';

@Component({
    selector: 'app-edit-instrument',
    templateUrl: './edit-instrument.component.html',
    styleUrls: ['./edit-instrument.component.css']
})
export class EditInstrumentComponent implements OnInit {

    instrument: InstrumentModel;
    errorMessage: string;
    formSubmitted: boolean;
    isDataLoading: boolean;

    constructor(private sharedService: AppSharedService,
                private instrumentsFacade: InstrumentsFacade,
                private router: Router,
                private route: ActivatedRoute) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.instruments, config.breadcrumb.subSections.edit));
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];

            this.isDataLoading = true;
            this.instrumentsFacade.getInstrument(id)
                .map((instrument: InstrumentModel) => {
                    this.instrument = instrument;
                })
                .finally(() => {
                    this.isDataLoading = false;
                })
                .subscribe();
        });
    }

    editInstrument(valid: boolean) {
        this.formSubmitted = true;
        this.errorMessage = '';

        if (valid) {
            this.instrumentsFacade
                .update(this.instrument.id, this.instrument)
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
