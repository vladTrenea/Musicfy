export class SongModel {
    id: string;
    name: string;
    url: string;
    artistId: string;
    songCategoryId: string;
    instrumentIds: string[] = [];
}
