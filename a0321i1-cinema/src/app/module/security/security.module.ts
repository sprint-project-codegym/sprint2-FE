import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ConfirmEmailComponent} from './confirm-email/confirm-email.component';
import {LoginGoogleComponent} from './login-google/login-google.component';
import {LoginComponent} from './login/login.component';
import {LogoutComponent} from './logout/logout.component';
import {RegisterComponent} from './register/register.component';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [ConfirmEmailComponent, LoginGoogleComponent, LoginComponent, LogoutComponent, RegisterComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule
    ]
})
export class SecurityModule {
}
