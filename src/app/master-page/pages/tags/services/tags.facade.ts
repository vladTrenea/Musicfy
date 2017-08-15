import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';

import {TagsService} from './tags.service';
import {TagModel} from '../models/tag.model';

@Injectable()
export class TagsFacade {
    constructor(private tagsService: TagsService) {
    }

    getTags(): Observable<TagModel[]> {
        return this.tagsService.getAll();
    }

    getTag(id: string): Observable<TagModel> {
        return this.tagsService.getById(id);
    }

    add(tag: TagModel): Observable<Response> {
        return this.tagsService.add(tag);
    }

    update(id: string, tag: TagModel): Observable<Response> {
        return this.tagsService.update(id, tag);
    }

    delete(id: string): Observable<Response> {
        return this.tagsService.delete(id);
    }
}
