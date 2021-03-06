import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminMovieManagementRoutingModule} from './admin-movie-management-routing.module';
import {AddMovieComponent} from './add-movie/add-movie.component';
import {EditMovieComponent} from './edit-movie/edit-movie.component';
import {ListMovieComponent} from './list-movie/list-movie.component';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ToastrModule} from "ngx-toastr";
import { DeleteMovieComponent } from './delete-movie/delete-movie.component';
import { SafePipe } from './safe.pipe';
import {HomePageModule} from "../../home-page/home-page.module";
import {AdminModule} from "../admin.module";

@NgModule({
  declarations: [AddMovieComponent, EditMovieComponent, ListMovieComponent, DeleteMovieComponent, SafePipe],
  exports: [
    ListMovieComponent,
    EditMovieComponent,
    AddMovieComponent
  ],
  imports: [
    CommonModule,
    AdminMovieManagementRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    ToastrModule.forRoot(),
    HomePageModule,
    AdminModule
  ]
})
export class AdminMovieManagementModule {
}
