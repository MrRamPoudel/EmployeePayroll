import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements HttpInterceptor {
  private url = "https://localhost:7009/api/TimeEntry/";
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
    return this.http.post(this.url, {});
  }
}
