import { Component, EventEmitter, Output } from '@angular/core';
import { PokedexDataService } from 'src/app/services/pokedex-data/pokedex-data.service';
import { Regions, StdPokemonForms } from 'src/app/services/pokedex-data/pokedex-data.types';
import { Filter, FILTERS, Filters } from '../pokedex-table/pokedex-table.types';

@Component({
  selector: 'app-pokedex-filters',
  templateUrl: './pokedex-filters.component.html',
  styleUrls: ['./pokedex-filters.component.scss']
})
export class PokedexFiltersComponent{
  @Output() filters: EventEmitter<Filters> = new EventEmitter<Filters>();
  
  public regionFilter: Regions = [];
  public stdFormsFilter: StdPokemonForms = [];
  
  private _regionsFilters: Filter;
  private _searchFilters: Filters = [];

  constructor(private pokedexDataService: PokedexDataService) {
    this.pokedexDataService.regionsList.subscribe((regions) => {
      this.regionFilter = regions;
    })
    this.pokedexDataService.stdFormsList.subscribe((stdForms) => {
      this.stdFormsFilter = stdForms;
    })
  }

  public setFormFilter(event): void {
    
  }

  public setRegionFilter(event): void {
    this._regionsFilters = {
      by: FILTERS.GENERATION_NUMBER,
      values: [event.value]
    };
    this._emit();
  }

  public setSearchFilter(event): void {
    const searches = event.target.value.trim().replace(/  +/g, ' ').split(/[ ,]+/);
    const byId = {
      by: FILTERS.ID,
      values: []
    };
    const byName = {
      by: FILTERS.NAME,
      values: []
    };

    for ( let search of searches ) {
      let isNumber = parseInt(search,10);
      if (search && isNaN(isNumber)) {
        byName.values.push(search);
      } else if (isNumber) {
        byId.values.push(isNumber);
      }
    }

    this._searchFilters = [];
    if (byId.values.length) {
      this._searchFilters.push(byId);
    }
    if (byName.values.length) {
      this._searchFilters.push(byName);
    }
    
    this._emit();
  }

  private _emit(): void {
    let emit = [...this._searchFilters];
    if (this._regionsFilters) {
      emit.unshift(this._regionsFilters)
    }
    this.filters.emit([...emit]);
  }
}
