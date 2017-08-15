import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

import {TagModel} from '../models/tag.model';
import {TagsFacade} from '../services/tags.facade';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {config} from '../../../../config/configs';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';

@Component({
    selector: 'app-add-tag',
    templateUrl: './add-tag.component.html',
    styleUrls: ['./add-tag.component.css']
})
export class AddTagComponent {

    tag: TagModel = new TagModel();
    errorMessage: string;
    formSubmitted: boolean;

    constructor(private sharedService: AppSharedService,
                private tagsFacade: TagsFacade,
                private router: Router) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.tags, config.breadcrumb.subSections.add));
    }

    addTag(valid: boolean) {
        this.formSubmitted = true;
        this.errorMessage = '';

        if (valid) {
            this.tagsFacade
                .add(this.tag)
                .subscribe(() => {
                        this.goToList();
                    },
                    (error: Error) => {
                        this.errorMessage = error.message;
                    });
        }
    }

    goToList() {
        this.router.navigate(['tags/list']);
    }
}
