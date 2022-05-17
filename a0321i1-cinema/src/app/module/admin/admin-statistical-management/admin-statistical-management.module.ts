import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminStatisticalManagementRoutingModule} from './admin-statistical-management-routing.module';
import {MemberStatisticsComponent} from './member-statistics/member-statistics.component';
import {MovieStatisticsComponent} from './movie-statistics/movie-statistics.component';
import {RouterModule} from '@angular/router';


@NgModule({
  declarations: [MemberStatisticsComponent, MovieStatisticsComponent],
  imports: [
    CommonModule,
    AdminStatisticalManagementRoutingModule,
    RouterModule
  ]
})
export class AdminStatisticalManagementModule {
}
