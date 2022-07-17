import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonDataService {
  private POGOAPI: string = 'https://pogoapi.net/api/v1';
  public table;

  public generateCheckLists(data) {
    let [allPokemon] = data;
    const [,releases, shinies, rockets] = data;

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
    return Object.values(allPokemon);
  }

  public getCheckList(): Promise<any> {
    return Promise.all([
      fetch(`${this.POGOAPI}/pokemon_names.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/released_pokemon.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/shiny_pokemon.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/shadow_pokemon.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/mega_pokemon.json`).then(resp => resp.json()),
      fetch(`${this.POGOAPI}/alolan_pokemon.json`).then(resp => resp.json()),
      // fetch(`${this.POGOAPI}/galarian_pokemon.json`).then(resp => resp.json()),
      // fetch(`${this.POGOAPI}/pokemon_generations.json`).then(resp => resp.json())
    ]).then((response) => {
      return this.generateCheckLists(response);
    })
  }

}
