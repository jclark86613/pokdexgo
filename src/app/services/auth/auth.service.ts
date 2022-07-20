import { Injectable } from '@angular/core';
import { UserCredential } from '@firebase/auth-types';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { GoogleAuthProvider, User } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  // is session authenticated
  private _auth: boolean = false;
  public get isAuth(): boolean {
    return this._auth;
  }
  private set isAuth(auth: boolean) {
    this._auth = auth;
  }

  // firebase user object
  private _authUser: BehaviorSubject<User> = new BehaviorSubject(null);
  public get user(): BehaviorSubject<User> {
    return this._authUser;
  }


  constructor(private angularFireAuth: AngularFireAuth, private router: Router) {
    this.angularFireAuth.setPersistence('local');
    this.angularFireAuth.onAuthStateChanged((user: User) => {
      this._authUser.next(user);
      this.isAuth = !!user;
      if (!user) {
        this.router.navigate(['/login']);
      }
    });
  }

  public login(provider: string, credentials?: {email: string; password: string}): Promise<UserCredential> {
    let login: Promise<UserCredential>;

    switch (provider) {
      case 'google':
        login = this.angularFireAuth.signInWithPopup(new GoogleAuthProvider());
        break;
      default:
        login = this.angularFireAuth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }

    return login;
  }

  public register(email: string, password: string): Promise<UserCredential> {
    return this.angularFireAuth.createUserWithEmailAndPassword(email, password);
  }

  public logout(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}
