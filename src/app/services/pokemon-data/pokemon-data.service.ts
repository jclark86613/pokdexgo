import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Pokedex, UserPokedex } from './pokemon-data.types';
import { AuthService } from '../auth/auth.service';
import { User } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  private POGOAPI: string = 'https://pogoapi.net/api/v1';
  private POKEDEX_DOC: string = 'static/pokedex';

  private pokedexDoc: AngularFirestoreDocument<Pokedex> = this.afs.doc<Pokedex>(this.POKEDEX_DOC);
  private userPokedexDoc: AngularFirestoreDocument<UserPokedex>;

  constructor(private afs: AngularFirestore, private authService: AuthService) {
    // TODO move createPokedex() logic to firebase function
    // run on a schedule to passivly pick up new updates
    this.createPokedex();
    this.authService.user.subscribe((user: User) => {
      this.userPokedexDoc = this.afs.doc<UserPokedex>(`pokedexs/${user.uid}`);
    })
  }

  public get pokedex(): Observable<Pokedex> {
    return this.pokedexDoc.valueChanges();
  }

  public set latestPokedex(pokedex: Pokedex) {
    this.pokedexDoc.update(pokedex);
  }

  public get userPokedex(): Observable<UserPokedex> {
    return this.userPokedexDoc.valueChanges();
  }

  public set latestUserPokedex(pokedex: UserPokedex) {
    this.userPokedexDoc.update(pokedex);
  }

  public createNewUserPokedex(pokedex: UserPokedex): void {
    this.userPokedexDoc.set(pokedex);
  }

  public createPokedex(): Promise<Pokedex> {
    return Promise.all([
      fetch(`${this.POGOAPI}/pokemon_generations.json`).then(resp => resp.json()),
      // fetch(`${this.POGOAPI}/pokemon_names.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/released_pokemon.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/shiny_pokemon.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/shadow_pokemon.json`).then(resp => resp.json()),
    ]).then((response) => {
      return this.generatePokedex(response);
    })
  }

  private generatePokedex(data): Pokedex {
    let [allPokemon] = data;
    // API response is an array of arrays, flatten to single array
    allPokemon = [].concat.apply([], Object.values(allPokemon));
    const [,releases, shinies, rockets] = data;

    for (let id in allPokemon) {
      const poke = allPokemon[id];
      const released = !!releases[poke.id];
      const shiny = !!shinies[poke.id];
      const rocket = !!rockets[poke.id];

      poke.stdForms = {
        normal: released,
        shiny: shiny,
        lucky: released,
        perfect: released,
        threestar: released,
        rocket: rocket
      };
    }
    this.latestPokedex = Object.assign({}, allPokemon);
    return allPokemon;
  }

}
