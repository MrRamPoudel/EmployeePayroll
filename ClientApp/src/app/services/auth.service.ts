import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "https://localhost:7009/api/Employee/"
  private userPayload:any;
  constructor(private http: HttpClient) {
    this.userPayload = this.decodeJwtToken();
  }
  logIn(employeeObj:any) {
    return this.http.post<any>(`${this.url}authenticate`, employeeObj);
  }
  getLogin(): boolean{
    return !!localStorage.getItem('jwttoken');
  }
  storeToken(tokenValue:string){
    localStorage.setItem('jwttoken', tokenValue);
  }
  getJWTToken(){
    return localStorage.getItem('jwttoken');
  }
  logOut(){
    localStorage.clear();
  }
  decodeJwtToken() {
    const jwtHelper = new JwtHelperService();
    const token = this.getJWTToken()!;
    return jwtHelper.decodeToken(token);
  }
  extractFullName(){
    if(this.userPayload){
      return this.userPayload.unique_name;
    }
  }
  getInitials(){
    if(this.userPayload){
      const nameParts:string[] = this.userPayload.unique_name.split(" ");
      const initials = nameParts.map(part=>part[0].toUpperCase()).join("");
      return initials;
    }
    return "";
  }
}
