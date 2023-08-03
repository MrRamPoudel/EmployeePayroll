import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router){
  }
  eye = faEyeSlash;
  type ="password";
  isText:boolean = false;
  togglePass(){
    this.isText = !this.isText;
    this.isText ? (this.eye = faEye) : (this.eye =faEyeSlash);
    this.isText? (this.type="text"):(this.type="password");
  }
  
private isLoggedIn = false;
validateInput(){
  this.authService.login();
  this.router.navigate(['/home']);
}
sendToSignup(){
  this.router.navigate(['/signup']);
}
}
