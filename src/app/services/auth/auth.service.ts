import { Injectable } from '@angular/core';
import { GoogleAuthProvider, User } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.angularFireAuth.onAuthStateChanged((user) => {
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }


  public login(provider: string): void {
    let login;

    switch (provider) {
      case 'google':
        login = this.angularFireAuth.signInWithPopup(new GoogleAuthProvider());
        break;
    }

    login.then((user : User) => {
      const auth = !!user;
      if (auth) {
        this.router.navigate(['/dex']);
      }
    })
  }


  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}
