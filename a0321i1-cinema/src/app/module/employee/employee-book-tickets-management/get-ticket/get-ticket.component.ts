import { Component, OnInit } from '@angular/core';
import {Ticket} from "../../../../entity/Ticket";
import {BookTicketsManagementService} from "../../../../service/employee/book-tickets-management.service";
import {ActivatedRoute} from "@angular/router";
import {RoomSeat} from "../../../../entity/RoomSeat";
import {MovieTicket} from "../../../../entity/MovieTicket";

@Component({
  selector: 'app-get-ticket',
  templateUrl: './get-ticket.component.html',
  styleUrls: ['./get-ticket.component.css']
})
export class GetTicketComponent implements OnInit {
  ticketDetail: Ticket;
  listChoseSeat: RoomSeat[];
  movieTicket: MovieTicket;
  totalMoney: number;
  receivedId: number;

  constructor(private bookTicketsManagementService: BookTicketsManagementService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.getBookTicket();
  }

  getBookTicket(){
    let index = this.activatedRoute.snapshot.params['ticketId'];
    this.bookTicketsManagementService.getBookedTicketByIndex(index).subscribe(data =>{
      this.ticketDetail = data;
    });
    if (this.bookTicketsManagementService.listChoseSeat.length !=0){
      this.listChoseSeat = this.bookTicketsManagementService.listChoseSeat;
      this.movieTicket = this.bookTicketsManagementService.movieTicket;
      this.totalMoney = this.getTotalMoney(this.listChoseSeat);
    }
  }
  getTotalMoney(listChoseSeat: RoomSeat[]) {
    let total: number = 0;
    for (let roomSeat of listChoseSeat) {
      total += this.movieTicket.ticketPrice;
    }
    return Math.round(total);
  }

  confirmSuccess() {
    this.ngOnInit();
  }
}
