import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {PaginationModel} from '../../../../shared/models/pagination.model';
import {SongItemModel} from '../models/song-item.model';
import {SongsService} from './songs.service';
import {ArtistModel} from '../../artists/models/artist.model';
import {InstrumentModel} from '../../instruments/models/instrument.model';
import {SongCategoryModel} from '../../song-categories/models/song-category.model';
import {InstrumentsService} from '../../instruments/services/instruments.service';
import {SongCategoriesService} from '../../song-categories/services/song-categories.service';
import {ArtistsService} from '../../artists/services/artists.service';
import {SongModel} from '../models/song.model';
import {TagModel} from '../../tags/models/tag.model';
import {TagsService} from '../../tags/services/tags.service';

@Injectable()
export class SongsFacade {

    constructor(private songsService: SongsService,
                private instrumentsService: InstrumentsService,
                private songCategoriesService: SongCategoriesService,
                private artistsService: ArtistsService,
                private tagsService: TagsService) {

    }

    getSongs(pageNumber: number): Observable<PaginationModel<SongItemModel>> {
        return this.songsService.get(pageNumber);
    }

    getSongById(id: string): Observable<SongModel> {
        return this.songsService.getById(id);
    }

    add(song: SongModel) {
        return this.songsService.add(song);
    }

    update(id: string, song: SongModel) {
        return this.songsService.update(id, song);
    }

    delete(id: string) {
        return this.songsService.delete(id);
    }

    getAllArtists(): Observable<ArtistModel[]> {
        return this.artistsService.getAll();
    }

    getAllInstruments(): Observable<InstrumentModel[]> {
        return this.instrumentsService.getAll();
    }

    getAllSongCategories(): Observable<SongCategoryModel[]> {
        return this.songCategoriesService.getAll();
    }

    getAllTags(): Observable<TagModel[]> {
        return this.tagsService.getAll();
    }
}
