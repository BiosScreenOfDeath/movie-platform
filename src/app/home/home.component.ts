import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeUser: User;

  // Sets the user to the one logged in
  // to display the greeting message.
  constructor(private router: Router,
    private authenticate: AuthenticationService) {

      if(localStorage.getItem("on") == "1"){
         this.authenticate.keepMeLoggedIn = true;
         console.log("Locally stored values ON@home.");
      } else {
         this.authenticate.keepMeLoggedIn = false;
         console.log("Session stored values ON@home.");
      }
      this.authenticate.toggleStorage();

      this.authenticate.signedUser$.subscribe(user => this.homeUser = user);
  }

  ngOnInit(): void {}
}
