import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private autheService: AuthenticationService) { }

  isLoggedIn(): boolean {
    return this.autheService.getAuthStatus();
  }

  getCurrentUserName(): string {
    // console.log(this.autheService.getCurrentUserName());
    return this.autheService.getCurrentUserName();
  }

  logout(): void {
    this.autheService.logOut();
    console.log("logout");
  }
}
