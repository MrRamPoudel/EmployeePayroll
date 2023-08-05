import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  constructor(private router: Router){}
 /*
  ngOnInit(){
    if(this.authService.isUserLoggedIn()){
      this.router.navigate(['/home']);
    }
    else{
      this.router.navigate(['/login']);
    }
  }
  */
  title = 'app';
}
