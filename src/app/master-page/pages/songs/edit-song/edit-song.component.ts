import {Component, OnInit} from '@angular/core';
import {Select2OptionData} from 'ng2-select2';
import {Router, ActivatedRoute} from '@angular/router';

import {SongModel} from '../models/song.model';
import {config} from '../../../../config/configs';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {SongsFacade} from '../services/songs.facade';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {InstrumentModel} from '../../instruments/models/instrument.model';
import {SongCategoryModel} from '../../song-categories/models/song-category.model';
import {ArtistModel} from '../../artists/models/artist.model';
import {TagModel} from '../../tags/models/tag.model';

@Component({
    selector: 'app-edit-song',
    templateUrl: './edit-song.component.html',
    styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {

    song: SongModel = new SongModel();
    artists: Select2OptionData[] = [];
    songCategories: Select2OptionData[] = [];
    instruments: Select2OptionData[] = [];
    tags: Select2OptionData[] = [];

    errorMessage: string;
    formSubmitted: boolean;
    isDataLoading: boolean;

    constructor(private sharedService: AppSharedService,
                private songsFacade: SongsFacade,
                private router: Router,
                private route: ActivatedRoute) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.songs, config.breadcrumb.subSections.edit));
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            const id = params['id'];

            this.isDataLoading = true;
            this.songsFacade.getSongById(id)
                .map((song: SongModel) => {
                    console.log(this.song);
                    this.song = song;
                })
                .finally(() => {
                    this.isDataLoading = false;
                })
                .subscribe();
        });

        this.songsFacade.getAllArtists()
            .map((artists: ArtistModel[]) => {
                for (const artist of artists) {
                    artist.text = artist.name;
                }
                this.artists = artists;
            })
            .subscribe();

        this.songsFacade.getAllSongCategories()
            .map((songCategories: SongCategoryModel[]) => {
                for (const songCategory of songCategories) {
                    songCategory.text = songCategory.name;
                }
                this.songCategories = songCategories;
            })
            .subscribe();

        this.songsFacade.getAllInstruments()
            .map((instruments: InstrumentModel[]) => {
                for (const instrument of instruments) {
                    instrument.text = instrument.name;
                }
                this.instruments = instruments;
            })
            .subscribe();

        this.songsFacade.getAllTags()
            .map((tags: TagModel[]) => {
                for (const tag of tags) {
                    tag.text = tag.name;
                }
                this.tags = tags;
            })
            .subscribe();
    }

    changeInstrument($event) {
        this.song.instrumentIds = $event.value;
    }

    changeArtist($event) {
        this.song.artistId = $event.value;
    }

    changeSongCategory($event) {
        this.song.songCategoryId = $event.value;
    }

    changeTag($event) {
        this.song.tagIds = $event.value;
    }

    editSong(valid: boolean) {
        this.formSubmitted = true;
        this.errorMessage = '';

        if (valid) {
            this.songsFacade
                .update(this.song.id, this.song)
                .subscribe(() => {
                        this.goToList();
                    },
                    (error: Error) => {
                        this.errorMessage = error.message;
                    });
        }
    }

    goToList() {
        this.router.navigate(['songs/list']);
    }

}
