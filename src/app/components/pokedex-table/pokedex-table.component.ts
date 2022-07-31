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
  
}
