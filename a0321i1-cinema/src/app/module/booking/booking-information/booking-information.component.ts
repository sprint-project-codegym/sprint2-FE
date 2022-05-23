import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookTicketsService} from '../../../service/booking/book-tickets.service';
import {MovieTicketToSendMailDto} from "../../../dto/MovieTicketToSendMailDto";
import {InformationTicketDTO} from "../../../dto/InformationTicketDTO";
import {Ticket} from "../../../entity/Ticket";
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {element} from "protractor";
import {TicketDTO} from "../../../dto/TicketDTO";
import {SecurityService} from "../../../service/security/security.service";
import {RoomSeat} from "../../../entity/RoomSeat";
import {MovieTicket} from "../../../entity/MovieTicket";
@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrls: ['./booking-information.component.css']
})
export class BookingInformationComponent implements OnInit{
  public infTickets: MovieTicketToSendMailDto[];
  public id: number;
  public price = 0;
  public listTicketDTO = [];
  public movieTicket: MovieTicket;
  public listChooseSeat: RoomSeat[] = [];

  constructor(
    public detailBookTicketsService: BookTicketsService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public tokenStorageService: TokenStorageService,
    private bookTicketsService: BookTicketsService,
    private tokenStore: TokenStorageService,
    private securityService: SecurityService
  ) { }

  ngOnInit(): void {

    this.listChooseSeat = this.bookTicketsService.listChoseSeat;
    this.movieTicket = this.bookTicketsService.movieTicket;

    if (this.bookTicketsService.listTiket.length != 0) {
      this.infTickets = this.bookTicketsService.listTiket
    }
    console.log(this.infTickets);
    this.infTickets.forEach((element)=>{
      this.price += element.ticketPrice;
    });
    console.log(this.price);

    console.log(this.movieTicket.movieTicketId);
    console.log(this.listTicketDTO);

  }

  onSubmit() {
    console.log(this.infTickets);
    this.detailBookTicketsService.payViaPaypal(this.price).subscribe(
      (data)=> {

        let length = this.listChooseSeat.length;
        console.log(length);
        for(let i=0; i<length; i++){
          let ticketDTO: TicketDTO = {
            movieTicketId: this.movieTicket.movieTicketId,
            username: this.tokenStore.getUser().user.account.username,
            seatId: this.listChooseSeat[i].seat.seatId
          };
          console.log(ticketDTO);
          this.bookTicketsService.createTicketDTO(ticketDTO).subscribe();
        }

        let movieTicketToSendMail = [];
        for(let i=0; i<this.infTickets.length; i++){
          movieTicketToSendMail.push({
            "ticketId": this.infTickets[i].tiketId,
            "email": this.infTickets[i].email,
            "username": this.infTickets[i].username,
            "roomName": this.infTickets[i].roomName,
            "projectionName": this.infTickets[i].projectionName,
            "posterMovie": this.infTickets[i].posterMovie,
            "movieName": this.infTickets[i].movieName,
            "showDate": this.infTickets[i].showDate,
            "showTime": this.infTickets[i].showTime,
            "seatRow": this.infTickets[i].seatRow,
            "seatColumn": this.infTickets[i].seatColumn,
            "ticketPrice": this.infTickets[i].ticketPrice,
          })
        }
        console.log(movieTicketToSendMail);
        this.detailBookTicketsService.sendMailSuccessful(movieTicketToSendMail).subscribe(
          ()=> console.log("Gui mail thanh cong"),
          (error)=> console.log(error)
        );
        console.log(data);
        window.location.href = data.linkName;
      },
      error => console.log(error)
    )
  }
}
