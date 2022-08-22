import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { PokedexDataService } from 'src/app/services/pokedex-data/pokedex-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(public authService: AuthService, public pokedexDataService: PokedexDataService) {}
}
