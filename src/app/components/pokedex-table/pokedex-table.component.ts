import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from 'src/app/services/pokemon-data/pokemon-data.service';
import { Pokedex, Pokemon } from 'src/app/services/pokemon-data/pokemon-data.types';

@Component({
  selector: 'app-pokedex-table',
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss']
})
export class PokedexTableComponent implements OnInit {
  public pokedex: Pokemon[];
  public userPokedex = {};

  private emptyPokemon = {
    normal: false,
    shiny: false,
    perfect: false,
    threestar: false,
    shadow: false,
    purified: false,
  }

  public loading: boolean = true;
  public displayedColumns: string[] = ['id', 'image','name', 'standard', 'shiny', 'perfect', 'threestar', 'shadow', 'purified'];

  constructor(private pokemonDataService: PokemonDataService) {}

  ngOnInit(): void {
    this.pokemonDataService.pokedex.subscribe((pokedex: Pokedex) => {
      this.pokedex = Object.values(pokedex);
      this.userPokedex = JSON.parse(JSON.stringify(Array(this.pokedex.length).fill(this.emptyPokemon)));
      this.loading = false;
    });
  }

  public updateEntry(id:string, value: string) {
    const pokemon = this.userPokedex[id];
    if (pokemon) {
      pokemon[value] = !pokemon[value];
    }
  }

}
