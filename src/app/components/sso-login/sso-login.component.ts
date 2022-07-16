import { Component, OnInit } from '@angular/core';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sso-login',
  templateUrl: './sso-login.component.html',
  styleUrls: ['./sso-login.component.scss']
})
export class SsoLoginComponent implements OnInit {

  public buttonGroup = [{
    name: 'Google',
    icon: faGoogle,
    action: () => {
      this.authService.login('google');
    }
  }]
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
