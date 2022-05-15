import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {LoginRequest} from '../../dto/LoginRequest';
import {UserSocial} from '../../dto/userSocial';
import {User} from '../../entity/User';
import {UserDTO} from '../../dto/UserDTO';

const API_URL = 'http://localhost:8080/api/';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  httpOptions: any;
  isLoggedIn: boolean;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }

  login(loginRequest: any): Observable<any> {
    return this.httpClient.post<any>(API_URL + 'login',loginRequest, this.httpOptions);
  }

  requestResetPassword(email: string): Observable<any> {
    return this.httpClient.post(API_URL + 'send-verification-email', {
      email
    }, this.httpOptions);
  }

  checkVerificationCode(code: string): Observable<any> {
    return this.httpClient.post(API_URL + 'check-verification-code', {
      verificationCode: code
    }, this.httpOptions);
  }

  resetPassword(confirmPassword: string, verificationCode: string): Observable<any> {
    console.log(confirmPassword, verificationCode);
    return this.httpClient.post(API_URL + 'reset-password', {
      confirmPassword: confirmPassword,
      verificationCode: verificationCode
    }, this.httpOptions);
  }

  google(authToken: any): Observable<any> {
    return this.httpClient.post(API_URL + 'login/google',
      {"token": authToken}, this.httpOptions);
  }

  facebook(token: any): Observable<any> {
    return this.httpClient.post(API_URL + 'login/facebook', {
      token
    }, this.httpOptions);
  }

  test(): Observable<any> {
    return this.httpClient.get("http://localhost:8080/api/admin/test",this.httpOptions)
  }

  createUserConfirmMail(user: UserDTO): Observable<User> {
    return this.httpClient.post<User>(API_URL + 'register', user);
  }

  verifyAccount(code:string):  Observable<any>{
    return this.httpClient.get(API_URL + "verify-account?code=" + code, this.httpOptions);
  }

  sendEmailConfirm(email: string): Observable<any>{
    return this.httpClient.get(API_URL + "emailConfirm?email=" + email);
  }

  getAllProvince(): Observable<any> {
    return this.httpClient.get(API_URL + 'provinces', this.httpOptions);
  }

  getAllDistrictByProvinceId(id: number): Observable<any> {
    return this.httpClient.get(API_URL + 'districts/' + id, this.httpOptions);
  }

  getAllWardByDistrictId(id: number): Observable<any> {
    return this.httpClient.get(API_URL + 'wards/' + id, this.httpOptions);
  }

  getUserByUsername(username: string): Observable<any> {
    if (username == null) {
      return EMPTY;
    } else {
      return this.httpClient.get<any>(API_URL + '/user/' + username, this.httpOptions);
    }
  }

}
