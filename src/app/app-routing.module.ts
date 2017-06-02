import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';

import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './master-page/pages/profile/profile.component';
import {MasterPageComponent} from './master-page/master-page.component';
import {FaqComponent} from './master-page/pages/faq/faq.component';
import {AuthGuard} from './shared/guards/auth.guard';

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
