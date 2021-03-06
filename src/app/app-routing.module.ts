import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './master-page/pages/profile/profile.component';
import {MasterPageComponent} from './master-page/master-page.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {ErrorComponent} from './error/error.component';
import {AdminGuard} from './shared/guards/admin.guard';
import {DiscoverComponent} from './master-page/pages/discover/discover.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'error/:id',
        component: ErrorComponent
    },
    {
        path: '',
        component: MasterPageComponent,
        children: [
            // {
            //     path: 'profile',
            //     component: ProfileComponent,
            //     canActivate: [AuthGuard]
            // },
            {
                path: 'discover',
                component: DiscoverComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'artists',
                loadChildren: 'app/master-page/pages/artists/artists.module#ArtistsModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'songs',
                loadChildren: 'app/master-page/pages/songs/songs.module#SongsModule',
                canActivate: [AuthGuard]
            },
            {
                path: 'instruments',
                loadChildren: 'app/master-page/pages/instruments/instruments.module#InstrumentsModule',
                canActivate: [AdminGuard]

            },
            {
                path: 'songCategories',
                loadChildren: 'app/master-page/pages/song-categories/song-categories.module#SongCategoriesModule',
                canActivate: [AdminGuard]
            },
            {
                path: 'tags',
                loadChildren: 'app/master-page/pages/tags/tags.module#TagsModule',
                canActivate: [AdminGuard]
            },
            {
                path: '',
                redirectTo: '/login',
                pathMatch: 'full'
            },
        ]
    },
    {
        path: '**',
        redirectTo: '/error/404',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
