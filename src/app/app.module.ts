import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { BasePageComponent } from './pages/base-page/base-page.component';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { faCoffee, fas } from '@fortawesome/free-solid-svg-icons';
import { SsoLoginComponent } from './components/sso-login/sso-login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { PokedexTableComponent } from './components/pokedex-table/pokedex-table.component';
import { RegisterComponent } from './pages/register/register.component';
import { PokedexButtonComponent } from './components/pokedex-button/pokedex-button.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokedexFiltersComponent } from './components/pokedex-filters/pokedex-filters.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PokedexGenerateDataService } from './services/pokedex-generate-data/pokedex-generate-data.service';
import { AuthService } from './services/auth/auth.service';
import { MaterialModule } from './material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PokedexComponent,
    BasePageComponent,
    SsoLoginComponent,
    NavbarComponent,
    PokedexTableComponent,
    RegisterComponent,
    PokedexButtonComponent,
    PokedexFiltersComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    InfiniteScrollModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MaterialModule
  ],
  providers: [
    AuthService,
    PokedexGenerateDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    library.addIcons(faCoffee);
  }
}
