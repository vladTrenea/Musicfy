import {Injectable} from '@angular/core';
import {Http, URLSearchParams} from '@angular/http';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';

import {BaseService} from '../../../../shared/services/base.service';
import {StorageService} from '../../../../shared/services/storage.service';
import {PaginationModel} from '../../../../shared/models/pagination.model';
import {config} from '../../../../config/configs';
import {SongItemModel} from '../models/song-item.model';
import {AddEditSongModel} from '../models/add-edit-song.model';
import {SongModel} from '../models/song.model';
import {SongsDiscoverModel} from '../models/songs-discover.model';

@Injectable()
export class SongsService extends BaseService {

    constructor(http: Http, router: Router, storageService: StorageService) {
        super(http, router, storageService);
    }

    get(pageNumber: number): Observable<PaginationModel<SongItemModel>> {
        const requestOpt = this.createAuthRequestOptions();
        const params: URLSearchParams = new URLSearchParams();
        params.set('pageNumber', pageNumber.toString());
        requestOpt.params = params;

        return this.http.get(config.apiEndpoints.songsEndpoint, requestOpt)
            .map(response => response.json() as SongItemModel[])
            .catch(error => this.handleError(error));
    }

    getById(id: string): Observable<SongModel> {
        const requestOpt = this.createAuthRequestOptions();
        const url = `${config.apiEndpoints.songsEndpoint}/${id}`;

        return this.http.get(url, requestOpt)
            .map(response => response.json() as SongModel[])
            .catch(error => this.handleError(error));
    }

    add(song: AddEditSongModel): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.post(config.apiEndpoints.songsEndpoint, JSON.stringify(song), requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    update(id: string, song: AddEditSongModel): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.put(`${config.apiEndpoints.songsEndpoint}/${id}`, JSON.stringify(song), requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    delete(id: string): Observable<Response> {
        const requestOpt = this.createAuthRequestOptions();

        return this.http.delete(`${config.apiEndpoints.songsEndpoint}/${id}`, requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    getSongUserPreference(id: string): Observable<boolean> {
        const requestOpt = this.createAuthRequestOptions();

        let url = config.apiEndpoints.songsPreferenceEndpoint;
        url = url.replace(/song_id/, id);

        return this.http.get(url, requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    toggleSongUserPreference(id: string): Observable<boolean> {
        const requestOpt = this.createAuthRequestOptions();

        let url = config.apiEndpoints.songsPreferenceEndpoint;
        url = url.replace(/song_id/, id);

        return this.http.post(url, null, requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    getSimilarSongsById(id: string, count: number): Observable<SongItemModel[]> {
        const requestOpt = this.createAuthRequestOptions();

        let params: URLSearchParams = new URLSearchParams();
        params.set('count', count.toString());
        requestOpt.params = params;

        let url = config.apiEndpoints.songRecommendationsEndpoint;
        url = url.replace(/song_id/, id);

        return this.http.get(url, requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }

    discoverSimilarSongs(title: string, count: number): Observable<SongsDiscoverModel> {
        const requestOpt = this.createAuthRequestOptions();

        const params: URLSearchParams = new URLSearchParams();
        params.set('count', count.toString());
        params.set('name', title);
        requestOpt.params = params;

        return this.http.get(config.apiEndpoints.discoverEndpoint, requestOpt)
            .map(response => response.json())
            .catch(error => this.handleError(error));
    }
}
