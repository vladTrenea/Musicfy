export class AddEditSongModel {
    id: string;
    name: string;
    url: string;
    artistId: string;
    songCategoryId: string;
    instrumentIds: string[];
    tagIds: string[];

    constructor() {
        this.instrumentIds = [];
        this.tagIds = [];
    }
}
