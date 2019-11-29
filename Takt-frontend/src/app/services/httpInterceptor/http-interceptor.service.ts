import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication.service';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { ErrorService } from '../error/error.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthenticationService, private errorService: ErrorService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    if (this.authService.hasToken()) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + this.authService.getToken()
        }
      });
    } else {
      this.errorService.logError('No available token found');
    }
    return next.handle(request);
  }
}
