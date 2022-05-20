import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminStatisticalManagementRoutingModule} from './admin-statistical-management-routing.module';
import {MemberStatisticsComponent} from './member-statistics/member-statistics.component';
import {MovieStatisticsComponent} from './movie-statistics/movie-statistics.component';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ChartModule} from 'primeng/chart';


@NgModule({
  declarations: [MemberStatisticsComponent, MovieStatisticsComponent],
  exports: [
    MovieStatisticsComponent,
    MemberStatisticsComponent
  ],
  imports: [
    CommonModule,
    AdminStatisticalManagementRoutingModule,
    RouterModule,
    ChartModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class AdminStatisticalManagementModule {

}
