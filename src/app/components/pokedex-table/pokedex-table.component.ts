
import { Component, Input, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { PokemonDataService } from 'src/app/services/pokemon-data/pokemon-data.service';
import { Pokemon, UserPokedex } from 'src/app/services/pokemon-data/pokemon-data.types';
import { take } from 'rxjs/operators';
import { PokedexGenerateDataService } from 'src/app/services/pokedex-generate-data/pokedex-generate-data.service';

@Component({
  selector: 'app-pokedex-table',
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss']
})
export class PokedexTableComponent implements OnInit {
  @Input() set region(region: number) {
    this._regionFilter = region;
    this.resetPage();
  };
  @Input() set search(search: string) {
    this._searchFilter = search;
    this.resetPage();
  };

  public tableData;
  public userPokedex: UserPokedex;
  public loading: boolean = true;
  public checklist: string[] = ['normal', 'shiny', 'lucky', 'perfect', 'threestar', 'shadow', 'purified'];
  public displayedColumns: string[] = ['id', 'image', 'name', ...this.checklist];

  private pokedex: Pokemon[];
  private filtedPokedex: Pokemon[];
  private page: number = 0;
  private perPage: number = 50;
  private updateTimeout: ReturnType<typeof setTimeout>;
  private orderAsending: boolean = false;
  private sortedColumn: string = 'id';
  private _searchFilter: string;
  private _regionFilter: number;

  constructor(private pokemonDataService: PokemonDataService, private pokedexGenerateDataService: PokedexGenerateDataService) {}

  ngOnInit(): void {
    const api: PokemonDataService = this.pokemonDataService;
    combineLatest([api.pokedex, api.userPokedex, api.emptyUser]).pipe(take(1)).subscribe(([pokedex, userPokedex, emptyUserPokedec]) => {
      // merge empty dex into current user, incase anything new has been added
      this.userPokedex = {...emptyUserPokedec, ...userPokedex};

      // cache total pokemon list
      this.pokedex = Object.values(pokedex);

      this.resetPage();
      this.sortColumn(this.sortedColumn)
      this.loading = false;
    });
  }

  public sortColumn(value: string): void {
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

  public updateEntry(id:string, value: string) {
    const pokemon = this.userPokedex[id];
    if (pokemon) {
      pokemon[value] = !pokemon[value];
    }
    clearTimeout(this.updateTimeout);

    this.updateTimeout = setTimeout( () => {
      this.pokemonDataService.latestUserPokedex = Object.assign({},this.userPokedex);
    }, 5000);
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
  }

  private sortByIdentifier(value: string): void {
    this.filtedPokedex.sort((a:Pokemon, b: Pokemon) => {
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
    this.filtedPokedex.sort((a:Pokemon, b: Pokemon) => {
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
