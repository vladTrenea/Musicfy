import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './master-page/pages/profile/profile.component';
import {MasterPageComponent} from './master-page/master-page.component';
import {FaqComponent} from './master-page/pages/faq/faq.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {ErrorComponent} from './error/error.component';

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
            {
                path: 'profile',
                component: ProfileComponent
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
                path: 'faq',
                component: FaqComponent
            },
            {
                path: 'instruments',
                loadChildren: 'app/master-page/pages/instruments/instruments.module#InstrumentsModule',

            },
            {
                path: 'songCategories',
                loadChildren: 'app/master-page/pages/song-categories/song-categories.module#SongCategoriesModule',
            },
            {
                path: 'tags',
                loadChildren: 'app/master-page/pages/tags/tags.module#TagsModule',
                canActivate: [AuthGuard]
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
