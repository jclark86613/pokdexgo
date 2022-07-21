import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonName } from './pokedex-button.interfaces';

@Component({
  selector: 'app-pokedex-button',
  templateUrl: './pokedex-button.component.html',
  styleUrls: ['./pokedex-button.component.scss']
})
export class PokedexButtonComponent {

  @Input() name: string;
  @Input() disabled: boolean = false;
  @Input() value: boolean = false;

  @Output() onClick = new EventEmitter<boolean>();

  public toggle(): void {
    this.onClick.emit(!this.value);
  }

}
