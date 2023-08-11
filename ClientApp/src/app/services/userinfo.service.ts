import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserinfoService {
  private fullName$ = new BehaviorSubject<string>("");
  constructor() { }
  public getFullName(){
    return this.fullName$.asObservable();
  }
  setFullName(fullName:string){
    this.fullName$.next(fullName);
  }
}
