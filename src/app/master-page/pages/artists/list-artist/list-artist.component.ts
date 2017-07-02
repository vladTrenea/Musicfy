import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {ArtistModel} from '../models/artist.model';
import {ArtistsFacade} from '../services/artists.facade';

@Component({
    selector: 'app-list-artist',
    templateUrl: './list-artist.component.html',
    styleUrls: ['./list-artist.component.css']
})
export class ListArtistComponent implements OnInit {

    artists: ArtistModel[] = [];

    constructor(private artistsFacade: ArtistsFacade,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            this.loadArtists(+params['id']);
        });
    }

    loadArtists(pageNumber: number) {
        this.artistsFacade.getArtists(1).subscribe(artists => {
            this.artists = artists;
        });
    }
}
