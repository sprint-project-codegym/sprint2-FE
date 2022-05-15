import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {APP_BASE_HREF, DatePipe} from '@angular/common';
import {LoadingComponent} from './module/loading/loading.component';
import {HttpClientModule} from '@angular/common/http';
import {AdminModule} from './module/admin/admin.module';
import {BookingModule} from './module/booking/booking.module';
import {EmployeeModule} from './module/employee/employee.module';
import {HomePageModule} from './module/home-page/home-page.module';
import {MemberModule} from './module/member/member.module';
import {SecurityModule} from './module/security/security.module';
import {authInterceptorProviders} from './helpers/auth.interceptor';
import {JWT_OPTIONS, JwtHelperService} from '@auth0/angular-jwt';
import { BottomSheetNotifyComponent } from './util/bottom-sheet-notify/bottom-sheet-notify.component';
import { PageNotFoundComponent } from './module/page-not-found/page-not-found.component';
import { PageNotAllowAccessComponent } from './module/page-not-allow-access/page-not-allow-access.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';

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
    HomePageModule,
    AdminModule,
    BookingModule,
    EmployeeModule,
    MemberModule,
    SecurityModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
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
