import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private signedUserSubject: BehaviorSubject<User>;
  public signedUser$: Observable<User>;
  private userJWTSubject: BehaviorSubject<User>;
  public userJWT$: Observable<User>;
  public keepMeLoggedIn = false;
  private toggleOptions = false;
  public apiKey: string;

  constructor(private http: HttpClient) {
    if(localStorage.getItem('on') == "1"){
    this.keepMeLoggedIn = true;}
    this.toggleStorage();
  }

  public get signedUserValue(): User {
    return this.signedUserSubject.value;
  }

  public get userJWTValue(): User {
    return this.userJWTSubject.value;
  }

  //Optimize a bit 
  toggleStorage(){
    if(this.keepMeLoggedIn){
      console.log("Storage set for Local login!");
      localStorage.setItem("on", "1");
      localStorage.setItem("off", "0");
      this.signedUserSubject = new BehaviorSubject<User>(JSON
        .parse(localStorage.getItem('signedUser')));
      this.userJWTSubject = new BehaviorSubject<User>(JSON
        .parse(localStorage.getItem('userJWT')));

      sessionStorage.removeItem('signedUser');
      sessionStorage.removeItem('userJWT');
      sessionStorage.clear();
    } else {
      console.log("Storage set for Session login!");
      localStorage.setItem("off", "1");
      localStorage.setItem("on", "0");
      this.signedUserSubject = new BehaviorSubject<User>(JSON
        .parse(sessionStorage.getItem('signedUser')));
      this.userJWTSubject = new BehaviorSubject<User>(JSON
        .parse(sessionStorage.getItem('userJWT')));

      localStorage.removeItem('signedUser');
      localStorage.removeItem('userJWT');
      localStorage.clear();
    }
    this.signedUser$ = this.signedUserSubject.asObservable();
    this.userJWT$ = this.userJWTSubject.asObservable();
  }

  register(firstName: string, 
    lastName: string, 
    username: string, 
    password: string){
      console.log("Registering user: "+username);
      return this.http.post<User>(`${environment.config.api}/users`, {
        "firstname": firstName,
        "lastname": lastName,
        "username": username,
        "password": password
      }).subscribe(/*data => {console.log("User "+data+" registered!")}*/);
    }

    login(username: string, password: string){
      //console.log("Signing in user: "+username);
      return this.http.post<any>(`${environment.config.api}/users/signin/`, {
        "username": username,
        "password": password
      })
      .pipe(map((user) => {
        this.apiKey = user.jwt;
        if(this.keepMeLoggedIn == true){
          localStorage.setItem('signedUser', JSON.stringify(user.user));
          localStorage.setItem('userJWT', JSON.stringify(user.jwt));  
        } else {
          sessionStorage.setItem('signedUser', JSON.stringify(user.user));
          sessionStorage.setItem('userJWT', JSON.stringify(user.jwt));
        }
        this.toggleStorage();
        console.log("Logging in user: "+user.user.username);
        this.signedUserSubject.next(user.user);
        this.userJWTSubject.next(user.jwt);
        console.log(`User ${user.user.username} successfully signed in!`);
      }));
    }

    logout(){
      localStorage.removeItem('signedUser');
      localStorage.removeItem('userJWT');
      localStorage.clear();
      sessionStorage.removeItem('signedUser');
      sessionStorage.removeItem('userJWT');
      sessionStorage.clear();
      this.signedUserSubject.next(null);
    }

    showOptions(){
      this.toggleOptions = !this.toggleOptions;
      console.log("User options tog, "+this.toggleOptions);
    }


    // ADD THE HEADERS RIGHT, GET THE DATA, GET ROLLING
    userInfo(){
      console.log("Attempting to get user info.")
      return this.http.get<any>(`${environment.config.api}/users/details`);
    }

    userEdit(user: any){
      console.log("@userEdit - username: "+user.username);
      console.log("Attempting to get user info.")
      return this.http.put<User>(`${environment.config.api}/users/`, {
        "firstname": user.firstname,
        "lastname": user.lastname,
        "username": user.username,
        "password": user.password
      })
      .subscribe(data => console.log(data));
    }

    addMovie(title: string, description: string, date: string){
      console.log(`POSTing ${title}/${description}/${date}`)
      return this.http.post<any>(`${environment.config.api}/movies`, {
        "title": title,
        "description": description,
        "dateReleased": new DatePipe('en').transform(date, 'yyyy-MM-ddTHH:mm:ssZ')
      });
    }

    getMovies(){
      console.log("Attempting to get all movies.");
      return this.http.get<any>(`${environment.config.api}/movies`);
    }

    addFavoriteMovie(titleId: string){
      console.log("Attempting to POST favorite movie.");
      return this.http.post<any>(`${environment.config.api}/users/favorites`, {
        "movieId": titleId
      })
      .subscribe();
    }

    removeFavoriteMovie(titleId: string){
      console.log("Attempting to DELETE favorite movie.");
      return this.http.delete<any>(`${environment.config.api}/users/favorites/${titleId}`);
    }

    getFavoriteMovies(){
      console.log("Attempting to get all favorites.");
      return this.http.get<any>(`${environment.config.api}/users/favorites`);
    }

    deleteMovie(id: string){
      console.log("Attempting to DELETE movie.");
      return this.http.delete<any>(`${environment.config.api}/movies/${id}`);
    }
}