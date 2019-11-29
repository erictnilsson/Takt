import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { ActivatedRoute, Params } from '@angular/router';
import { ErrorService } from 'src/app/services/error/error.service';

@Component({
  selector: 'app-authenticate',
  templateUrl: './authenticate.component.html',
  styleUrls: ['./authenticate.component.css']
})
export class AuthenticateComponent implements OnInit {

  constructor(private readonly authService: AuthenticationService, private readonly errorService: ErrorService,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const param: Params = this.route.snapshot.queryParams;
    if (param && param.code) {
      this.authService.getAuthenticationCode(param.code);
    } else {
      this.errorService.logError('No parameter found when trying to fetch the authentication code from Spotify');
    }
  }

}
