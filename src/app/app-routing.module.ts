import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { LoginComponent } from './pages/login/login.component';
import { PokedexComponent } from './pages/pokedex/pokedex.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', redirectTo: '/dex', pathMatch: 'full' },
  {
    path: 'dex',
    component: PokedexComponent,
    canActivate: [IsAuthenticatedGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
