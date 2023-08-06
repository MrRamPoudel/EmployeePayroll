import { Component } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  verticalEllipsis = faEllipsisVertical;
  hours:number = 0;
  minutes:number = 0;
  seconds:number = 0;
  getDate():string{
   return new Date().toISOString().slice(0, 10);
  }
  getCurrentTime(){
    const today = new Date();
    this.hours = today.getHours();
    this.minutes = today.getMinutes();
    this.seconds = today.getSeconds();
    return this.hours + ':' + this.minutes + ':' + this.seconds;
  }
}
