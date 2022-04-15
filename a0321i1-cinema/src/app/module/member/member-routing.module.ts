import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MemberPageComponent} from './member-page/member-page.component';
import {AccountInfoComponent} from './account-management/account-info/account-info.component';
import {TransactionHistoryComponent} from './account-management/transaction-history/transaction-history.component';
import {TicketsBookingComponent} from './account-management/tickets-booking/tickets-booking.component';

const routes: Routes = [
  {
    path: 'member',
    component: MemberPageComponent,
    children: [
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
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MemberRoutingModule {
}
