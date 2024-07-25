import { Injectable } from '@angular/core';
import { Auth } from '../models/auth.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUser : Auth | null = null;
  private isAuthenticated : boolean = false;

  constructor(private router : Router) { }

  private users : Auth[] = [
    {name: "ashan", email: "ashan.wimalasiri@gmail.com", password: "1234"},
    {name: "jlk", email: "lklj@gmail.com", password: "fdgdfg"},
  ];

  //methods
  getCurrentUser () : Auth | null {
    return this.currentUser;
  }

  logIn (email : string, password : string) : boolean {
    let user = this.users.find(user => user.email === email && user.password === password);
    if(user){
      this.currentUser = user;
      this.isAuthenticated = true;
      return true;
    }
    return false;
  }

  logOut () : void {
    this.currentUser = null;
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  getAuthStatus () : boolean {
    return this.isAuthenticated;
  }

  getCurrentUserName () : string {
    return this.currentUser?.name || "Guest";
  }
}  