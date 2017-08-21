import {Component} from '@angular/core';
import {Router} from '@angular/router';

import {AppSharedService} from '../../../shared/services/app-shared.service';
import {PageChangeEvent} from '../../../shared/models/page-change-event.model';
import {config} from '../../../config/configs';
import {SongItemModel} from '../songs/models/song-item.model';
import {SongsFacade} from '../songs/services/songs.facade';
import {SongsDiscoverModel} from '../songs/models/songs-discover.model';

@Component({
    selector: 'app-discover',
    templateUrl: './discover.component.html',
    styleUrls: ['./discover.component.css']
})
export class DiscoverComponent {

    matchedSong: SongItemModel;
    songRecommendations: SongItemModel[];

    searchText: string;
    searchSubmitted: boolean;
    isDataLoading: boolean;

    constructor(private sharedService: AppSharedService,
                private router: Router,
                private songsFacade: SongsFacade) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.discover, ''));
    }

    goToViewSong(id: string): void {
        this.router.navigate([`songs/view/${id}`]);
    }

    search(): void {
        this.searchSubmitted = true;
        if (this.searchText) {
            this.isDataLoading = true;
            this.songsFacade
                .discoverSimilarSongs(this.searchText, config.constants.discoverPage.recommendationsCount)
                .map((discoverResult: SongsDiscoverModel) => {
                    this.songRecommendations = discoverResult.recommendedSongs;
                    this.matchedSong = discoverResult.matchedSong;
                })
                .finally(() => {
                    this.isDataLoading = false;
                })
                .subscribe();
        }
    }
}
