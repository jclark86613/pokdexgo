import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from 'src/app/services/pokemon-data/pokemon-data.service';
import { Pokedex, Pokemon } from 'src/app/services/pokemon-data/pokemon-data.types';

@Component({
  selector: 'app-pokedex-table',
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss']
})
export class PokedexTableComponent implements OnInit {
  public table: Pokemon[];
  public loading: boolean = true;
  public displayedColumns: string[] = ['id', 'name', 'standard', 'shiny', 'perfect', 'threestar', 'shadow', 'purified'];

  constructor(private pokemonDataService: PokemonDataService) {}

  ngOnInit(): void {
    this.pokemonDataService.pokedex.subscribe((pokedex: Pokedex) => {
      this.table = Object.values(pokedex);
      this.loading = false;
    });
  }

}
