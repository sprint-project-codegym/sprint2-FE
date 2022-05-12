import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AccountDTO} from '../../dto/AccountDTO';

@Injectable({
  providedIn: 'root'
})
export class AccountManagementService {
  API_URL_ACCOUNT = 'http://localhost:8080/api/member';
  httpOptions: any;

  constructor(private httpClient: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200/',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }

  getAccountByUsername(username: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_ACCOUNT + '/account/' + username, this.httpOptions);
  }

  setNewPassword(accountDTO: AccountDTO): Observable<any> {
    return this.httpClient.put<any>(this.API_URL_ACCOUNT + '/setPass', accountDTO, this.httpOptions);
  }

  getTransactionHistory(username: string, status: boolean, start: string, end: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_ACCOUNT + '/transaction?username=' + username + '&status=' + status + '&startDate=' + start + '&endDate=' + end, this.httpOptions);
  }

  getAllTransaction(username: string): Observable<any> {
    return this.httpClient.get<any>(this.API_URL_ACCOUNT + '/transaction-list?username=' + username, this.httpOptions);
  }
}
