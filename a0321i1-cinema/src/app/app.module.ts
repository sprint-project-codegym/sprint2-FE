import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {DatePipe} from '@angular/common';
import {LoadingComponent} from './module/loading/loading.component';
import {HttpClientModule} from '@angular/common/http';
import {AdminModule} from './module/admin/admin.module';
import {BookingModule} from './module/booking/booking.module';
import {EmployeeModule} from './module/employee/employee.module';
import {HomePageModule} from './module/home-page/home-page.module';
import {MemberModule} from './module/member/member.module';
import {SecurityModule} from './module/security/security.module';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomePageModule,
    AdminModule,
    BookingModule,
    EmployeeModule,
    MemberModule,
    SecurityModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
