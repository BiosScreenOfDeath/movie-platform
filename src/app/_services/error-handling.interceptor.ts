import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor() {}

  // Intercepts a request if it goes wrong and logs the endpoint where things blew up.
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        let message = "";
        if(error.error instanceof ErrorEvent){
          console.log("Client-side error.");
          message = `Error message ${error.error.message}`;
        } else {
          console.error("Server-side error.");
          message = `Error status ${error.status}: ${error.message}`;
        }
        return throwError(message);
      })
    );
  }
}
