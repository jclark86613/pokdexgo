import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Pokedex } from './pokemon-data.types';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  private POGOAPI: string = 'https://pogoapi.net/api/v1';
  private POKIAPI: string = 'https://pokeapi.co/api/v2';
  private static = {
    pokedex: 'static/pokedex'
  };

  private pokedexDoc: AngularFirestoreDocument<Pokedex> = this.afs.doc<Pokedex>(this.static.pokedex);

  // public get pokedex(): Observable<>
  constructor(private afs: AngularFirestore) {
    // this.createPokedex();
  }

  public get pokedex(): Observable<Pokedex> {
    return this.pokedexDoc.valueChanges();
  }

  public set latestPokedex(pokedex: Pokedex) {
    console.log(pokedex)
    this.pokedexDoc.update(pokedex);
  }

  public createPokedex(): Promise<any> {
    return Promise.all([
      fetch(`${this.POGOAPI}/pokemon_names.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/released_pokemon.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/shiny_pokemon.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/shadow_pokemon.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/mega_pokemon.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/alolan_pokemon.json`).then(resp => resp.json()),
      fetch(`${this.POKIAPI}/pokemon?limit=1000`).then(resp => resp.json()),
    ]).then((response) => {
      return this.generatePokedex(response);
    })
  }
  private generatePokedex(data) {
    let [allPokemon] = data;
    const [,releases, shinies, rockets,,POKEAPI] = data;
    console.log(POKEAPI)
    for (let id in allPokemon) {
      const poke = allPokemon[id];
      const released = !!releases[poke.id];
      const shiny = !!shinies[poke.id];
      const rocket = !!rockets[poke.id];

      poke.stdForms = {
        normal: released,
        shiny: shiny,
        perfect: released,
        threestar: released,
        rocket: rocket
      };
    }
    this.latestPokedex = allPokemon;
    return Object.values(allPokemon);
  }
}
