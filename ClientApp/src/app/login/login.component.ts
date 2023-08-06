import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service'
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
  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router:Router){
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
invalid= false;
  ngOnInit(){
    this.loginForm = this.formBuilder.group({
      username:['', Validators.required],
      password:['', Validators.required]
    })
  }
  handleLogIn(){
    if(this.loginForm.valid){
      this.auth.logIn(this.loginForm.value)
        .subscribe({
          next: (res: any) => {
            this.auth.storeToken(res.Token);
            this.router.navigate(['home']);
          },
          error: (err: any)=> {
            this.invalid = true;
          }
        })
    }
    else{
      ValidateForm.validateAllFields(this.loginForm);
    }
  }
}
