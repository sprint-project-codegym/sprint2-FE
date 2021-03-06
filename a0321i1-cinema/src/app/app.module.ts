import {BrowserModule} from '@angular/platform-browser';
// @ts-ignore
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
  SocialAuthServiceConfig,
  SocialLoginModule
} from 'angularx-social-login';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {CommonModule, DatePipe} from '@angular/common';

import {LoadingComponent} from './module/loading/loading.component';
import {HttpClientModule} from '@angular/common/http';
import {AdminModule} from './module/admin/admin.module';
import {BookingModule} from './module/booking/booking.module';
import {EmployeeModule} from './module/employee/employee.module';
import {HomePageModule} from './module/home-page/home-page.module';
import {MemberModule} from './module/member/member.module';
import {SecurityModule} from './module/security/security.module';
import { BottomSheetNotifyComponent } from './util/bottom-sheet-notify/bottom-sheet-notify.component';
import { PageNotFoundComponent } from './module/page-not-found/page-not-found.component';
import { PageNotAllowAccessComponent } from './module/page-not-allow-access/page-not-allow-access.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';import {FormsModule, ReactiveFormsModule} from '@angular/forms';
// @ts-ignore
import {NgxPaginationModule} from 'ngx-pagination';
import {NgxSpinnerModule} from 'ngx-spinner';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from "ngx-toastr";

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    BottomSheetNotifyComponent,
    PageNotFoundComponent,
    PageNotAllowAccessComponent,
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule,
    NgxPaginationModule,
    HomePageModule,
    AdminModule,
    BookingModule,
    EmployeeModule,
    MemberModule,
    SecurityModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    ToastrModule.forRoot(
      {
        timeOut: 2000,
        progressBar: true,
        progressAnimation: "increasing"
      }
    ),
    NgxSpinnerModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [{
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '1084356133800-v2buv6d6jkqfpsgu3upagidrukfrbd3q.apps.googleusercontent.com'
          )
        }
        ,
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('773513383566893')
        }
      ]
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
