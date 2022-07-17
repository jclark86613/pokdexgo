import { Component, OnInit } from '@angular/core';
import { PokemonDataService } from 'src/app/services/pokemon-data/pokemon-data.service';

@Component({
  selector: 'app-pokedex-table',
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss']
})
export class PokedexTableComponent implements OnInit {
  public table;
  public loading = true;
  public displayedColumns: string[] = ['id', 'name', 'standard', 'shiny', 'perfect', 'threestar', 'shadow', 'purified'];

  constructor(private pokemonDataService: PokemonDataService) {
    pokemonDataService.getCheckList().then(data => {
      this.table = data;
      this.loading = false;
    });
  }

  ngOnInit(): void {
  }

}
