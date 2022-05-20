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
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJoYXUiLCJyb2xlcyI6WyJST0xFX0FETUlOIl0sImV4cCI6MTY1MjEyMzA0MywiaWF0IjoxNjUyMTA1MDQzfQ.oZ3uzkp7BjMjoNUiMo2VDiGNUfmt9KIjb0DWJy3-fVgY06qYcsTJq8VTN-51AGWhUPG-gsLnLK8oWhQgeIwuvw',
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

}
