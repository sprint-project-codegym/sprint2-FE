import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeRoutingModule} from './employee-routing.module';
import {EmployeePageComponent} from './employee-page/employee-page.component';
import {HomePageModule} from "../home-page/home-page.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [EmployeePageComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    HomePageModule,
    FormsModule
  ]
})
export class EmployeeModule {
}
