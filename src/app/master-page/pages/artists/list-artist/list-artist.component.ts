import {Component, OnInit} from '@angular/core';

import {ArtistModel} from '../models/artist.model';
import {ArtistsFacade} from '../services/artists.facade';

@Component({
    selector: 'app-list-artist',
    templateUrl: './list-artist.component.html',
    styleUrls: ['./list-artist.component.css']
})
export class ListArtistComponent implements OnInit {

    artists: ArtistModel[] = [];

    constructor(private artistsFacade: ArtistsFacade) {
    }

    ngOnInit() {
        this.artistsFacade.getAll().subscribe(artists => {
            this.artists = artists;
        });
    }
}
