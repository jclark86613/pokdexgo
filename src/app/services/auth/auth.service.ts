import { Injectable } from '@angular/core';
import { GoogleAuthProvider, User, UserCredential } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public auth: boolean = false;

  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.angularFireAuth.authState.subscribe((user) => {
      console.log(!!user)
      this.auth = !!user;
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.router.navigate(['/dex']);

      }
    });
  }


  public login(provider: string, credentials?: {email: string; password: string}): void {
    let login;

    switch (provider) {
      case 'google':
        login = this.angularFireAuth.signInWithPopup(new GoogleAuthProvider());
        break;
      default:
        login = this.angularFireAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    login.then((user : User) => {
      const auth = !!user;
      if (auth) {
        this.router.navigate(['/dex']);
      }
    })
  }

  public register(email: string, password: string) {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }


  logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}
