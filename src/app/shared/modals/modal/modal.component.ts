import {Component} from '@angular/core';
import {MdDialogRef} from '@angular/material';

import {ModalResponse} from '../modal-response.model';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.css']
})
export class ModalComponent {

    public title: string;
    public description: string;

    public isConfirm: boolean;
    public labelOk: string;
    public labelCancel: string;

    constructor(protected dialogRef: MdDialogRef<ModalComponent>) {
    }

    initDialog(title, description, isConfirm, labelOk = 'Yes', labelCancel = 'No') {
        this.title = title;
        this.description = description;
        this.isConfirm = isConfirm;
        this.labelOk = labelOk;
        this.labelCancel = labelCancel;
    }

    ok() {
        const modalResponse = new ModalResponse();
        modalResponse.isCallback = true;

        this.dialogRef.close(modalResponse);
    }

    cancel() {
        const modalResponse = new ModalResponse();
        modalResponse.isCallback = false;

        this.dialogRef.close(modalResponse);
    }
}
