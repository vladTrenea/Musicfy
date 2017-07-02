import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Http, HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './login/login.component';
import {ErrorComponent} from './error/error.component';
import {ProfileComponent} from './master-page/pages/profile/profile.component';
import {AppRoutingModule} from './app-routing.module';
import {MenuComponent} from './master-page/menu/menu.component';
import {MasterPageComponent} from './master-page/master-page.component';
import {FaqComponent} from './master-page/pages/faq/faq.component';
import {ArtistsModule} from './master-page/pages/artists/artists.module';
import {SongsModule} from './master-page/pages/songs/songs.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ErrorComponent,
        ProfileComponent,
        MenuComponent,
        MasterPageComponent,
        FaqComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        SharedModule,
        ArtistsModule,
        SongsModule
    ],
    exports: [],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
