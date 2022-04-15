import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {BookTicketListComponent} from './book-ticket-list/book-ticket-list.component';
import {GetTicketComponent} from './get-ticket/get-ticket.component';
import {ConfirmTicketComponent} from './confirm-ticket/confirm-ticket.component';
import {CancelTicketComponent} from './cancel-ticket/cancel-ticket.component';
import {PrintTicketComponent} from './print-ticket/print-ticket.component';


const routes: Routes = [
  {path: 'book-ticket-list', component: BookTicketListComponent},
  {path: 'book-ticket-list/get-ticket/:ticketId', component: GetTicketComponent},
  {path: 'book-ticket-list/get-ticket/confirm-ticket/:ticketId', component: ConfirmTicketComponent},
  {path: 'book-ticket-list/cancel-ticket/:ticketId', component: CancelTicketComponent},
  {path: 'book-ticket-list/get-ticket/print-ticket/:ticketId', component: PrintTicketComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeBookTicketsManagementRoutingModule {
}
