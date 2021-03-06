import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error = '';

  constructor(private formBuilder: FormBuilder,
    private authenticate: AuthenticationService,
    private router: Router) {
    
      if(this.authenticate.signedUserValue){
        this.router.navigate(['/home']);
        console.log("Sending user @ home.");
      }
      this.authenticate.keepMeLoggedIn = false;
      //console.log("Current user: "+this.authenticate.signedUserValue.username);
    }


  registerUser(){
    console.log("Redirecting to register a new user!");
    this.router.navigate(['/register']);
  }
  
  ngOnInit(): void {

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  toggleKeepMeLoggedIn(){
    console.log('tog');

    this.authenticate.keepMeLoggedIn = !this.authenticate.keepMeLoggedIn;
    this.authenticate.toggleStorage();
  }

  get controls() {return this.loginForm.controls;}

  onSubmit(){
    
    console.log("Form submitted!");
    console.log(`${this.controls.username.value, 
      this.controls.password.value}`);

    this.authenticate.login(this.controls.username.value, 
      this.controls.password.value)
      .subscribe(
        data => {
          console.log("Logging in as "+this.authenticate.signedUserValue.username);
          console.log("JWT: "+this.authenticate.userJWTValue);
          this.router.navigate(['/home']);
          console.log("Initializing home!");
          window.location.reload();
        },
        error => this.error = error
      );
  }
}
