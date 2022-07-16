import { Component, OnInit } from '@angular/core';
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons';
// import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-sso-login',
  templateUrl: './sso-login.component.html',
  styleUrls: ['./sso-login.component.scss']
})
export class SsoLoginComponent implements OnInit {

  public buttonGroup = [{
    name: 'Google',
    icon: faGoogle,
    // click: this.authService.loginWithGoogle()
  },
  {
    name: 'Facebook',
    icon: faFacebook,
    // click: this.authService.loginWithFacebook()
  }]
  // constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

}
