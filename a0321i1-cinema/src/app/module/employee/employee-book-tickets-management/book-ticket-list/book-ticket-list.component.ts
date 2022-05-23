import { Component, OnInit } from '@angular/core';
import {Ticket} from "../../../../entity/Ticket";
import {BookTicketsManagementService} from "../../../../service/employee/book-tickets-management.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-book-ticket-list',
  templateUrl: './book-ticket-list.component.html',
  styleUrls: ['./book-ticket-list.component.css']
})
export class BookTicketListComponent implements OnInit {
  optionSearch = 1;
  keySearch: any;
  bookedTicketList: Ticket[];
  bookedTicketListNoPage: Ticket[];
  indexPagination = 1;
  totalPagination: number;

  constructor(private bookTicketsManagementService: BookTicketsManagementService, private toast:ToastrService) { }

  ngOnInit(): void {
    this.getBookTicketList();
  }
  getBookTicketList(){
    this.bookTicketsManagementService.getAllBookTicketList(0).subscribe(data =>{
      if (data == null){
        this.bookedTicketList = [];
      }else {
        this.bookedTicketList = data;
        console.log(this.bookedTicketList);
      }
    });
  }

  search() {
    if (this.optionSearch == 1){
      this.bookTicketsManagementService.searchTicketByTicketId(this.keySearch).subscribe(data =>{
        if (data == null){
          this.toast.warning('Không tìm thấy!', 'Thông báo');
        }else {
          this.bookedTicketList = data.content;
        }
      });
    } else if (this.optionSearch == 2){
      this.bookTicketsManagementService.searchTicketByUserId(this.keySearch).subscribe(data =>{
        if (data == null){
          this.toast.warning('Không tìm thấy!', 'Thông báo');
        }else {
          this.bookedTicketList = data.content;
        }
      });
    } else if (this.optionSearch == 3){
      this.bookTicketsManagementService.searchTicketByIdCard(this.keySearch).subscribe(data =>{
        if (data == null){
          this.toast.warning('Không tìm thấy!', 'Thông báo');
        }else {
          this.bookedTicketList = data.content;
        }
      });
    } else if (this.optionSearch == 4){
      this.bookTicketsManagementService.searchTicketByPhone(this.keySearch).subscribe(data =>{
        if (data == null){
          this.toast.warning('Không tìm thấy!', 'Thông báo');
        }else {
          this.bookedTicketList = data.content;
        }
      });
    }
  }

  firstPage() {
    this.indexPagination = 1;
    this.getBookTicketList();
    if (this.indexPagination < this.totalPagination){
      this.toast.warning('Quá số trang tìm kiếm!', 'Thông báo');
    }
  }

  previousPage() {
    this.indexPagination = this.indexPagination - 1;
    if (this.indexPagination == 0){
      this.indexPagination = 1;
      this.getBookTicketList();
    }else {
      this.bookTicketsManagementService.getAllBookTicketList((this.indexPagination * 5) - 5).subscribe(data => {
        this.bookedTicketList = data;
      });
    }
  }

  nextPage() {
    this.indexPagination = this.indexPagination + 1;
    if (this.indexPagination > this.totalPagination) {
      this.indexPagination = this.indexPagination - 1;
      this.toast.warning('Quá số trang tìm kiếm!', 'Thông báo');
    }
    this.bookTicketsManagementService.getAllBookTicketList((this.indexPagination * 5) - 5).subscribe(data =>{
      this.bookedTicketList = data;
      if (data == null){
        this.toast.warning('Quá số trang tìm kiếm!', 'Thông báo');
      }
    });
  }

  lastPage() {
    // if (this.indexPagination < this.totalPagination) {
    //   this.indexPagination = (Math.floor(this.bookedTicketListNoPage.length / 5)) + 1;
    //   this.bookTicketsManagementService.getAllBookTicketList((this.indexPagination * 5) - 5).subscribe(data =>{
    //     this.bookedTicketList = data;
    //     if (data == null) {
    //       this.toast.warning('Quá số trang tìm kiếm !', 'Thông báo');
    //     }
    //   });
    // } else {
    //   this.firstPage();
    //   this.toast.warning('Quá số trang tìm kiếm !', 'Thông báo');
    // }
    let page = this.totalPagination - 1;
    this.bookTicketsManagementService.getAllBookTicketList(page).subscribe(data =>{
      this.bookedTicketList = data;
    })
  }

}
