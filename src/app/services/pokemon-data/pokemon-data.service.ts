import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Pokedex, Pokemon, Regions, UserPokedex } from './pokemon-data.types';
import { AuthService } from '../auth/auth.service';
import { User } from 'firebase/auth';
import { staticFiles } from './pokemon-data.consts';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  private pokedexDoc: AngularFirestoreDocument<Pokedex> = this.afs.doc<Pokedex>(staticFiles.POKEDEX_DOC);
  private regionsDoc: AngularFirestoreDocument<Regions> = this.afs.doc<Regions>(staticFiles.REGIONS_LIST_DOC);
  private emptyUserDoc: AngularFirestoreDocument<UserPokedex> = this.afs.doc<UserPokedex>(staticFiles.EMPTY_USER_DOC);
  private userPokedexDoc: AngularFirestoreDocument<UserPokedex>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    this.authService.user.subscribe((user: User) => {
      if(!!user) {
        this.userPokedexDoc = this.afs.doc<UserPokedex>(`pokedexs/${user.uid}`);
      }
    })
  }

  // GET STATIC FILES FOR BUILDING THE PAGE
  public get regionsList(): Observable<Regions> {
    return this.regionsDoc.valueChanges();
  }

  public get pokedex(): Observable<Pokemon[]> {
    return this.pokedexDoc.valueChanges()
      .pipe(
        map((pokedex) => {
          return Object.values(pokedex);
        })
      )
  }

  public get emptyUser(): Observable<UserPokedex> {
    return this.emptyUserDoc.valueChanges();
  }

  // GET USERS POKEDEX
  public get userPokedex(): Observable<UserPokedex> {
    return combineLatest([this.userPokedexDoc.valueChanges(), this.emptyUserDoc.get()])
    .pipe(
      map(([userPokedex, emptyUser]) => {
        return {...emptyUser.data(), ...userPokedex};
      })
    )
  }

  // POST USERS LATEST POKEDEX UPDATES
  public set latestUserPokedex(pokedex: UserPokedex) {
    this.userPokedexDoc.set(pokedex);
  }

}
