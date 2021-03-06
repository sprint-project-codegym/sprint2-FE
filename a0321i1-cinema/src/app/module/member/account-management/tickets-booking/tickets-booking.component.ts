import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BookTicketsService} from '../../../../service/booking/book-tickets.service';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../../../service/security/token-storage.service';
import {Ticket} from '../../../../entity/Ticket';
import {SecurityService} from "../../../../service/security/security.service";

@Component({
  selector: 'app-tickets-booking',
  templateUrl: './tickets-booking.component.html',
  styleUrls: ['./tickets-booking.component.css']
})
export class TicketsBookingComponent implements OnInit {
  ticketBooking: Ticket[];
  username: string;
  pageClicked = 0;
  page = 0;
  totalPage = 1;
  pages = [];
  constructor(
    private securityService: SecurityService,
    private bookTicketsService: BookTicketsService,
    private router: Router,
    private tokenStore: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStore.getToken()) {
      const user = this.tokenStore.getUser();
      console.log(user.user.account.username);
      this.username = user.user.account.username;
    }
    this.onSubmit(0)
  }

  logout() {
    this.tokenStore.signOut();
    this.router.navigateByUrl("/login");
  }

  onSubmit(page: any) {
    this.bookTicketsService.findAllBookedTicket(this.username, page).subscribe(
      data => {
        if (data == null){
          this.ticketBooking = [];
        }else {
          // this.ticketBooking = data;
          this.ticketBooking = data['content'];
          this.pageClicked = page;
          this.totalPage = data['totalPages'];
          this.pages = Array.apply(null, {length: this.totalPage}).map(Number.call, Number);

        }
      }
    );
  }

  onNext(){
    if (this.pageClicked < this.totalPage - 1) {
      this.pageClicked++;
      this.onSubmit(this.pageClicked);
    }
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(this.pageClicked);
    }
  }

  onFirst() {
    this.pageClicked = 0;
    this.onSubmit(this.pageClicked);
  }

  onLast() {
    this.pageClicked = this.totalPage - 1;
    this.onSubmit(this.pageClicked);
  }
}
