import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';

import {config} from '../../../../config/configs';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {InstrumentsFacade} from '../services/instruments.facade';
import {InstrumentModel} from '../models/instrument.model';
import {ModalComponent} from '../../../../shared/modals/modal/modal.component';
import {ModalResponse} from '../../../../shared/modals/modal-response.model';

@Component({
    selector: 'app-list-instrument',
    templateUrl: './list-instrument.component.html',
    styleUrls: ['./list-instrument.component.css']
})
export class ListInstrumentComponent implements OnInit {

    instruments: InstrumentModel[];
    isDataLoading: boolean;

    constructor(private sharedService: AppSharedService,
                private instrumentsFacade: InstrumentsFacade,
                private router: Router,
                private dialog: MdDialog) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.instruments, config.breadcrumb.subSections.list));
    }

    ngOnInit() {
        this.loadInstruments();
    }

    goToAddInstrument() {
        this.router.navigate(['instruments/add']);
    }

    goToEditInstrument(id: string) {
        this.router.navigate([`instruments/edit/${id}`]);
    }

    onDeleteInstrumentClick(id: string) {
        const dialogRef = this.dialog.open(ModalComponent);
        dialogRef.componentInstance.initDialog('Delete', 'Are you sure?', true);
        dialogRef.afterClosed().subscribe((result: ModalResponse) => {
            if (result && result.isCallback) {
                this.instrumentsFacade.delete(id)
                    .subscribe(() => {
                        location.reload();
                    });
            }
        });
    }

    private loadInstruments() {
        this.isDataLoading = true;
        this.instrumentsFacade.getInstruments()
            .map((instruments: InstrumentModel[]) => {
                this.instruments = instruments;
            })
            .finally(() => {
                this.isDataLoading = false;
            })
            .subscribe();
    }
}
