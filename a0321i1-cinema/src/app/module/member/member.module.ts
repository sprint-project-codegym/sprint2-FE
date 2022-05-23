import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MemberRoutingModule} from './member-routing.module';
import {MemberPageComponent} from './member-page/member-page.component';
import {AccountInfoComponent} from './account-management/account-info/account-info.component';
import {NavBarAccountManagerComponent} from './account-management/nav-bar-account-manager/nav-bar-account-manager.component';
import {TicketCancelComponent} from './account-management/ticket-cancel/ticket-cancel.component';
import {TicketsBookingComponent} from './account-management/tickets-booking/tickets-booking.component';
import {TransactionHistoryComponent} from './account-management/transaction-history/transaction-history.component';
import {HttpClientModule} from '@angular/common/http';
import {HomePageModule} from '../home-page/home-page.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSpinnerModule} from 'ngx-spinner';


@NgModule({
    declarations: [MemberPageComponent, AccountInfoComponent, NavBarAccountManagerComponent, TicketCancelComponent, TicketsBookingComponent, TransactionHistoryComponent],
    exports: [
        AccountInfoComponent
    ],
    imports: [
        CommonModule,
        MemberRoutingModule,
        HttpClientModule,
        HomePageModule,
        ReactiveFormsModule,
        FormsModule,
        NgxPaginationModule,
        NgxSpinnerModule
    ]
})
export class MemberModule {
}
