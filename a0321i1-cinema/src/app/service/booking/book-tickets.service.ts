import { Injectable } from '@angular/core';
import {MovieTicket} from '../../entity/MovieTicket';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {PaypalDTO} from '../../dto/PaypalDTO';
import {tick} from "@angular/core/testing";
import {RoomSeat} from "../../entity/RoomSeat";
import {Ticket} from "../../entity/Ticket";
import {Movie} from "../../entity/Movie";
import {ShowTime} from "../../entity/ShowTime";
import {UserNoAccountDTO} from "../../entity/userNoAccountDTO";
import {MovieTicketToSendMailDto} from "../../dto/MovieTicketToSendMailDto";
import {TicketDTO} from "../../dto/TicketDTO";

const API_TICKET: string = 'http://localhost:8080/api/ticket';
const API_SEAT: string = 'http://localhost:8080/api/roomSeat';
const API_USER: string = 'http://localhost:8080/api/user';

@Injectable({
  providedIn: 'root'
})
export class BookTicketsService {
  private API_URL_TICKET_BOOKED = 'http://localhost:8080/api/ticket/booked';
  private API_INF = 'http://localhost:8080/api/ticket';
  private API_PAY = 'http://localhost:8080/api/payment';
  API_URL_TICKET: string = 'http://localhost:8080/api/ticket';
  listChoseSeat: RoomSeat[] = [];
  listTiket: MovieTicketToSendMailDto[];
  movieTicket: MovieTicket;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
    'Access-Control-Allow-Credentials': 'true'
  };

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

  // NgaLT get booked ticket list
  findAllBookedTicket(username: string, page: number): Observable<any> {
    console.log(username);
    console.log(this.API_URL_TICKET_BOOKED + '?page=' + page + '&&username=' + username);
    return this.httpClient.get<any>(this.API_URL_TICKET_BOOKED + '/' + username + '/?page=' + page);
  }

  getDetailMovie(id: string): Observable<any> {
    return this.httpClient.get(this.API_INF + '/' + 'information' + '/' + id, this.httpOptions);
  }

  payViaPaypal(price: any): Observable<any>{
    return this.httpClient.post<PaypalDTO>(this.API_PAY + '/' + 'pay', {"price" : price}, this.httpOptions);
  }

  sendMailSuccessful(ticketInfo: any) {
    return this.httpClient.post(this.API_PAY + '/successful', ticketInfo, this.httpOptions);
  }

  findAll(username: string, page: number): Observable<any> {
    console.log(username);
    console.log(this.API_URL_TICKET + '/booking?page=' + page + '&&username=' + username)
    return this.httpClient.get<any>(this.API_URL_TICKET + '/booking' + '?page=' +  page + '&&username=' + username );
  };

  deleteByIdTickets(deleteId: number): Observable<Ticket> {
    console.log(deleteId);
    console.log(this.API_URL_TICKET + '/booking/' + deleteId)
    return this.httpClient.delete<Ticket>(this.API_URL_TICKET + '/cancelTicket/' + deleteId);
  }

  /**
   * Author: NhungHTC
   * getAllMovie(), getAllShowTime(), getMovieTicket(),
   * getAllSeat(), getMovieTicketById(), createTicket(), createUserNoAccount()
   */

  getAllMovie(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(API_TICKET + '/listMovie');
  }

  getAllShowTime(date: String, movieId: number): Observable<ShowTime[]> {
    return this.httpClient.get<ShowTime[]>(API_TICKET + '/listShowTime/' + date + '/' + movieId);
  }

  getMovieTicket(movieId: number, date: string, showTimeId: number): Observable<MovieTicket> {
    return this.httpClient.get<MovieTicket>(API_TICKET + '/movieTicket/' + movieId + '/' + date + '/' + showTimeId);
  }

  getAllSeat(roomId: number): Observable<RoomSeat[]> {
    return this.httpClient.get<RoomSeat[]>(API_SEAT + '/getAllSeat/' + roomId);
  }

  getMovieTicketById(movieTicketId: number): Observable<MovieTicket> {
    return this.httpClient.get<MovieTicket>(API_TICKET + '/getMovieTicket/' + movieTicketId);
  }

  createTicketDTO(ticketDTO: any): Observable<any> {
    console.log("goi api");
    console.log(ticketDTO);
    return this.httpClient.post( 'http://localhost:8080/api/ticket/createTicketDTO/', ticketDTO, this.httpOptions);
  }
  createUserNoAccount(userNoAccountDTO: UserNoAccountDTO): Observable<any> {
    return this.httpClient.post(API_USER + "/createUserNoAccount", userNoAccountDTO);
  }

  /*PhuocDD*/
}
