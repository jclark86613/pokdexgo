import { Component, Input } from '@angular/core';

export type Size = 'small' | 'medium' | 'large';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.scss']
})
export class PokemonComponent {
  @Input() id: string;
  @Input() size: Size = 'medium';
  @Input() shiny: boolean = false;
  @Input() notCaught: boolean = false;
}
