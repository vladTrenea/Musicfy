import {ArtistModel} from '../../artists/models/artist.model';

export class SongRecommendationModel {
    id: string;
    name: string;
    artist: ArtistModel;
}
