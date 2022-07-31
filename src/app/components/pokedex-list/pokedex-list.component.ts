import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Pokemon, StdPokemonForm, UserPokedex } from 'src/app/services/pokedex-data/pokedex-data.types';

interface Update {
  id: string,
  value: StdPokemonForm
}

@Component({
  selector: 'app-pokedex-list',
  templateUrl: './pokedex-list.component.html',
  styleUrls: ['./pokedex-list.component.scss']
})
export class PokedexListComponent {
  @Input() pokedex: Pokemon[];
  @Input() loading: boolean = true;
  @Input() userPokedex: UserPokedex;
  @Input() size: number;

  @Output() update: EventEmitter<Update> = new EventEmitter<Update>();

  public onClick(id, value): void {
    this.update.emit({id,value});
  }
}
