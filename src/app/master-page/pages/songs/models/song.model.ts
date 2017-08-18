import {ArtistModel} from '../../artists/models/artist.model';
import {SongCategoryModel} from '../../song-categories/models/song-category.model';
import {InstrumentModel} from '../../instruments/models/instrument.model';
import {TagModel} from '../../tags/models/tag.model';

export class SongModel {
    id: string;
    name: string;
    url: string;
    artist: ArtistModel;
    songCategory: SongCategoryModel;
    instruments: InstrumentModel[];
    tags: TagModel[];
}
