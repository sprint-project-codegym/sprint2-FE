import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieSelectionComponent} from './movie-selection/movie-selection.component';
import {MovieSelectedComponent} from './movie-selected/movie-selected.component';
import {SeatSelectionComponent} from './seat-selection/seat-selection.component';
import {ConfirmBookingComponent} from './confirm-booking/confirm-booking.component';
import {BookingInformationComponent} from './booking-information/booking-information.component';


const routes: Routes = [
  {
    path: 'movie',
    component: MovieSelectionComponent
  },
  {
    path: 'movie/:id',
    component: MovieSelectedComponent
  },
  {
    path: 'seat',
    component: SeatSelectionComponent
  },
  {
    path: 'confirm',
    component: ConfirmBookingComponent
  },
  {
    path: 'information',
    component: BookingInformationComponent
  },
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookingRoutingModule {
}
