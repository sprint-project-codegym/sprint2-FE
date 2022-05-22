import { Component, OnInit } from '@angular/core';
import {MovieTicket} from "../../../entity/MovieTicket";
import {UserNoAccountDTO} from "../../../entity/userNoAccountDTO";
import {User} from "../../../entity/User";
import {RoomSeat} from "../../../entity/RoomSeat";
import {FormBuilder, FormGroup} from "@angular/forms";
import {PaypalDTO} from "../../../dto/PaypalDTO";
import {BookTicketsService} from "../../../service/booking/book-tickets.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../service/security/token-storage.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirm-booking',
  templateUrl: './confirm-booking.component.html',
  styleUrls: ['./confirm-booking.component.css']
})
export class ConfirmBookingComponent implements OnInit {
  isConfirmed: boolean = false;
  listChoseSeat: RoomSeat[] = [];
  movieTicket: MovieTicket;
  user: User;
  userNoAccountDTO:UserNoAccountDTO;
  createUserForm:FormGroup;
  totalMoney: number;
  ticketName:string = "";
  paypalDTO:PaypalDTO;
  paymentId:string = '';
  payerId:string = '';
  constructor(
    private formBuilder:FormBuilder,
    private bookTicketsService: BookTicketsService,
    private activatedRoute:ActivatedRoute,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    if (this.bookTicketsService.listTiket.length != 0) {
      console.log(this.bookTicketsService.listTiket);
    }
  }

}
