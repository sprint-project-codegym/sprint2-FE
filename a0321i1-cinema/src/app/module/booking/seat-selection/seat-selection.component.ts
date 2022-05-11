import {Component, OnInit} from '@angular/core';
import {RoomSeat} from '../../../entity/RoomSeat';
import {Ticket} from '../../../entity/Ticket';
import {MovieTicket} from '../../../entity/MovieTicket';
import {BookTicketsService} from '../../../service/booking/book-tickets.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-seat-selection',
  templateUrl: './seat-selection.component.html',
  styleUrls: ['./seat-selection.component.css']
})
export class SeatSelectionComponent implements OnInit {
  listRow: number[] = [1, 2, 3, 4, 5, 6, 7];

  listSeat: RoomSeat[] = [];
  listChoseSeat: RoomSeat[] = [];
  ticket: Ticket;
  movieTicket: MovieTicket;
  movieTicketId: number;
  totalMoney = 0;

  constructor(private bookTicketsService: BookTicketsService,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private toastrService: ToastrService) {
  }

  ngOnInit(): void {
    // tslint:disable-next-line:radix
    this.movieTicketId = parseInt(this.activatedRoute.snapshot.queryParamMap.get('movieTicketId'));
    this.bookTicketsService.getMovieTicketById(this.movieTicketId).subscribe(data => {
      this.movieTicket = data;
      this.bookTicketsService.movieTicket = this.movieTicket;
      this.getAllSeat(this.movieTicket.room.roomId);
    }, error => {
      console.log('get ' + error + ' at getMovieTicketById() on SeatSelectionComponent');
    });
  }

  getAllSeat(roomId: number) {
    this.bookTicketsService.getAllSeat(roomId).subscribe(data => {
      this.listSeat = data;
    }, error => {
      console.log('get ' + error + ' at getAllSeat() on SeatSelectionComponent');
    });
  }

  chooseSeat(roomSeat: RoomSeat) {
    if (roomSeat.seatStatus.seatStatusId === 1) {
      const seatStyle = document.getElementById(roomSeat.seat.row.rowName + roomSeat.seat.column.columnName);
      if (!this.listChoseSeat.includes(roomSeat)) {
        if (this.listChoseSeat.length < 8) {
          seatStyle.style.backgroundColor = 'green';
          seatStyle.style.color = 'white';
          this.listChoseSeat.push(roomSeat);
          this.getTotalMoney();
          // console.log(this.totalMoney);
        } else {
          this.toastrService.error('Bạn chỉ có thể chọn tối đa 8 vé!', 'Thông báo!');
        }
      } else {
        if (roomSeat.seat.seatType.seatTypeId === 2) {
          seatStyle.style.backgroundColor = 'lightpink';
        } else {
          seatStyle.style.backgroundColor = '#f0f0f0';
        }
        seatStyle.style.color = 'black';
        this.listChoseSeat.splice(this.listChoseSeat.indexOf(roomSeat), 1);
        this.getTotalMoney();
      }
    } else {
      this.toastrService.warning('Ghế này đã có người đặt rồi!', 'Thông báo!');
    }
  }
  getTotalMoney(){
    for (const roomSeat of this.listChoseSeat) {
      if (roomSeat.seat.seatType.seatTypeId === 1) {
        this.totalMoney += this.movieTicket.ticketPrice;
        console.log(this.totalMoney);
      } else {
        this.totalMoney += (this.movieTicket.ticketPrice * (4 / 3));
      }
    }
  }

  continue() {
    if (this.listChoseSeat.length !== 0 ){
      this.bookTicketsService.listChoseSeat = this.listChoseSeat;
      console.log(this.bookTicketsService.listChoseSeat);
      this.router.navigateByUrl('booking/confirm');
    } else {
      this.toastrService.error('Bạn chưa chọn vé!', 'Lỗi!');
    }
  }

}
