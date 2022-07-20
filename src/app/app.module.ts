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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { AngularFireModule } from '@angular/fire/compat';
import { MatButtonModule } from '@angular/material/button';
import { PokedexTableComponent } from './components/pokedex-table/pokedex-table.component';
import { MatTableModule } from '@angular/material/table';
import { RegisterComponent } from './pages/register/register.component';
import { PokedexButtonComponent } from './components/pokedex-button/pokedex-button.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokedexFiltersComponent } from './components/pokedex-filters/pokedex-filters.component';
import { MatSelectModule } from '@angular/material/select';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { PokedexGenerateDataService } from './services/pokedex-generate-data/pokedex-generate-data.service';
import { AuthService } from './services/auth/auth.service';


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
    MatButtonToggleModule,
    MatIconModule,
    MatToolbarModule,
    FlexLayoutModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTableModule,
    InfiniteScrollModule,
    MatSelectModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule
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
