import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private formBuilder: FormBuilder){}
  signupForm!: FormGroup;
  ngOnInit(){
    this.signupForm= this.formBuilder.group({
      firstName:['', Validators.required],
      lastName:['', Validators.required],
      username:['', Validators.required],
      password:['', Validators.required],
      address1:['', Validators.required],
      city:['', Validators.required],
      state:['', Validators.required],
      zipcode:['', Validators.required]
    })
  }
}
