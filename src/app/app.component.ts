import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'angular-academy-movie-platform';
  signedUser: User;

  // Gets user data from the proper storage.
  constructor(
    private router: Router,
    private authenticate: AuthenticationService){

    if(localStorage.getItem("on") == "1"){
      this.authenticate.keepMeLoggedIn = true;
      console.log("Locally stored values ON@app.");
    } else {
      this.authenticate.keepMeLoggedIn = false;
      console.log("Session stored values ON@app.");
    }
    this.authenticate.toggleStorage();

    console.log("Locally stored user: "+localStorage.getItem('signedUser'));
    console.log("ON: "+localStorage.getItem('on'));
    console.log("Session stored user: "+sessionStorage.getItem('signedUser'));
    console.log("OFF: "+localStorage.getItem('off'));

    this.authenticate.signedUser$.subscribe(user => {
      if(user) console.log("APP USER: "+user.username);
      this.signedUser = user;
    });
  }

  // Removes all user logged data.
  logout(){
    this.authenticate.logout();
    this.router.navigate(['/login']);
    this.signedUser = null;
  }

  // Redirects user at home.
  goHome(){
    this.router.navigate(['/home']);
  }

  // Redirects user to the edit page.
  userOptions(){
    console.log("Accessing Edit page.");
    this.router.navigate(['/edit']);
  }

  // Redirects user to all movies page.
  showMovies(){
    console.log("Entering All Movies.");
    this.router.navigate(['/all-movies']);
  }

  // Redirects user to favorites.
  showFavorites(){
    console.log("Entering Favorite Movies.");
    this.router.navigate(['/favorite-movies']);
  }
}
