import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ticket} from "../../../../entity/Ticket";
import {BookTicketsManagementService} from "../../../../service/employee/book-tickets-management.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-confirm-ticket',
  templateUrl: './confirm-ticket.component.html',
  styleUrls: ['./confirm-ticket.component.css']
})
export class ConfirmTicketComponent implements OnInit {

  @Input()
  receivedId: number;

  @Output()
  confirmComplete = new EventEmitter<boolean>();
  constructor(private bookTicketsManagementService: BookTicketsManagementService,
              private router: Router, private toast: ToastrService) { }

  ngOnInit(): void {
  }

  onReceive() {
    this.bookTicketsManagementService.confirmTicket(this.receivedId).subscribe(data => {
      document.getElementById('closeModal').click();
      this.confirmComplete.emit(true);
      this.toast.success("Nhận vé thành công","Thông báo");
      // @ts-ignore
      this.router.navigateByUrl(['/employee/book/tickets/book-ticket-list/']);
    }, error => {this.toast.success("Nhận vé không thành công","Thông báo");})
  }
}
