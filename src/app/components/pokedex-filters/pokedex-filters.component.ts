import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PokemonDataService } from 'src/app/services/pokemon-data/pokemon-data.service';
import { Regions } from 'src/app/services/pokemon-data/pokemon-data.types';

@Component({
  selector: 'app-pokedex-filters',
  templateUrl: './pokedex-filters.component.html',
  styleUrls: ['./pokedex-filters.component.scss']
})
export class PokedexFiltersComponent{
  public regionFilter: Regions = [];
  @Output() search: EventEmitter<string> = new EventEmitter<string>();
  @Output() region: EventEmitter<number> = new EventEmitter<number>();

  constructor(private pokemonDataService: PokemonDataService) {
    this.pokemonDataService.regionsList.subscribe((regions) =>{
      this.regionFilter = regions;
    })
  }

  public setRegionFilter(event): void {
    this.region.next(event.value);
  }

  public setSearchFilter(event): void {
    this.search.next(event.target.value.toLowerCase());
  }
}
