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
    //Fonts
    verticalEllipsis = faEllipsisVertical;
    //Place holders
    grossPay = 1.0;
    taxedPay: 1.0;
    entryDescription: string;
    time = new Date();
    subscription: Subscription;

    //Chart variables
    doughnutChartLabels: string[];
    doughnutChartData: ChartData<'doughnut'>;
    doughnutChartType: ChartType = 'doughnut';
    constructor(private userInfo: UserinfoService, private auth: AuthService, private apiService:ApiService){}
    ngOnInit() {
      // Using RxJS Timer
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

    //function to handle
    onTimeSubmit() {
        this.apiService.createTimeEntry()
        //update the last entry
        this.ngOnInit();
    }

    getLastEntry() {
        this.apiService.getLastTimeEntry()
        .subscribe((response: any) => {
            this.entryDescription = response.time;
        })
    }

//Get the result from the api and display it in chart
  getCurrentPay() {
        this.apiService.getCurrentPay()
        .subscribe({
        next: (response:any) =>{
            this.grossPay = response.grossPay;
            this.taxedPay = response.taxedPay;

            //Update the chartData with values returned from getCurrentPay()
            this.doughnutChartData = {
              labels: this.doughnutChartLabels,
              datasets: [
                { data: [this.grossPay, (this.grossPay * 0.08)] },
              ],
            };
        },
        error: (e) => console.error(e)
      });
    }
}
