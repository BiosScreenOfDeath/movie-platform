import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SiteGuardService implements CanActivate{

  constructor(private router: Router) { }

  canActivate() : boolean {
    console.log("Checking if user exists.");
    if(localStorage.getItem('signedUser') 
    || sessionStorage.getItem('signedUser')){
      return true;
    } else {
      this.router.navigate(['/login']);
      return true;
    }
  }

  ngOnDestroy(){
    this.router.navigate(['']);
  }
}
