import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaypalDTO} from '../../dto/PaypalDTO';
import {tick} from "@angular/core/testing";

@Injectable({
  providedIn: 'root'
})
export class BookTicketsService {
  private API_INF = 'http://localhost:8080/api/movie_ticket';
  private API_PAY = 'http://localhost:8080/api/payment';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  constructor(
    // tslint:disable-next-line:variable-name
    private _httpClient: HttpClient
  ) { }

  getDetailMovie(id: string): Observable<any> {
    return this._httpClient.get(this.API_INF + '/' + 'information' + '/' + id, this.httpOptions);
  }

  payViaPaypal(price: any): Observable<any>{
    return this._httpClient.post<PaypalDTO>(this.API_PAY + '/' + 'pay', {"price" : price}, this.httpOptions);
  }

  sendMailSuccessful(ticketInfo: any){
    return this._httpClient.post(this.API_PAY + '/successful', ticketInfo,this.httpOptions);
  }
}
