import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class IsAuthenticatedGuard implements CanActivate {
  constructor(private router: Router, private angularFireAuth: AngularFireAuth) {}

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<boolean>  {
    return new Promise((resolve) => {
      this.angularFireAuth.onAuthStateChanged((user) => {
        console.log({auth: !!user})
        if (user) {
          resolve(true);
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
    });
  }

}
