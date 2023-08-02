import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false;
  login(){
    this.isLoggedIn = true;
  }
  logout(){
    this.isLoggedIn = false;
  }
  isUserLoggedIn(){
    return this.isLoggedIn;
  }
  constructor() { }
}
