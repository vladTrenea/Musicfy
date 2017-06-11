import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {ArtistModel} from '../models/artist.model';
import {ArtistsService} from './artists.service';

@Injectable()
export class ArtistsFacade {
    constructor(private artistsService: ArtistsService) {
    }

    getAll(): Observable<ArtistModel[]> {
        return this.artistsService.getAll();
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
