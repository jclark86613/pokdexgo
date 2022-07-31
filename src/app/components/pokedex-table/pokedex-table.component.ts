import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Pokemon, STANDARD_POKEMON_FORMS_ARRAY, STANDARD_POKEMON_FORMS_EMUN, StdPokemonForm, UserPokedex } from 'src/app/services/pokedex-data/pokedex-data.types';
import { PokedexTableService } from './pokedex-table.service';

@Component({
  selector: 'app-pokedex-table',
  templateUrl: './pokedex-table.component.html',
  styleUrls: ['./pokedex-table.component.scss']
})
export class PokedexTableComponent {
  @ViewChild('scrollContainer') scrollContainer:ElementRef;

  @Input() pokedex: Pokemon[];
  @Input() loading: boolean = true;
  @Input() userPokedex: UserPokedex;

  public checklist: StdPokemonForm[] = [...STANDARD_POKEMON_FORMS_ARRAY]
  public displayedColumns: string[] = ['id', ...STANDARD_POKEMON_FORMS_ARRAY];
  public orderAsending: boolean = true;
  public sortedColumn: string = 'id';
  
  private _saving: boolean = true;
  private _updateTimeout: ReturnType<typeof setTimeout>;

  constructor(private pokedexTableService: PokedexTableService) {}


  public updateEntry(id:string, value: StdPokemonForm, forced: boolean) {
    if (this._saving) { return; }
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
      this.pokedexTableService.latestUserPokedex = Object.assign({},this.userPokedex);
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

}
