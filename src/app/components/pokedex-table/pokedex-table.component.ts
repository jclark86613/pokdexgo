import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { combineLatest } from 'rxjs';
import { PokemonDataService } from 'src/app/services/pokemon-data/pokemon-data.service';
import { Pokemon, STANDARD_POKEMON_FORMS_ARRAY, STANDARD_POKEMON_FORMS_EMUN, StdPokemonForm, UserPokedex } from 'src/app/services/pokemon-data/pokemon-data.types';
import { PokedexTableService } from './pokedex-table.service';
import { Filter, Filters } from './pokedex-table.types';

@Component({
  selector: 'app-pokedex-table',
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss']
})
export class PokedexTableComponent implements OnInit {
  @ViewChild('scrollContainer') scrollContainer:ElementRef;

  @Input() set filters(filters: Filter[]) {
    this._filters = filters;
    this.resetPage();
  };

  public checklist: StdPokemonForm[] = [...STANDARD_POKEMON_FORMS_ARRAY]
  public displayedColumns: string[] = ['id', 'image', 'name', ...STANDARD_POKEMON_FORMS_ARRAY];
  public loading: boolean = true;
  public tableData: Pokemon[];
  public userPokedex: UserPokedex;
  public orderAsending: boolean = true;
  public sortedColumn: string = 'id';
  
  private _filters: Filters;
  private _filtedPokedex: Pokemon[];
  private _init: boolean = true;
  private _page: number = 0;
  private _perPage: number = 50;
  private _pokedex: Pokemon[];
  private _saving: boolean = true;
  private _updateTimeout: ReturnType<typeof setTimeout>;

  constructor(private pokemonDataService: PokemonDataService, private pokedexTableService: PokedexTableService) {}

  ngOnInit(): void {
    const api: PokemonDataService = this.pokemonDataService;
    combineLatest([api.pokedex, api.userPokedex]).subscribe(([pokedex, userPokedex]: [Pokemon[], UserPokedex]) => {
      this.userPokedex = userPokedex;
      this._pokedex = pokedex;
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
      this._page++;
      const start = this._page * this._perPage;
      const end = start + this._perPage;
      this.tableData = this.tableData.concat(this._filtedPokedex.slice(start, end));
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
    clearTimeout(this._updateTimeout);

    this._updateTimeout = setTimeout( () => {
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
    if(!this._pokedex) {
      return;
    }
    this._page = 0;
    const start = this._page * this._perPage;
    const end = start + this._perPage;

    // filtered list used for displace
    this._filtedPokedex = this.pokedexTableService.filter(this._pokedex, this._filters);
    this.tableData = this._filtedPokedex.slice(start,end);
    if(this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTop = 0;
    }
  }

  private sortByIdentifier(value: string): void {
    this._pokedex.sort((a:Pokemon, b: Pokemon) => {
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
    this._pokedex.sort((a:Pokemon, b: Pokemon) => {
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
