import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
const AUTH_API = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  httpOptions: any;
  isLoggedIn: boolean;

  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }

  login(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'login', {
      username: user.username,
      password: user.password
    }, this.httpOptions);
  }

  requestResetPassword(email: string): Observable<any> {
    return this.http.post(AUTH_API + 'send-verification-email', {
      email
    }, this.httpOptions);
  }

  checkVerificationCode(code: string): Observable<any> {
    return this.http.post(AUTH_API + 'check-verification-code', {
      code
    }, this.httpOptions);
  }

  resetPassword(newPassword: string, reNewPassword: string, verificationCode: string): Observable<any> {
    return this.http.post(AUTH_API + 'reset-password', {
      newPassword,
      reNewPassword,
      verificationCode
    }, this.httpOptions);
  }

  google(authToken: any): Observable<any> {
    return this.http.post(AUTH_API + 'login/google',
      {"token": authToken}, this.httpOptions);
  }

  facebook(token: any): Observable<any> {
    return this.http.post(AUTH_API + 'login/facebook', {
      token
    }, this.httpOptions);
  }

}
