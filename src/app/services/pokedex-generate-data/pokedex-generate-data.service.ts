import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { staticFiles } from '../pokemon-data/pokemon-data.consts';
import { PokemonDataService } from '../pokemon-data/pokemon-data.service';
import { Pokedex, Regions, UserPokedex } from '../pokemon-data/pokemon-data.types';

@Injectable({
  providedIn: 'root'
})
export class PokedexGenerateDataService {
  private POGOAPI: string = 'https://pogoapi.net/api/v1';
  private availableRegions = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh', 'Unova', 'Kalos', 'Alola', 'Galar'];
  private emptyPokemon = {
    normal: false,
    shiny: false,
    perfect: false,
    lucky: false,
    threestar: false,
    shadow: false,
    purified: false,
  }

  // doc listeners
  private pokedexDoc: AngularFirestoreDocument<Pokedex> = this.afs.doc<Pokedex>(staticFiles.POKEDEX_DOC);
  private regionsDoc: AngularFirestoreDocument<Regions> = this.afs.doc<Regions>(staticFiles.REGIONS_LIST_DOC);
  private newUserDoc: AngularFirestoreDocument<UserPokedex> = this.afs.doc<UserPokedex>(staticFiles.EMPTY_USER_DOC);

  constructor(private afs: AngularFirestore, private pokemonDataService: PokemonDataService) {
    // TODO move createPokedex() logic to firebase function
    // run on a schedule to passivly pick up new updates
    this.createPokedex();
    this.createRegionList();
    this.createNewUserDoc();
  }

  public createNewUserDoc(): void {
    console.log('createNewUserDoc')
    this.pokemonDataService.pokedex.subscribe((pokedex: Pokedex) => {
      const newUser = JSON.parse(JSON.stringify(Array(Object.values(pokedex).length + 1).fill(this.emptyPokemon)));
      this.newUserDoc.update(Object.assign({}, newUser));
    })
  };

  public createRegionList(): void {
    console.log('createRegionList')
    let id = 1;
    const regions = this.availableRegions.map(region => {
      return {
        id: id++,
        name: region
      }
    })
    this.regionsDoc.update(Object.assign({}, regions));
  }

  public createPokedex(): Promise<Pokedex> {
    console.log('createPokedex')
    return Promise.all([
      fetch(`${this.POGOAPI}/pokemon_generations.json`).then(resp => resp.json()),
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
        shadow: rocket,
        purified: rocket
      };
    }
    this.pokedexDoc.update(Object.assign({}, allPokemon));
    return allPokemon;
  }

}
