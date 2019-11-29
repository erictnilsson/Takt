import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { UserService } from 'src/app/services/user/user.service';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private readonly authService: AuthenticationService, private readonly errorService: ErrorService) { }

  ngOnInit() {
    this.authService.logout();
  }

  login(): void {
    this.authService.getAuthenticationUrl().subscribe(url => window.open(url.toString(),
      '_blank',
      'location=yes,height=570,width=520,scrollbars=yes,status=yes'),
      error => this.errorService.logError(error),
    );
  }
}
