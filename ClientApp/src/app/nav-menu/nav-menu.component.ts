import { Component } from '@angular/core';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  isExpanded = false;
  collapse() {
    this.isExpanded = false;
  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }
  constructor(private auth: AuthService){}
  isSignedOut(){
    return this.auth.getLogin() ? 0: 1;
  }
}
