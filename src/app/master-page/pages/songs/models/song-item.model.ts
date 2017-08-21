import {ArtistModel} from '../../artists/models/artist.model';

export class SongItemModel {
    id: string;
    name: string;
    artist: ArtistModel;
}
