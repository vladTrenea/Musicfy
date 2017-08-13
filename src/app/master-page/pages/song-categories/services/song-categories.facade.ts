import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {SongCategoryModel} from '../models/song-category.model';
import {SongCategoriesService} from './song-categories.service';

@Injectable()
export class SongCategoriesFacade {

    constructor(private songCategoriesService: SongCategoriesService) {
    }

    getSongCategories(): Observable<SongCategoryModel[]> {
        return this.songCategoriesService.getAll();
    }

    getSongCategory(id: string): Observable<SongCategoryModel> {
        return this.songCategoriesService.getById(id);
    }

    add(instrument: SongCategoryModel): Observable<Response> {
        return this.songCategoriesService.add(instrument);
    }

    update(id: string, instrument: SongCategoryModel): Observable<Response> {
        return this.songCategoriesService.update(id, instrument);
    }

    delete(id: string): Observable<Response> {
        return this.songCategoriesService.delete(id);
    }
}
