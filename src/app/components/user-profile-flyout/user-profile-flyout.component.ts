import { Component, OnInit } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PokedexDataService } from 'src/app/services/pokedex-data/pokedex-data.service';
import { PokedexCounts, STANDARD_POKEMON_FORMS_EMUN } from 'src/app/services/pokedex-data/pokedex-data.types';

@Component({
  selector: 'app-user-profile-flyout',
  templateUrl: './user-profile-flyout.component.html',
  styleUrls: ['./user-profile-flyout.component.scss']
})
export class UserProfileFlyoutComponent implements OnInit {
  public user: User; 
  public icon: string = ''; 
  public PokedexCounts$: Observable<PokedexCounts> = this.pokedexDataService.pokedexCounts;
  private _userCountsEmpty = {
    [STANDARD_POKEMON_FORMS_EMUN.NORMAL]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.LUCKY]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.PERFECT]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.PURIFIED]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.SHADOW]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.SHINY]: 0,
    [STANDARD_POKEMON_FORMS_EMUN.THREESTAR]: 0
  };
  public userCounts = {...this._userCountsEmpty};

  constructor(private pokedexDataService: PokedexDataService, public authService: AuthService) {
    this.authService.user.subscribe((user:User) => {
      this.user = user;
      this.icon = user.photoURL;
    })
    this.pokedexDataService.userPokedex.subscribe(userPokedex => {
      for (let pokemon in userPokedex) {
        for (let count in this.userCounts) {
          this.userCounts[count] += userPokedex[pokemon][count] ? 1 : 0;
        }
      }
    })
  }

  ngOnInit(): void {
  }


}
