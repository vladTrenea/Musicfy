import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {config} from '../config/configs';

@Component({
    selector: 'app-error',
    templateUrl: './error.component.html',
    styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

    errorMessage: string;

    constructor(private route: ActivatedRoute,
                private location: Location) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.loadErrorMessage(+params['id']);
        });
    }

    goBack(): void {
        this.location.back();
    }

    private loadErrorMessage(errorCode: number): void {
        const statusCodes = config.statusCodes;

        this.errorMessage = config.errorMessages[errorCode];
    }
}
