import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {BookTicketsService} from '../../../service/booking/book-tickets.service';
import {InformationMovieTicketDTO} from '../../../dto/InformationMovieTicketDTO';
@Component({
  selector: 'app-booking-information',
  templateUrl: './booking-information.component.html',
  styleUrls: ['./booking-information.component.css']
})
export class BookingInformationComponent implements OnInit {
  public infMovieTicket: InformationMovieTicketDTO;
  public id: number;
  public price: any;

  constructor(
    public detailBookTicketsService: BookTicketsService,
    public router: Router,
    public activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param: ParamMap) => {
      const id = param.get('id');
      this.detailBookTicketsService.getDetailMovie(id).subscribe(data => {
        console.log(data)
        this.infMovieTicket = data;
        this.price = data.ticketPrice;
        console.log(this.price);
      });
    });
  }

  onSubmit() {
    this.detailBookTicketsService.payViaPaypal(this.price).subscribe(
      (data)=> {
        console.log(this.infMovieTicket);
        this.detailBookTicketsService.sendMailSuccessful(this.infMovieTicket).subscribe(
          ()=> console.log("Gui mai thanh cong"),
          (error)=> console.log(error)
        );
        console.log(data);
        window.location.href = data.linkName;
      }
    )
  }
}
