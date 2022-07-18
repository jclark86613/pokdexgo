import { CdkTableDataSourceInput } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs';
import { PokemonDataService } from 'src/app/services/pokemon-data/pokemon-data.service';
import { Pokedex, Pokemon, UserPokedex } from 'src/app/services/pokemon-data/pokemon-data.types';

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
  public displayedColumns: string[] = ['id', 'image', 'name', 'standard', 'shiny', 'lucky', 'perfect', 'threestar', 'shadow', 'purified'];

  constructor(private pokemonDataService: PokemonDataService) {}

  ngOnInit(): void {
    const api = this.pokemonDataService;
    combineLatest([api.pokedex, api.userPokedex]).subscribe(([pokedex, userPokedex]) => {
      // new user, create object
      if (!userPokedex) {
        const emptyPokedex = JSON.parse(JSON.stringify(Array(Object.values(pokedex).length).fill(this.emptyPokemon)));
        this.pokemonDataService.createNewUserPokedex({...emptyPokedex});
        return;
      }

      this.pokedex = Object.values(pokedex);
      this.userPokedex = userPokedex;
      this.resetPage();
      this.loading = false;
    });
  }

  private resetPage(): void {
    if (!this.tableData) {
      this.page = 0;
      const start = this.page * this.perPage;
      const end = start + this.perPage;
      this.tableData = this.pokedex.slice(start,end);
    }
  }

  private nextPage(): void {
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
