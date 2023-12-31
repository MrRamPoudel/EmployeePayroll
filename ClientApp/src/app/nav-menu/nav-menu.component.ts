import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService} from 'src/app/services/auth.service';
import { faSignOut, faBars, faBell, faHouse, faQuestion} from '@fortawesome/free-solid-svg-icons'

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  houseIcon = faHouse;
  signOutIcon = faSignOut;
  barIcon = faBars;
  bellIcon = faBell;
  questionIcon = faQuestion;
  isExpanded = false;
  loggedIn = false;
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  constructor(private auth: AuthService, private router: Router){}
  handleLogOut(){
    this.auth.logOut();
    this.router.navigate(['/']);
  }
  isLoggedIn(){
    return this.auth.getLogin();
  }
}
