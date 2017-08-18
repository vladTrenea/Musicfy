import {Component, OnInit, ViewChild} from '@angular/core';
import {Select2OptionData} from 'ng2-select2';
import {Router, ActivatedRoute} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {AddEditSongModel} from '../models/add-edit-song.model';
import {config} from '../../../../config/configs';
import {AppSharedService} from '../../../../shared/services/app-shared.service';
import {SongsFacade} from '../services/songs.facade';
import {PageChangeEvent} from '../../../../shared/models/page-change-event.model';
import {InstrumentModel} from '../../instruments/models/instrument.model';
import {SongCategoryModel} from '../../song-categories/models/song-category.model';
import {ArtistModel} from '../../artists/models/artist.model';
import {TagModel} from '../../tags/models/tag.model';
import {SongModel} from '../models/song.model';

@Component({
    selector: 'app-edit-song',
    templateUrl: './edit-song.component.html',
    styleUrls: ['./edit-song.component.css']
})
export class EditSongComponent implements OnInit {

    song: AddEditSongModel = new AddEditSongModel();
    artists: Select2OptionData[] = [];
    songCategories: Select2OptionData[] = [];
    instruments: Select2OptionData[] = [];
    tags: Select2OptionData[] = [];

    errorMessage: string;
    formSubmitted: boolean;
    isDataLoading: boolean;

    instrumentsOptions: Select2Options = {
        multiple: true
    };

    tagsOptions: Select2Options = {
        multiple: true
    };

    constructor(private sharedService: AppSharedService,
                private songsFacade: SongsFacade,
                private router: Router,
                private route: ActivatedRoute) {
        sharedService.emitPageChange(
            new PageChangeEvent(config.breadcrumb.sections.songs, config.breadcrumb.subSections.edit));
    }

    ngOnInit() {
        const artistsObs = this.songsFacade.getAllArtists()
            .map((artists: ArtistModel[]) => {
                for (const artist of artists) {
                    artist.text = artist.name;
                }
                this.artists = artists;
            });

        const songCategoriesObs = this.songsFacade.getAllSongCategories()
            .map((songCategories: SongCategoryModel[]) => {
                for (const songCategory of songCategories) {
                    songCategory.text = songCategory.name;
                }
                this.songCategories = songCategories;
            });

        const instrumentsObs = this.songsFacade.getAllInstruments()
            .map((instruments: InstrumentModel[]) => {
                for (const instrument of instruments) {
                    instrument.text = instrument.name;
                }
                this.instruments = instruments;
            });

        const tagsObs = this.songsFacade.getAllTags()
            .map((tags: TagModel[]) => {
                for (const tag of tags) {
                    tag.text = tag.name;
                }
                this.tags = tags;
            });

        Observable.forkJoin(
            artistsObs,
            songCategoriesObs,
            instrumentsObs,
            tagsObs
        )
            .subscribe(() => {
                this.route.params.subscribe(params => {
                    const id = params['id'];

                    this.isDataLoading = true;
                    this.songsFacade.getSongById(id)
                        .map((song: SongModel) => {
                            this.song = this.mapSongToAddEditSong(song);
                        })
                        .finally(() => {
                            this.isDataLoading = false;
                        })
                        .subscribe();
                });
            });
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

    private mapSongToAddEditSong(song: SongModel): AddEditSongModel {
        const addEditSong = new AddEditSongModel();
        addEditSong.id = song.id;
        addEditSong.name = song.name;
        addEditSong.url = song.url;
        addEditSong.artistId = song.artist.id;
        addEditSong.songCategoryId = song.songCategory.id;

        addEditSong.instrumentIds = song.instruments.map(function (instrument, index, array) {
            return instrument.id;
        });
        addEditSong.tagIds = song.tags.map(function (tag, index, array) {
            return tag.id;
        });

        return addEditSong;
    }
}
