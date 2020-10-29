import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private authenticate: AuthenticationService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    //console.log("HEADER: "+this.authenticate.apiKey);
    if(localStorage.getItem("on") == "1"){
      this.authenticate.keepMeLoggedIn = true;
      console.log("Locally stored values ON@JWT.");
   } else {
      this.authenticate.keepMeLoggedIn = false;
      console.log("Session stored values ON@JWT.");
   }
    this.authenticate.toggleStorage();

    console.log("HEADER: "+this.authenticate.userJWTValue);

    request = request.clone({
      setHeaders: {
        //token: `${this.authenticate.apiKey}`,
        token: `${this.authenticate.userJWTValue}`,
      }
    });

    return next.handle(request);
  }
}
