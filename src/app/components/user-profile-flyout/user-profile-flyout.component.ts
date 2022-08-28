import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PokedexDataService } from 'src/app/services/pokedex-data/pokedex-data.service';
import { EMPTY_POKEDEX_COUNT, PokedexCounts, STANDARD_POKEMON_FORMS_EMUN } from 'src/app/services/pokedex-data/pokedex-data.types';

@Component({
  selector: 'app-user-profile-flyout',
  templateUrl: './user-profile-flyout.component.html',
  styleUrls: ['./user-profile-flyout.component.scss']
})
export class UserProfileFlyoutComponent {
  public user: User; 
  public icon: string = ''; 
  public PokedexCounts$: Observable<PokedexCounts> = this.pokedexDataService.pokedexCounts;
  public userCounts = JSON.parse(JSON.stringify(EMPTY_POKEDEX_COUNT));
  public readonly pokedexFormOrder = [
    STANDARD_POKEMON_FORMS_EMUN.PURIFIED,
    STANDARD_POKEMON_FORMS_EMUN.SHADOW,
    STANDARD_POKEMON_FORMS_EMUN.PERFECT,
    STANDARD_POKEMON_FORMS_EMUN.THREESTAR,
    STANDARD_POKEMON_FORMS_EMUN.SHINY,
    STANDARD_POKEMON_FORMS_EMUN.LUCKY,
    STANDARD_POKEMON_FORMS_EMUN.NORMAL
  ];

  constructor(private pokedexDataService: PokedexDataService, public authService: AuthService) {
    this.authService.user.subscribe((user:User) => {
      this.user = user;
      this.icon = user.photoURL;
    })
    this.pokedexDataService.userPokedex.subscribe(userPokedex => {
      this.userCounts = JSON.parse(JSON.stringify(EMPTY_POKEDEX_COUNT));
      for (let pokemon in userPokedex) {
        for (let count in this.userCounts.all) {
          this.userCounts.all[count] += userPokedex[pokemon][count] ? 1 : 0;
        }
      }
    })
  }
}
