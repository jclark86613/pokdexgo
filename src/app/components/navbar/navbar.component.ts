import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PokedexDataService } from 'src/app/services/pokedex-data/pokedex-data.service';
import { PokedexCounts, STANDARD_POKEMON_FORMS_EMUN, UserPokedex } from 'src/app/services/pokedex-data/pokedex-data.types';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public authService: AuthService, public pokedexDataService: PokedexDataService) {
    setTimeout( () => {
      this.pokedexDataService.userPokedex.subscribe(userPokedex => {
        this.userCounts = {...this.userCountsEmpty};
        for (let pokemon in userPokedex) {
          for (let count in this.userCounts) {
            this.userCounts[count] += userPokedex[pokemon][count] ? 1 : 0;
          }
        }
      })
    }, 1000);
  }

  public PokedexCounts$: Observable<PokedexCounts> = this.pokedexDataService.pokedexCounts;
  public userCountsEmpty = {
    [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.SHINY]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: 0
  };
  public userCounts = {
    [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.SHINY]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: 0
  };

  public openProfile() {
    console.log('test');
  }

  public generateUserCount(stat:number): number {
    let total = 0;
    
    return total;
  }
}
