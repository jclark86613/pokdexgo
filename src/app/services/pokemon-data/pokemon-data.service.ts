import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Pokedex, Regions, UserPokedex } from './pokemon-data.types';
import { AuthService } from '../auth/auth.service';
import { User } from 'firebase/auth';
import { staticFiles } from './pokemon-data.consts';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  private pokedexDoc: AngularFirestoreDocument<Pokedex> = this.afs.doc<Pokedex>(staticFiles.POKEDEX_DOC);
  private regionsDoc: AngularFirestoreDocument<Regions> = this.afs.doc<Regions>(staticFiles.REGION_DOC);
  private emptyUserDoc: AngularFirestoreDocument<UserPokedex> = this.afs.doc<UserPokedex>(staticFiles.EMPTY_USER_DOC);
  private userPokedexDoc: AngularFirestoreDocument<UserPokedex>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.authService.user.subscribe((user: User) => {
      this.userPokedexDoc = this.afs.doc<UserPokedex>(`pokedexs/${user.uid}`);
    })
  }

  public get regionsList(): Observable<Regions> {
    return this.regionsDoc.valueChanges();
  }

  public get pokedex(): Observable<Pokedex> {
    return this.pokedexDoc.valueChanges();
  }

  public get userPokedex(): Observable<UserPokedex> {
    return this.userPokedexDoc.valueChanges();
  }

  public get emptyUser(): Observable<UserPokedex> {
    return this.emptyUserDoc.valueChanges();
  }

  public set latestUserPokedex(pokedex: UserPokedex) {
    this.userPokedexDoc.update(pokedex);
  }

  public createNewUserPokedex(pokedex: UserPokedex): void {
    this.userPokedexDoc.set(pokedex);
  }

}
