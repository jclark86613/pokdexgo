import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { staticFiles } from '../pokedex-data/pokedex-data.consts';
import { EMPTY_POKEMON, Pokedex, RegionsDoc, REGIONS_ARRAY, STANDARD_POKEMON_FORMS_ARRAY, StdPokemonFormsDoc, UserPokedex, UserPokemon } from '../pokedex-data/pokedex-data.types';

@Injectable({
  providedIn: 'root'
})
export class PokedexGenerateDataService {
  private POGOAPI: string = 'https://pogoapi.net/api/v1';
  private emptyPokemon: UserPokemon = EMPTY_POKEMON;

  // doc listeners
  private pokedexDoc: AngularFirestoreDocument<Pokedex> = this.afs.doc<Pokedex>(staticFiles.POKEDEX_DOC);
  private regionsDoc: AngularFirestoreDocument<RegionsDoc> = this.afs.doc<RegionsDoc>(staticFiles.REGIONS_LIST_DOC);
  private emptyPokemonDoc: AngularFirestoreDocument<RegionsDoc> = this.afs.doc<RegionsDoc>(staticFiles.EMPTY_POKEMON_DOC);
  private stdFormsDoc: AngularFirestoreDocument<StdPokemonFormsDoc> = this.afs.doc<StdPokemonFormsDoc>(staticFiles.STD_FORMS_DOC);
  private emptyUserDoc: AngularFirestoreDocument<UserPokedex> = this.afs.doc<UserPokedex>(staticFiles.EMPTY_USER_DOC);

  constructor(private afs: AngularFirestore) {
    // TODO move createPokedex() logic to firebase function
    // run on a schedule to passivly pick up new updates
    this.createPokedex();
    this.createEmptyPokemon();
    this.createRegionList();
    this.createStandardFormsList();
    this.createNewUserDoc();
  }

  public createEmptyPokemon(): void {
    this.emptyPokemonDoc.set(this.emptyPokemon);
  }

  public createStandardFormsList(): void {
    let id = 1;
    const regions: StdPokemonFormsDoc = STANDARD_POKEMON_FORMS_ARRAY.map(stdForms => {
      return {
        id: id++,
        name: stdForms
      }
    })
    this.stdFormsDoc.set(Object.assign({}, regions));
  }

  public createNewUserDoc(): void {
    this.pokedexDoc.valueChanges().subscribe((pokedex: Pokedex) => {
      const newUser = JSON.parse(JSON.stringify(Array(Object.values(pokedex).length + 1).fill(this.emptyPokemon)));
      this.emptyUserDoc.set(Object.assign({}, newUser));
    })
  };

  public createRegionList(): void {
    let id = 1;
    const regions: RegionsDoc = REGIONS_ARRAY.map(region => {
      return {
        id: id++,
        name: region
      }
    })
    this.regionsDoc.set(Object.assign({}, regions));
  }

  public createPokedex(): Promise<Pokedex> {
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
