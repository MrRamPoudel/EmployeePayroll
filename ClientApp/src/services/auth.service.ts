import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "https://localhost:7009/api/Employee/"
  constructor(private http: HttpClient) {

  }
  logIn(employeeObj:any) {
    return this.http.post<any>(`${this.url}authenticate`, employeeObj);
  }
}
