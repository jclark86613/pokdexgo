import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PokedexDataService } from 'src/app/services/pokedex-data/pokedex-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  public icon: string;
  constructor(public authService: AuthService, public pokedexDataService: PokedexDataService) {
    this.authService.user.pipe(filter(user => !!user)).subscribe((user: User) => {
      this.icon = user.photoURL;
    })
  }
}
