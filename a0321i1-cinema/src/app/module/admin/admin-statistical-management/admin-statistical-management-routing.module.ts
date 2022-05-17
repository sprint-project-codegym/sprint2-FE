import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {MovieStatisticsComponent} from './movie-statistics/movie-statistics.component';
import {MemberStatisticsComponent} from './member-statistics/member-statistics.component';


const routes: Routes = [
  {path: 'movie', component: MovieStatisticsComponent},
  {path: 'member', component: MemberStatisticsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminStatisticalManagementRoutingModule {
}
