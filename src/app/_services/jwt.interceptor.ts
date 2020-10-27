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
    
    console.log("HEADER: "+this.authenticate.apiKey);

    request = request.clone({
      setHeaders: {
        token: `${this.authenticate.apiKey}`,
      }
    });

    return next.handle(request);
  }
}
