import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = 'http://localhost:8800/api/auth/';
  cookieService = inject(CookieService);
  constructor(private http: HttpClient) { }

  login(loginDto: any) {
    return this.http.post<any>(`${this.baseUrl}login`, loginDto, { withCredentials: true });
  }

  register(registerDto: any) {
    return this.http.post<any>(`${this.baseUrl}register`, registerDto);
  }

  signout() {
    return this.http.get<any>(`${this.baseUrl}signout`);
  }

  isLoggedIn(){
    return !!this.cookieService.get('access_token');
  }
}
