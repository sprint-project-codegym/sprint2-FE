import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {RoomSeat} from "../../entity/RoomSeat";
import {MovieTicket} from "../../entity/MovieTicket";

@Injectable({
  providedIn: 'root'
})
export class BookTicketsManagementService {

  private API = 'http://localhost:8080/api/ticket';
  listChoseSeat: RoomSeat[] = [];
  movieTicket: MovieTicket;
  private httpOptions: any;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
      'Access-Control-Allow-Credentials': 'true'
    };
  }
  getAllBookTicketList(page: number): Observable<any> {
    return this.http.get<any>(this.API + '/booked-ticket-list' + '/?page=' + page, this.httpOptions);
  }
  getAllBookedTicketListNoPage(): Observable<any> {
    return this.http.get<any>(this.API + '/booked-ticket-list-no-page', this.httpOptions);
  }

  getBookedTicketByIndex(ticketId: number): Observable<any> {
    return this.http.get<any>(this.API + '/booked-ticket-list/get-ticket/' + ticketId, this.httpOptions);
  }

  searchTicketByTicketId(ticketId: number): Observable<any> {
    return this.http.get<any>(this.API + '/booked-ticket-list/search-ticketId' + '?ticketId=' + ticketId, this.httpOptions);
  }

  searchTicketByUserId(userId: number): Observable<any> {
    return this.http.get<any>(this.API + '/booked-ticket-list/search-userId' + '?userId=' + userId, this.httpOptions);
  }

  searchTicketByIdCard(idCard: string): Observable<any> {
    return this.http.get<any>(this.API + '/booked-ticket-list/search-idCard' + '?idCard=' + idCard, this.httpOptions);
  }

  searchTicketByPhone(phone: string): Observable<any> {
    return this.http.get<any>(this.API + '/booked-ticket-list/search-phone' + '?phone=' + phone, this.httpOptions);
  }

  confirmTicket(ticketId: number): Observable<any> {
    return this.http.put<any>(this.API + '/booked-ticket-list/get-ticket/confirm-ticket/' + ticketId, this.httpOptions);
  }
}
