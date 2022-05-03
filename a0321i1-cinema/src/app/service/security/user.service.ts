import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../entity/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  API_URL_USER = 'http://localhost:8080/api/member';
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }

  getUserByUsername(username: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_USER + '/user/' + username, this.httpOptions);
  }

  editUser(user: User): Observable<User> {
    return this.httpClient.put<User>(this.API_URL_USER + '/editUser/', user);
  }
}
