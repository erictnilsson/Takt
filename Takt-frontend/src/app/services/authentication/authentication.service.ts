import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RouterLinkWithHref, Router } from '@angular/router';
import { Url } from 'url';
import { JwtResponse } from 'src/app/models/responses/jwtResponse';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly authUrl: string;

  constructor(private errorService: ErrorService, private http: HttpClient, private router: Router) {
    this.authUrl = '/api/auth/';
  }

  public getAuthenticationUrl(): Observable<Url> {
    return this.http.get<Url>(this.authUrl + 'get_auth_uri');
  }

  public getAuthenticationCode(code: string): void {
    this.http.get<JwtResponse>(this.authUrl + 'authenticate?code=' + code)
      .subscribe(response => this.setToken(response.token),
        (error) => this.errorService.handleError(error),
        () => {
          window.opener.location.href = '/dashboard';
          window.close();
        });
  }

  public isLoggedIn(): boolean {
    const userPayload = this.getUserPayload();
    return (userPayload) ? userPayload.exp > Date.now() / 1000 : false;
  }

  public logout(): void {
    this.http.get<JwtResponse>(this.authUrl + 'logout').subscribe(msg => console.log(msg));
    this.deleteToken();
    this.router.navigate(['']);
    
  }

  public getToken(): string {
    return localStorage.getItem('token');
  }

  public hasToken(): boolean {
    return this.getToken() != null ? true : false;
  }

  private setToken(token: string): void {
    localStorage.setItem('token', token);
  }


  private deleteToken(): void {
    localStorage.removeItem('token');
  }

  public getUserPayload(): any {
    const token = this.getToken();
    if (token) {
      const userPayload = atob(token.split('.')[1]);
      return JSON.parse(userPayload);
    } else {
      return null;
    }
  }
}
