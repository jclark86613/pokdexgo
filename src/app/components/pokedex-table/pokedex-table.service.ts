import { Injectable } from '@angular/core';
import { PokedexDataService } from 'src/app/services/pokedex-data/pokedex-data.service';
import { Pokemon, UserPokedex } from 'src/app/services/pokedex-data/pokedex-data.types';
import { FILTERS, Filters } from './pokedex-table.types';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokedexTableService {

  public userPokedex$: Observable<UserPokedex>;
  public pokedex$: Observable<Pokemon[]>;

  constructor(private pokedexDataService: PokedexDataService) {
    const api: PokedexDataService = this.pokedexDataService;
    this.userPokedex$ = api.userPokedex;
    this.pokedex$ = api.pokedex;
  }

  // POST USERS LATEST POKEDEX UPDATES
  public set latestUserPokedex(pokedex: UserPokedex) {
    this.pokedexDataService.latestUserPokedex = pokedex;
  }
  public 
  
  filter(pokedex: Pokemon[], filters: Filters): Pokemon[] {
    if(!filters.length) {
      return pokedex;
    }
    return pokedex
      // FILTER BY REGION
      .filter( pokemon => {
        let output = true;
        for (let filter of filters) {
          if (filter.by !== FILTERS.GENERATION_NUMBER) { continue; }
          output = false;
          for (let value of filter.values) {
            if (pokemon[filter.by] === value) {
              output = true;
            }
          }
        }
        return output;
      })
      // FILTER BY NAME/ID 
      .filter(pokemon => {
        let output = true;
        for (let filter of filters) {
          if (filter.by !== FILTERS.ID && filter.by !== FILTERS.NAME) { continue; }
          output = false;
          for (let value of filter.values) {
            switch(filter.by) {
              case FILTERS.ID:
                if(pokemon[filter.by] === value) {
                  return true;
                }
                break;
              case FILTERS.NAME:              
                if ((pokemon[filter.by] as string).toLowerCase().includes((value as string).toLowerCase())) {
                  return true;
                }
                break;
            }
          }
        }
        return output;
      });
  }
}
