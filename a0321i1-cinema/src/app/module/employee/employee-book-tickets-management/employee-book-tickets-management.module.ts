import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeBookTicketsManagementRoutingModule } from './employee-book-tickets-management-routing.module';
import { BookTicketListComponent } from './book-ticket-list/book-ticket-list.component';
import { CancelTicketComponent } from './cancel-ticket/cancel-ticket.component';
import { ConfirmTicketComponent } from './confirm-ticket/confirm-ticket.component';
import { GetTicketComponent } from './get-ticket/get-ticket.component';
import { PrintTicketComponent } from './print-ticket/print-ticket.component';


@NgModule({
  declarations: [BookTicketListComponent, CancelTicketComponent, ConfirmTicketComponent, GetTicketComponent, PrintTicketComponent],
  imports: [
    CommonModule,
    EmployeeBookTicketsManagementRoutingModule
  ]
})
export class EmployeeBookTicketsManagementModule { }
