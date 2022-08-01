import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Pokemon, STANDARD_POKEMON_FORMS_ARRAY, STANDARD_POKEMON_FORMS_EMUN, StdPokemonForm, UserPokedex } from 'src/app/services/pokedex-data/pokedex-data.types';

interface Update {
  id: string,
  value: StdPokemonForm
}

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
  @Output() update: EventEmitter<Update> = new EventEmitter<Update>();

  public checklist: StdPokemonForm[] = [...STANDARD_POKEMON_FORMS_ARRAY]
  public displayedColumns: string[] = ['id', ...STANDARD_POKEMON_FORMS_ARRAY];
  public orderAsending: boolean = true;
  public sortedColumn: string = 'id';
  
  public onClick(id, value): void {
    this.update.emit({id, value});
  }
}
