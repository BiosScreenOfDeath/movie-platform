import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  resetForm: FormGroup;
  userUpdated = false;

  //API user, firstname/lastname/username/id
  userToEdit: {
    firstname?: string,
    lastname?: string,
    username?: string,
    password?: string
  };//BehaviorSubject<User>;

  // Ensures no illegitimate access occurs,
  // sets up the user's editing form.
  constructor(
    private formBuilder: FormBuilder,
    private authenticate: AuthenticationService,
    private router: Router) {

    console.log("Setting edit form.")
    this.resetForm = this.formBuilder.group({
      resetFirstName: [''],
      resetLastName: [''],
      resetUsername: ['',
        [Validators.minLength(6)]],
      resetPassword: ['',
        [Validators.minLength(8),
        passwordCheckValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$/i)]],
      resetConfirmPassword: ['',
        [Validators.minLength(8)]]
    });
  }

  // Redirects to home.
  goHome(){
    this.userUpdated = false
    this.router.navigate(['/home']);
  }

  // Updates the user's data depending
  // on the field they fill.
  userEdit(){
    if(!this.passwordMatch()){
      console.log("Input passwords don't match.");
      return;
    }

    console.log("Retrieving user info.");
    this.authenticate.userInfo().subscribe(
      user => {
        this.userToEdit = {

        };//new BehaviorSubject<any>(user);

        //console.log("id# "+this.userToEdit.value.id);

        //Then, do userEdit(). Bitch.

        if(this.resetForm.controls.resetFirstName.value.trim()){
          this.userToEdit/*.value*/.firstname = this.resetForm.controls.resetFirstName.value.trim();
        }//else{ this.userToEdit.value.firstname = this.authenticate.signedUserValue.firstname; }

        if(this.resetForm.controls.resetLastName.value.trim()){
          this.userToEdit/*.value*/.lastname = this.resetForm.controls.resetLastName.value.trim();
        }//else{ this.userToEdit.value.lastname = this.authenticate.signedUserValue.lastname; }

        if(this.resetForm.controls.resetUsername.value.trim()){
          this.userToEdit/*.value*/.username = this.resetForm.controls.resetUsername.value.trim();
        }//else{ this.userToEdit.value.username = this.authenticate.signedUserValue.username; }

        this.userToEdit/*.value*/.password = this.resetForm.controls.resetConfirmPassword.value.trim();

    this.authenticate.userEdit(this.userToEdit/*.value*/);
      }
    );
    console.log("Retrieved user info.");
    this.userUpdated = true;
  }

  // Checks the 2 password fields.
  passwordMatch(){
    return (this.resetForm.controls.resetPassword.value ==
    this.resetForm.controls.resetConfirmPassword.value);
  }

  // Shows the values of the form's fields.
  displaySubmittedData(){
    this.authenticate.showOptions();
    if(this.passwordMatch()) {console.log("Passwords match!");}
    else { console.log("Passwords don't match.");}
    console.log(`first: ${this.resetForm.controls.resetFirstName.value}`);
    console.log(`last: ${this.resetForm.controls.resetLastName.value}`);
    console.log(`user: ${this.resetForm.controls.resetUsername.value}`);
    console.log(`pass: ${this.resetForm.controls.resetConfirmPassword.value}`);
  }

  ngOnInit(): void {}
}

// Validator used to ensure the input of a good password.
export function passwordCheckValidator(nameRe: RegExp): ValidatorFn{
  return (control: AbstractControl): {[key: string]: any} | null => {
      const passwordCheck = nameRe.test(control.value);
      return !passwordCheck ? {passwordCheck: {value: control.value}} : null;
  };
};
