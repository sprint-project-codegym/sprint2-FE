import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminMovieManagementRoutingModule} from './admin-movie-management-routing.module';
import {AddMovieComponent} from './add-movie/add-movie.component';
import {EditMovieComponent} from './edit-movie/edit-movie.component';
import {ListMovieComponent} from './list-movie/list-movie.component';
import {HttpClientModule} from '@angular/common/http';
import { DeleteMovieComponent } from './delete-movie/delete-movie.component';

@NgModule({
  declarations: [AddMovieComponent, EditMovieComponent, ListMovieComponent, DeleteMovieComponent],
  exports: [
    ListMovieComponent,
    EditMovieComponent,
    AddMovieComponent
  ],
  imports: [
    CommonModule,
    AdminMovieManagementRoutingModule,
    HttpClientModule
  ]
})
export class AdminMovieManagementModule {
}
