import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../_models/user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private signedUserSubject: BehaviorSubject<User>;
  public signedUser$: Observable<User>;
  public keepMeLoggedIn = false;

  constructor(private http: HttpClient) {
    if(localStorage.getItem('on') == "1"){
    this.keepMeLoggedIn = true;}
    this.toggleStorage();
  }

  public get signedUserValue(): User {
    return this.signedUserSubject.value;
  }

  public set signedUserValue(user: User){
    this.signedUserValue = user;
  } 

  //Optimize a bit 
  toggleStorage(){
    if(this.keepMeLoggedIn){
      console.log("Local login!");
      localStorage.setItem("on", "1");
      localStorage.setItem("off", "0");
      this.signedUserSubject = new BehaviorSubject<User>(JSON
        .parse(localStorage.getItem('signedUser')));

      sessionStorage.removeItem('signedUser');
      sessionStorage.clear();
    } else {
      console.log("Session login!");
      localStorage.setItem("off", "1");
      localStorage.setItem("on", "0");
      this.signedUserSubject = new BehaviorSubject<User>(JSON
        .parse(sessionStorage.getItem('signedUser')));

      localStorage.removeItem('signedUser');
      localStorage.clear();
    }
    this.signedUser$ = this.signedUserSubject.asObservable();
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
        if(this.keepMeLoggedIn == true){
          localStorage.setItem('signedUser', JSON.stringify(user.user));  
        } else {
          sessionStorage.setItem('signedUser', JSON.stringify(user.user));
        }
        
        console.log("Logging in user: "+user.user.username);
        this.signedUserSubject.next(user.user);
        this.toggleStorage();
        console.log(`User ${user.user.username} successfully signed in!`);
      }));
    }

    logout(){
      localStorage.removeItem('signedUser');
      localStorage.clear();
      sessionStorage.removeItem('signedUser');
      sessionStorage.clear();
      this.signedUserSubject.next(null);
    }

    userEdit(){
      //implement EDIT stuff
    }
}
