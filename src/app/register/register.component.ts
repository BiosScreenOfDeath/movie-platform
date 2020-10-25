import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private authenticate: AuthenticationService) { }

  ngOnInit(): void {

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      username: ['', [
        Validators.required,
        Validators.minLength(6)]],
      password: ['', [
        Validators.required,
        Validators.minLength(8),
        passwordCheckValidator(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%?&])[A-Za-z\d$@$!%?&]{8,}$/i)
      ]],
    });
    console.log("Register form values set!");
  }

  get controls() {return this.registerForm.controls;}

  registerUser(){
    console.log("User: "+ this.registerForm.controls['firstName'].value);

    this.authenticate.register(
      this.controls.firstName.value,
      this.controls.lastName.value,
      this.controls.username.value,
      this.controls.password.value
    );
  }
}

export function passwordCheckValidator(nameRe: RegExp): ValidatorFn{
  return (control: AbstractControl): {[key: string]: any} | null => {
      const passwordCheck = nameRe.test(control.value);
      return !passwordCheck ? {passwordCheck: {value: control.value}} : null; 
  };
};