import {Component} from '@angular/core';
import {config} from '../../../config/configs';

@Component({
    selector: 'app-progress-spinner',
    templateUrl: './progress-spinner.component.html',
    styleUrls: ['./progress-spinner.component.css']
})
export class ProgressSpinnerComponent {

    color: string = config.progressSpinner.color;
    mode: string = config.progressSpinner.mode;

    constructor() {
    }
}
