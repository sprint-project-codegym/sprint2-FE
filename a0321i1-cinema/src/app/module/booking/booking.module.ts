import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BookingRoutingModule} from './booking-routing.module';
import {BookingInformationComponent} from './booking-information/booking-information.component';
import {ConfirmBookingComponent} from './confirm-booking/confirm-booking.component';
import {MainBookingComponent} from './main-booking/main-booking.component';
import {MovieSelectedComponent} from './movie-selected/movie-selected.component';
import {MovieSelectionComponent} from './movie-selection/movie-selection.component';
import {SeatSelectionComponent} from './seat-selection/seat-selection.component';
import {HttpClientModule} from '@angular/common/http';
import {HomePageModule} from '../home-page/home-page.module';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [BookingInformationComponent, ConfirmBookingComponent, MainBookingComponent, MovieSelectedComponent, MovieSelectionComponent, SeatSelectionComponent],
    imports: [
        CommonModule,
        BookingRoutingModule,
        HttpClientModule,
        HomePageModule,
        FormsModule,
    ]
})
export class BookingModule {
}
