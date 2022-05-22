import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HomePageRoutingModule} from './home-page-routing.module';
import {DetailMovieComponent} from './detail-movie/detail-movie.component';
import {ContentComponent} from './content/content.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import {ContentPageComponent} from './content-page/content-page.component';
import {SearchComponent} from './search/search.component';
import {TrailerComponent} from './trailer/trailer.component';
import {MatDialogModule} from '@angular/material/dialog';
import {RouterModule} from '@angular/router';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    DetailMovieComponent,
    ContentComponent,
    FooterComponent,
    HeaderComponent,
    ContentPageComponent,
    SearchComponent,
    TrailerComponent
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    MatDialogModule,
    RouterModule
  ],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    MatDialogModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class HomePageModule {
}
