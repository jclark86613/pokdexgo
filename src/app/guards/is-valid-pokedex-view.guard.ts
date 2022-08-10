import { trigger } from '@angular/animations';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { POKEDEX_VIEW_ARRAY, POKEDEX_VIEW_ENUM } from '../pages/pokedex/pokedex.component';

@Injectable({
  providedIn: 'root'
})
export class IsValidPokedexViewGuard implements CanActivate {
  constructor( private router: Router ) {}
  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): boolean {
    const validRoute = POKEDEX_VIEW_ARRAY.includes(route.params.layout);
    if (!validRoute) {
      this.router.navigate(['pokedex/card']); 
    }
    return true;  
  }
}
