import {Injectable} from '@angular/core';
import {MovieTicket} from "../../entity/MovieTicket";
import {RoomSeat} from "../../entity/RoomSeat";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Ticket} from "../../entity/Ticket";
import {Movie} from "../../entity/Movie";
import {ShowTime} from "../../entity/ShowTime";
import {UserNoAccountDTO} from "../../entity/userNoAccountDTO";

const API_TICKET: string = 'http://localhost:8080/api/ticket';
const API_SEAT: string = 'http://localhost:8080/api/roomSeat'
const API_USER: string = 'http://localhost:8080/api/user';

@Injectable({
  providedIn: 'root'
})
export class BookTicketsService {
  API_URL_TICKET: string = 'http://localhost:8080/api/ticket';
  httpOptions: any;

  movieTicket: MovieTicket;
  listChoseSeat: RoomSeat[] = [];


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

  createTicketDTO(movieTicketId: number, userId: number, seatId: number): Observable<any> {
    return this.httpClient.post(API_TICKET + '/createTicketDTO/' + movieTicketId + '/' + userId + '/' + seatId, this.httpOptions);
  }
  createUserNoAccount(userNoAccountDTO: UserNoAccountDTO): Observable<any> {
    return this.httpClient.post(API_USER + "/createUserNoAccount", userNoAccountDTO);
  }
}
