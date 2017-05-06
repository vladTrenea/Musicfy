import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './master-page/pages/profile/profile.component';
import {MasterPageComponent} from './master-page/master-page.component';
import {FaqComponent} from './master-page/pages/faq/faq.component';

const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
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
                loadChildren: 'app/artists/artists.module#ArtistsModule'
            },
            {
                path: 'songs',
                loadChildren: 'app/songs/songs.module#SongsModule'
            },
            {
                path: 'faq',
                component: FaqComponent
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
        redirectTo: '/error/notFound',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}
