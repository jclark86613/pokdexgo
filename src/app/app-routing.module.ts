import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { IsValidPokedexViewGuard } from './guards/is-valid-pokedex-view.guard';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'pokedex',
    component: PokedexComponent,
    canActivate: [IsAuthenticatedGuard, IsValidPokedexViewGuard]
  },
  {
    path: 'pokedex/:layout',
    component: PokedexComponent,
    canActivate: [IsAuthenticatedGuard, IsValidPokedexViewGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
