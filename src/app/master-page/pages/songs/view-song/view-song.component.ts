import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {SongModel} from '../models/song.model';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {SongsFacade} from '../services/songs.facade';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {config} from '../../../../config/configs';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';

@Component({
    selector: 'app-view-song',
    templateUrl: './view-song.component.html',
    styleUrls: ['./view-song.component.css']
})
export class ViewSongComponent implements OnInit {

    song: SongModel;
    videoUrl: SafeResourceUrl;
    isDataLoading: boolean;

    constructor(private sharedService: AppSharedService,
                private songsFacade: SongsFacade,
                private location: Location,
                private route: ActivatedRoute,
                private sanitizer: DomSanitizer) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.songs, config.breadcrumb.subSections.view));
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];

            this.isDataLoading = true;
            this.songsFacade.getSongById(id)
                .map((song: SongModel) => {
                    this.song = song;
                    this.song.url = this.song.url.replace('watch?v=', 'embed/');
                    this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.song.url);
                })
                .finally(() => {
                    this.isDataLoading = false;
                })
                .subscribe();
        });
    }

    goBack(): void {
        this.location.back();
    }
}
