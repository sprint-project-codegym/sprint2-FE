import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookTicketsService} from '../../../service/booking/book-tickets.service';
import {MovieTicketToSendMailDto} from "../../../dto/MovieTicketToSendMailDto";
import {InformationTicketDTO} from "../../../dto/InformationTicketDTO";
import {Ticket} from "../../../entity/Ticket";
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {element} from "protractor";
@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrls: ['./booking-information.component.css']
})
export class BookingInformationComponent implements OnInit{
  public infTickets: MovieTicketToSendMailDto[];
  public id: number;
  public price = 0;

  constructor(
    public detailBookTicketsService: BookTicketsService,
    public router: Router,
    public activeRoute: ActivatedRoute,
    public tokenStorageService: TokenStorageService,
    private bookTicketsService: BookTicketsService
  ) { }

  ngOnInit(): void {
    if (this.bookTicketsService.listTiket.length != 0) {
      this.infTickets = this.bookTicketsService.listTiket
    }
    console.log(this.infTickets);
    this.infTickets.forEach((element)=>{
      this.price += element.ticketPrice;
    })
    console.log(this.price);

    // this.activeRoute.paramMap.subscribe((param: ParamMap) => {
    //   const id = param.get('id');
    //   this.detailBookTicketsService.getDetailMovie(id).subscribe(data => {
    //     console.log(data)
    //     this.infTicket = data;
    //     this.price = data.ticketPrice;
    //     console.log(this.price);
    //   });
    // });
  }

  onSubmit() {
    console.log(this.infTickets);
    this.detailBookTicketsService.payViaPaypal(this.price).subscribe(
      (data)=> {
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
