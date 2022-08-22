import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PokedexDataService } from 'src/app/services/pokedex-data/pokedex-data.service';
import { EMPTY_POKEDEX_COUNT, PokedexCounts } from 'src/app/services/pokedex-data/pokedex-data.types';

@Component({
  selector: 'app-user-profile-flyout',
  templateUrl: './user-profile-flyout.component.html',
  styleUrls: ['./user-profile-flyout.component.scss']
})
export class UserProfileFlyoutComponent {
  public user: User; 
  public icon: string = ''; 
  public PokedexCounts$: Observable<PokedexCounts> = this.pokedexDataService.pokedexCounts;
  public userCounts = {...EMPTY_POKEDEX_COUNT};

  constructor(private pokedexDataService: PokedexDataService, public authService: AuthService) {
    this.authService.user.subscribe((user:User) => {
      this.user = user;
      this.icon = user.photoURL;
    })
    this.pokedexDataService.userPokedex.subscribe(userPokedex => {
      for (let pokemon in userPokedex) {
        for (let count in this.userCounts.all) {
          this.userCounts.all[count] += userPokedex[pokemon][count] ? 1 : 0;
        }
      }
    })
  }
}
