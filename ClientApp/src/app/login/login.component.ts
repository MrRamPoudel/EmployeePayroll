import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../common/validateForm';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private formBuilder: FormBuilder){
  }
  loginForm!: FormGroup;
  eye = faEyeSlash;
  type ="password";
  isText:boolean = false;
  togglePass(){
    this.isText = !this.isText;
    this.isText ? (this.eye = faEye) : (this.eye =faEyeSlash);
    this.isText? (this.type="text"):(this.type="password");
  }
  
private isLoggedIn = false;
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }
  handleLogIn(){
    if(this.loginForm.valid){
      //@TODO add logic for form handling the login
    }
    else{
      ValidateForm.validateAllFields(this.loginForm);
    }
  }
}
