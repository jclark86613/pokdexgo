
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { PokemonDataService } from 'src/app/services/pokemon-data/pokemon-data.service';
import { Pokemon, UserPokedex } from 'src/app/services/pokemon-data/pokemon-data.types';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-pokedex-table',
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss']
})
export class PokedexTableComponent implements OnInit {
  public tableData;
  public userPokedex: UserPokedex;

  private pokedex: Pokemon[];
  private page: number = 0;
  private perPage: number = 50;

  private updateTimeout: ReturnType<typeof setTimeout>;
  private orderAsending: boolean = false;
  private sortedColumn: string = 'id';

  private emptyPokemon = {
    normal: false,
    shiny: false,
    perfect: false,
    lucky: false,
    threestar: false,
    shadow: false,
    purified: false,
  }
  public loading: boolean = true;
  public displayedColumns: string[] = ['id', 'image', 'name', 'normal', 'shiny', 'lucky', 'perfect', 'threestar', 'shadow', 'purified'];
  public checklist: string[] = ['normal', 'shiny', 'lucky', 'perfect', 'threestar', 'shadow', 'purified'];

  constructor(private pokemonDataService: PokemonDataService) {}

  ngOnInit(): void {
    const api = this.pokemonDataService;
    combineLatest([api.pokedex, api.userPokedex]).pipe(take(1)).subscribe(([pokedex, userPokedex]) => {
      // new user, create object
      const emptyPokedex = JSON.parse(JSON.stringify(Array(Object.values(pokedex).length + 1).fill(this.emptyPokemon)));
      if (!userPokedex) {
        this.pokemonDataService.createNewUserPokedex({...emptyPokedex});
        return;
      }
      this.pokedex = Object.values(pokedex);
      this.userPokedex = {...emptyPokedex, ...userPokedex};
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

  public sortByChecklist(value: string): void {
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

  private resetPage(): void {
    this.page = 0;
    const start = this.page * this.perPage;
    const end = start + this.perPage;
    this.tableData = this.pokedex.slice(start,end);
  }

  public nextPage(): void {
    if (!this.tableData) {
      this.resetPage();
    } else {
      this.page++;
      const start = this.page * this.perPage;
      const end = start + this.perPage;
      this.tableData = this.tableData.concat(this.pokedex.slice(start, end));
    }
  }

  public updateEntry(id:string, value: string) {
    const pokemon = this.userPokedex[id];
    if (pokemon) {
      pokemon[value] = !pokemon[value];
    }
    clearTimeout(this.updateTimeout);

    this.updateTimeout = setTimeout( () => {
      this.pokemonDataService.setUserPokedex(Object.assign({},this.userPokedex));
    }, 5000);
  }

}
