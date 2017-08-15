import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {TagModel} from '../models/tag.model';
import {TagsFacade} from '../services/tags.facade';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {config} from '../../../../config/configs';

@Component({
    selector: 'app-edit-tag',
    templateUrl: './edit-tag.component.html',
    styleUrls: ['./edit-tag.component.css']
})
export class EditTagComponent implements OnInit {

    tag: TagModel;
    errorMessage: string;
    formSubmitted: boolean;
    isDataLoading: boolean;

    constructor(private sharedService: AppSharedService,
                private tagsFacade: TagsFacade,
                private router: Router,
                private route: ActivatedRoute) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.tags, config.breadcrumb.subSections.edit));
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];

            this.isDataLoading = true;
            this.tagsFacade.getTag(id)
                .map((tag: TagModel) => {
                    this.tag = tag;
                })
                .finally(() => {
                    this.isDataLoading = false;
                })
                .subscribe();
        });
    }

    editTag(valid: boolean) {
        this.formSubmitted = true;
        this.errorMessage = '';

        if (valid) {
            this.tagsFacade
                .update(this.tag.id, this.tag)
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
