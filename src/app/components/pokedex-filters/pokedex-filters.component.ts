import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PokedexDataService } from 'src/app/services/pokedex-data/pokedex-data.service';
import { Regions, StdPokemonForms, StdPokemonFormsDoc } from 'src/app/services/pokedex-data/pokedex-data.types';
import { Filter, FILTERS, Filters } from '../pokedex-table/pokedex-table.types';

@Component({
  selector: 'app-pokedex-filters',
  templateUrl: './pokedex-filters.component.html',
  styleUrls: ['./pokedex-filters.component.scss']
})
export class PokedexFiltersComponent {
  @Input() showForm: boolean = false;
  @Output() filters: EventEmitter<Filters> = new EventEmitter<Filters>();
  
  public regionFilter: Regions = [];
  public stdFormsFilter: StdPokemonFormsDoc = [];

  private _regionsFilters: Filter;
  private _stdFormsFilter: Filter;
  private _searchFilters: Filters = [];

  constructor(private pokedexDataService: PokedexDataService) {
    this.pokedexDataService.regionsList.subscribe((regions) => {
      this.regionFilter = regions;
    })
    this.pokedexDataService.stdFormsList.subscribe((stdForms) => {
      this.stdFormsFilter = stdForms;
    })
  }

  public setFormFilter(value): void {
    this._stdFormsFilter = {
      by: FILTERS.STANDARD_POKEMON_FORMS,
      values: [value]
    };
    this._emit();
  }

  public setRegionFilter(value): void {
    this._regionsFilters = {
      by: FILTERS.GENERATION_NUMBER,
      values: [value]
    };
    this._emit();
  }

  public setSearchFilter(value): void {
    const searches = value.trim().replace(/  +/g, ' ').split(/[ ,]+/);
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
    if (this._stdFormsFilter) {
      emit.unshift(this._stdFormsFilter)
    }
    if (this._regionsFilters) {
      emit.unshift(this._regionsFilters)
    }
    this.filters.emit([...emit]);
  }
}
