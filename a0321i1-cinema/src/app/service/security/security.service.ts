import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EMPTY, Observable} from 'rxjs';
import {User} from '../../entity/User';
import {UserDTO} from '../../dto/UserDTO';

const API_URL = 'http://localhost:8080/api/';
const BASE_API_URL = 'http://localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  httpOptions: any;

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

  createUserConfirmMail(user: UserDTO): Observable<User> {
    return this.httpClient.post<User>(API_URL + 'register', user);
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
