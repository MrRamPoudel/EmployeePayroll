import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements HttpInterceptor {
  private url = "https://localhost:7009/api/TimeEntry/";
  private statementUrl = "https://localhost:7009/api/Statement/"
  constructor(private http: HttpClient, private auth:AuthService) { }
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const myToken = this.auth.getJWTToken();
    if (myToken) {
        request = request.clone({
        setHeaders: { Authorization: `Bearer ${myToken}` }
      })
    }
    return next.handle(request);
  }
  createTimeEntry() {
    return this.http.post(`${this.url}`, {});
  }
  getLastTimeEntry() {
    return this.http.get(`${ this.url }punchEntry`, {})
  }
  getCurrentPay() {
    return this.http.get(`${this.url}currentPay`, {})
  }
  getCurrentStatement() {
    return this.http.get(this.statementUrl, { responseType: 'blob' })
      .subscribe({
        next: (data) => {
          const blob = new Blob([data], { type: 'application/pdf' });
          const url = window.URL.createObjectURL(blob);

          const a = document.createElement('a');
          a.href = url;
          a.download = 'EmployeeStatment.pdf';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          a.remove();
        }
      });
  }
}
