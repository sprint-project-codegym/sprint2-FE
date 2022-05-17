import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountInfoComponent} from './account-management/account-info/account-info.component';
import {TransactionHistoryComponent} from './account-management/transaction-history/transaction-history.component';
import {TicketsBookingComponent} from './account-management/tickets-booking/tickets-booking.component';

const routes: Routes = [
  {
    path: 'info',
    component: AccountInfoComponent
  },
  {
    path: 'history',
    component: TransactionHistoryComponent
  },
  {
    path: 'booking',
    component: TicketsBookingComponent
  },
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {
}
