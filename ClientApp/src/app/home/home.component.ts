import { Component, OnDestroy, OnInit } from '@angular/core';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { ChartData, ChartType } from 'chart.js';
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
  grossPay = 1.0;
  taxedPay: 1.0;
  entryDescription: string;
  time = new Date();
  subscription: Subscription;
  constructor(private userInfo: UserinfoService, private auth: AuthService, private apiService:ApiService){}
  ngOnInit() {
    // Using RxJS Timer
    //Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        this.time = time;
      });

    this.getLastEntry();
    //updates the grossPay and taxedAmount
    this.getCurrentPay();

    this.doughnutChartLabels = [
      'Gross Income',
      'Taxed Amount',
    ];
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
    this.ngOnInit();
  }
  getLastEntry() {
    this.apiService.getLastTimeEntry()
      .subscribe((response: any) => {
        this.entryDescription = response.time;
      })
  }
  getCurrentPay() {
    this.apiService.getCurrentPay()
      .subscribe((response: any) => {
        console.log(typeof response.grossPay);
        this.grossPay = response.grossPay;
        this.taxedPay = response.taxedPay;

        //Update the chartData with values returned from getCurrentPay()
        this.doughnutChartData = {
          labels: this.doughnutChartLabels,
          datasets: [
            { data: [this.grossPay, (this.grossPay * 0.08)] },
          ],
        };

      }, error => { console.error(error) });
  }
  public doughnutChartLabels: string[];
  public doughnutChartData: ChartData<'doughnut'>;

  public doughnutChartType: ChartType = 'doughnut';
}
