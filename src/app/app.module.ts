import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {BrowserAnimationsModule, NoopAnimationsModule} from '@angular/platform-browser/animations';
import 'hammerjs';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './login/login.component';
import {ErrorComponent} from './error/error.component';
import {ProfileComponent} from './master-page/pages/profile/profile.component';
import {AppRoutingModule} from './app-routing.module';
import {MenuComponent} from './master-page/menu/menu.component';
import {MasterPageComponent} from './master-page/master-page.component';
import {ArtistsModule} from './master-page/pages/artists/artists.module';
import {SongsModule} from './master-page/pages/songs/songs.module';
import {AppSharedService} from './shared/services/app-shared.service';
import {InstrumentsModule} from './master-page/pages/instruments/instruments.module';
import {SongCategoriesModule} from './master-page/pages/song-categories/song-categories.module';
import {TagsModule} from './master-page/pages/tags/tags.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ErrorComponent,
        ProfileComponent,
        MenuComponent,
        MasterPageComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        NoopAnimationsModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        SharedModule,
        ArtistsModule,
        SongsModule,
        InstrumentsModule,
        SongCategoriesModule,
        TagsModule
    ],
    exports: [],
    providers: [AppSharedService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
