import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import ValidateForm from '../common/validateForm';
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
  handleSignUp(){
    if(this.signupForm.valid){
      //try inserting
    }
    else{
      //throw error
      ValidateForm.validateAllFields(this.signupForm);
    }
  }

}
