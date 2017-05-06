import {Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: 'artists',
        loadChildren: 'app/artists/artists.module#ArtistsModule'
    },
    {
        path: 'songs',
        loadChildren: 'app/songs/songs.module#SongsModule'
    },
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/error/notFound',
        pathMatch: 'full'
    }
];
