import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {MdDialog} from '@angular/material';

import {TagModel} from '../models/tag.model';
import {TagsFacade} from '../services/tags.facade';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {config} from '../../../../config/configs';
import {ModalComponent} from '../../../../shared/modals/modal/modal.component';
import {ModalResponse} from '../../../../shared/modals/modal-response.model';

@Component({
    selector: 'app-list-tag',
    templateUrl: './list-tag.component.html',
    styleUrls: ['./list-tag.component.css']
})
export class ListTagComponent implements OnInit {

    tags: TagModel[];
    isDataLoading: boolean;

    constructor(private sharedService: AppSharedService,
                private tagsFacade: TagsFacade,
                private router: Router,
                private dialog: MdDialog) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.tags, config.breadcrumb.subSections.list));
    }

    ngOnInit() {
        this.loadTags();
    }

    goToAddTag() {
        this.router.navigate(['tags/add']);
    }

    goToEditTag(id: string) {
        this.router.navigate([`tags/edit/${id}`]);
    }

    onDeleteTagClick(id: string) {
        const dialogRef = this.dialog.open(ModalComponent);
        dialogRef.componentInstance.initDialog('Delete', 'Are you sure?', true);
        dialogRef.afterClosed().subscribe((result: ModalResponse) => {
            if (result && result.isCallback) {
                this.tagsFacade.delete(id)
                    .subscribe(() => {
                        location.reload();
                    });
            }
        });
    }

    private loadTags() {
        this.isDataLoading = true;
        this.tagsFacade.getTags()
            .map((tags: TagModel[]) => {
                this.tags = tags;
            })
            .finally(() => {
                this.isDataLoading = false;
            })
            .subscribe();
    }
}
