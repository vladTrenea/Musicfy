import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ArtistModel} from '../models/artist.model';
import {ArtistsService} from './artists.service';
import {PaginationModel} from '../../../../shared/models/pagination.model';

@Injectable()
export class ArtistsFacade {
    constructor(private artistsService: ArtistsService) {
    }

    getArtists(pageNumber: number): Observable<PaginationModel<ArtistModel>> {
        return this.artistsService.get(pageNumber);
    }

    getArtist(id: string): Observable<ArtistModel> {
        return this.artistsService.getById(id);
    }

    add(artist: ArtistModel): Observable<Response> {
        return this.artistsService.add(artist);
    }

    update(id: string, artist: ArtistModel): Observable<Response> {
        return this.artistsService.update(id, artist);
    }

    delete(id: string): Observable<Response> {
        return this.artistsService.delete(id);
    }
}
