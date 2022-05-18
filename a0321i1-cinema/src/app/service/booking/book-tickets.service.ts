import { Injectable } from '@angular/core';
import {MovieTicket} from '../../entity/MovieTicket';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookTicketsService {
  private API_URL_TICKET = 'http://localhost:8080/api/ticket/booked';

  movieTicket: MovieTicket;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };
  constructor(private httpClient: HttpClient) { }

  // NgaLT get booked ticket list
  findAllBookedTicket(username: string, page: number): Observable<any> {
    console.log(username);
    console.log(this.API_URL_TICKET + '?page=' + page + '&&username=' + username);
    return this.httpClient.get<any>(this.API_URL_TICKET+'/'+username + '/?page=' + page);
  }
}
