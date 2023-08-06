import { Component, OnDestroy, OnInit } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { Subscription, timer } from 'rxjs';
import {map, share} from "rxjs/operators";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit, OnDestroy{
  time = new Date();
  subscription: Subscription;

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
}
