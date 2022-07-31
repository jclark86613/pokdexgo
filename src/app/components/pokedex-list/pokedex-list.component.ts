import { Component, Input } from '@angular/core';
import { Pokemon, UserPokedex } from 'src/app/services/pokedex-data/pokedex-data.types';

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
}
