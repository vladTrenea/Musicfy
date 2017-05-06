import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {LoginComponent} from './login/login.component';
import {ErrorComponent} from './error/error.component';
import {ProfileComponent} from './profile/profile.component';
import {AppRoutingModule} from './app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        LoginComponent,
        ErrorComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AppRoutingModule,
        SharedModule
    ],
    exports: [

    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
