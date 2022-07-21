import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { combineLatest } from 'rxjs';
import { PokemonDataService } from 'src/app/services/pokemon-data/pokemon-data.service';
import { Pokemon, STANDARD_POKEMON_FORMS_ARRAY, STANDARD_POKEMON_FORMS_EMUN, StdPokemonForm, UserPokedex } from 'src/app/services/pokemon-data/pokemon-data.types';

@Component({
  selector: 'app-pokedex-table',
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss']
})
export class PokedexTableComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer:ElementRef;

  @Input() set region(region: number) {
    this._regionFilter = region;
    this.resetPage();
  };
  @Input() set search(search: string) {
    this._searchFilter = search;
    this.resetPage();
  };

  public tableData;
  public loading: boolean = true;
  private checklist: StdPokemonForm[] = [...STANDARD_POKEMON_FORMS_ARRAY];
  public displayedColumns: string[] = ['id', 'image', 'name', ...this.checklist];

  private userPokedex: UserPokedex;
  private pokedex: Pokemon[];
  private filtedPokedex: Pokemon[];
  private page: number = 0;
  private perPage: number = 50;
  private updateTimeout: ReturnType<typeof setTimeout>;
  private orderAsending: boolean = false;
  private sortedColumn: string = 'id';
  private _searchFilter: string;
  private _regionFilter: number;
  private _init: boolean = true;
  private _saving: boolean = true;

  constructor(private pokemonDataService: PokemonDataService) {}

  ngOnInit(): void {
    const api: PokemonDataService = this.pokemonDataService;
    combineLatest([api.pokedex, api.userPokedex]).subscribe(([pokedex, userPokedex]: [Pokemon[], UserPokedex]) => {
      this.userPokedex = userPokedex;
      this.pokedex = pokedex;
      this._saving = false;

      if (this._init) {
        this.resetPage();
        this._init = false;
        this.loading = false;
      }
    });
  }

  public sortColumn(value: StdPokemonForm): void {
    if (this.sortedColumn !== value) {
      this.sortedColumn = value;
      this.orderAsending = true;
    } else {
      this.orderAsending = !this.orderAsending;
    }

    if (!this.checklist.includes(value)) {
      this.sortByIdentifier(value);
    } else {
      this.sortByChecklist(value);
    }
    this.resetPage();
  }

  public nextPage(): void {
    if (!this.tableData) {
      this.resetPage();
    } else {
      this.page++;
      const start = this.page * this.perPage;
      const end = start + this.perPage;
      this.tableData = this.tableData.concat(this.filtedPokedex.slice(start, end));
    }
  }

  public updateEntry(id:string, value: StdPokemonForm, forced: boolean) {
    if (this._saving) { return;}
    const pokemon = this.userPokedex[id];
    if (pokemon) {
      pokemon[value] = (forced === undefined) ? !pokemon[value] : forced;
    }
    if (pokemon[value]) {
      this.cascadeUpdates(id, value);
    }
    clearTimeout(this.updateTimeout);

    this.updateTimeout = setTimeout( () => {
      this._saving = true;
      this.pokemonDataService.latestUserPokedex = Object.assign({},this.userPokedex);
    }, 10000);
  }

  private cascadeUpdates(id:string, value: StdPokemonForm): void {
      switch (value) {
        case 'perfect':
          this.updateEntry(id, STANDARD_POKEMON_FORMS_EMUN.THREESTAR, true);
        case 'threestar':
        case 'shiny':
        case 'lucky':
        case 'shadow':
        case 'purified':
          this.updateEntry(id, STANDARD_POKEMON_FORMS_EMUN.NORMAL, true);
      }
  }

  private resetPage(): void {
    if(!this.pokedex) {
      return;
    }
    this.page = 0;
    const start = this.page * this.perPage;
    const end = start + this.perPage;

    // filtered list used for displace
    this.filtedPokedex = this.pokedex;

    this.filtedPokedex = this.filtedPokedex
      .filter((pokemon: Pokemon) => {
        if (!this._regionFilter) {
          return true;
        }
        return this._regionFilter === parseInt(pokemon.generation_number,10);
      })
      .filter((pokemon: Pokemon) => {
        if (!this._searchFilter) {
          return true;
        }
        return pokemon.name.toLowerCase().includes(this._searchFilter);
      });
    this.tableData = this.filtedPokedex.slice(start,end);
    if(this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = 0;
    }
  }

  private sortByIdentifier(value: string): void {
    this.pokedex.sort((a:Pokemon, b: Pokemon) => {
      let output = 0;
      switch(true) {
        case a[value] > b[value]:
          output = 1;
          break;
        case a[value] < b[value]:
          output = -1;
          break;
        default:
          output = a.id > b.id ? 1 : -1;
          break;
      }
      return output * (this.orderAsending ? 1 : -1);
    })
  }

  private sortByChecklist(value: string): void {
    this.pokedex.sort((a:Pokemon, b: Pokemon) => {
      let output = 0;
      const usera = this.userPokedex[a.id][value] ? 1 : -1;
      const userb = this.userPokedex[b.id][value] ? 1 : -1;
      if (!usera || !userb) {
        return;
      }

      switch(true) {
        case usera > userb:
          output = 1 * (this.orderAsending ? 1 : -1);
          break;
        case usera < userb:
          output = -1 * (this.orderAsending ? 1 : -1);
          break;
        default:
          output = a.id > b.id ? 1 : -1;
          break;
      }

      return output;
    })
  }
}
