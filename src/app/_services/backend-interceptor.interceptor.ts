import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class BackendInterceptorInterceptor implements HttpInterceptor {

  constructor(private http: HttpClient) {}

  authentication(request: HttpRequest<any>){
    const { username, password} = request.body;
    return this.http.post<any>(`${environment.config.api}/users/signin`, {
      "username": username,
      "password": password
    }, {observe: 'response'})
    .subscribe(response => {
      console.log("Status code: "+ response.status)
    });
  }

  // Interceptor used for testing purposes.
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    const { url, method } = request;

    console.log("Initializing interceptor.")

    switch(true){
      // case url.endsWith('users/signin') && method === "POST":
      //   console.log("Authenticating...");
      //   this.authentication(request);
      // case url.endsWith('users/') && method === "POST":
      //   break;
      default:
        console.log("Standard interceptor pass.")
        return next.handle(request);
    }
  }
}
