import { Component, OnDestroy, OnInit } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Subscription, timer } from 'rxjs';
import {map, share} from "rxjs/operators";
import { AuthService } from 'src/app/services/auth.service';
import { ApiService } from '../services/api.service';
import { UserinfoService } from '../services/userinfo.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy{
  time = new Date();
  subscription: Subscription;
  constructor(private userInfo: UserinfoService, private auth: AuthService, private apiService:ApiService){}
  ngOnInit() {
    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        let hour = this.time.getHours();
        let minuts = this.time.getMinutes();
        let seconds = this.time.getSeconds();
        this.time = time;
      });
  }
  verticalEllipsis = faEllipsisVertical;
  getDate():string{
   return new Date().toISOString().slice(0, 10);
  }
  ngOnDestroy(): void {
      if(this.subscription){
        this.subscription.unsubscribe();
      }
  }
  getFullName(){
    return this.auth.extractFullName();
  }
  getInitials(){
    return this.auth.getInitials();
  }
  onTimeSubmit() {
    this.apiService.createTimeEntry()
      .subscribe(
        response => {
          console.log('Time entry created!', response);
        },
        error => {
          console.error('Error creating time entry:', error);
        }
      );
  }
}
