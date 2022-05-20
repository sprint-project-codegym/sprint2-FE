import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {AuthGuard} from '../../auth.guard';


const routes: Routes = [
      {
        path: 'movie',
        loadChildren: () => import('./admin-movie-management/admin-movie-management.module').then(module => module.AdminMovieManagementModule)
      },
      {
        path: 'statistical',
        loadChildren: () => import('./admin-statistical-management/admin-statistical-management.module').then(module => module.AdminStatisticalManagementModule)
      },
      {path: '', redirectTo: '', pathMatch: 'full'},
      {path: '**', redirectTo: '', pathMatch: 'full'},
  {

    path: 'movie',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./admin-movie-management/admin-movie-management.module').then(module => module.AdminMovieManagementModule)
  },
  {
    path: 'statistical',
    // tslint:disable-next-line:max-line-length
    loadChildren: () => import('./admin-statistical-management/admin-statistical-management.module').then(module => module.AdminStatisticalManagementModule)
  },
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
