import { Component } from '@angular/core';
import { PokedexGenerateDataService } from './services/pokedex-generate-data/pokedex-generate-data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private pokedexGenerateDataService: PokedexGenerateDataService) {
    
  }
}
