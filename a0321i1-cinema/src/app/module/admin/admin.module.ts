import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminPageComponent } from './admin-page/admin-page.component';
import {HttpClientModule} from '@angular/common/http';
import {HomePageModule} from "../home-page/home-page.module";


@NgModule({
  declarations: [AdminPageComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    HttpClientModule,
    HomePageModule,
  ]
})
export class AdminModule { }
