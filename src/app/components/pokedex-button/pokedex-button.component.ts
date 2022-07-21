import { Component, EventEmitter, Input, Output } from '@angular/core';

export type ButtonName = 'normal' | 'shiny' | 'perfect' | 'threestar' | 'shadow' | 'purifed';

@Component({
  selector: 'app-pokedex-button',
  templateUrl: './pokedex-button.component.html',
  styleUrls: ['./pokedex-button.component.scss']
})
export class PokedexButtonComponent {

  @Input() name: ButtonName;
  @Input() disabled: boolean = false;
  @Input() value: boolean = false;

  @Output() onClick = new EventEmitter<boolean>();

  public toggle(): void {
    this.onClick.emit(!this.value);
  }

}
