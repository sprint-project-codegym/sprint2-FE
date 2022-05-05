import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmEmailComponent} from './confirm-email/confirm-email.component';
import {LoginGoogleComponent} from './login-google/login-google.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RegisterComponent} from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ToastrModule} from 'ngx-toastr';
import { RequestResetPasswordComponent } from './request-reset-password/request-reset-password.component';
import { ConfirmVerificationCodeComponent } from './confirm-verification-code/confirm-verification-code.component';
import { DoResetPasswordComponent } from './do-reset-password/do-reset-password.component';
import {RouterModule} from '@angular/router';

@NgModule({
  declarations: [ConfirmEmailComponent, LoginGoogleComponent, LoginComponent, LogoutComponent, RegisterComponent, RequestResetPasswordComponent, ConfirmVerificationCodeComponent, DoResetPasswordComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule,

  ]
})
export class SecurityModule {
}
