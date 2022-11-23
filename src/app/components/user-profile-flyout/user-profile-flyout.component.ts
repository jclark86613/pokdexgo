import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { combineLatest, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PokedexDataService } from 'src/app/services/pokedex-data/pokedex-data.service';
import { EMPTY_POKEDEX_COUNT, PokedexCounts, Pokemon, Regions, REGIONS_ARRAY, REGIONS_ENUM, STANDARD_POKEMON_FORMS_ARRAY, StdPokemonForm, StdPokemonForms, UserPokedex } from 'src/app/services/pokedex-data/pokedex-data.types';

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
  public selectedForm: StdPokemonForm;
  public readonly pokedexFormOrder: StdPokemonForms = JSON.parse(JSON.stringify(STANDARD_POKEMON_FORMS_ARRAY));
  public readonly pokedexRegionOrder: Regions = JSON.parse(JSON.stringify(REGIONS_ARRAY));

  constructor(private pokedexDataService: PokedexDataService, public authService: AuthService) {
    this.authService.user.subscribe((user:User) => {
      this.user = user;
      this.icon = user.photoURL;
    });
    combineLatest([this.pokedexDataService.userPokedex, this.pokedexDataService.pokedex]).subscribe(
      ([userPokedex, pokedex]: [UserPokedex, Pokemon[]]) => {
        this.userCounts = JSON.parse(JSON.stringify(EMPTY_POKEDEX_COUNT));
        
        let first = true;
        for (let pokemon of pokedex) {
          if(first) {
            first = false;
            continue;
          }
          const region = REGIONS_ARRAY[parseInt(pokemon.generation_number,10) - 1];
          for (let count in this.userCounts.all) {
            this.userCounts.all[count] += userPokedex[pokemon.id][count] ? 1 : 0;
            this.userCounts[region][count] += userPokedex[pokemon.id][count] ? 1 : 0;
          }
        }
    })
  }
}
