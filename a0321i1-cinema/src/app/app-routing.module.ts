import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './module/security/login/login.component';
import {LogoutComponent} from './module/security/logout/logout.component';
import {RegisterComponent} from './module/security/register/register.component';
import {ConfirmEmailComponent} from './module/security/confirm-email/confirm-email.component';
import {LoginGoogleComponent} from './module/security/login-google/login-google.component';
import {RequestResetPasswordComponent} from './module/security/request-reset-password/request-reset-password.component';
import {DoResetPasswordComponent} from './module/security/do-reset-password/do-reset-password.component';
import {TestComponent} from './module/security/test/test.component';
import {PageNotFoundComponent} from './module/page-not-found/page-not-found.component';
import {PageNotAllowAccessComponent} from './module/page-not-allow-access/page-not-allow-access.component';
import {ActiveAccountComponent} from './module/member/account-management/active-account/active-account.component';

const routes: Routes = [
  {
    path: 'home-page',
    loadChildren: () =>
      import('./module/home-page/home-page.module').then(
        (module) => module.HomePageModule
      ),
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./module/admin/admin.module').then(
        (module) => module.AdminModule
      ),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./module/employee/employee.module').then(
        (module) => module.EmployeeModule
      ),
  },
  {
    path: 'booking',
    loadChildren: () =>
      import('./module/booking/booking.module').then(
        (module) => module.BookingModule
      ),
  },
  {
    path: 'member',
    loadChildren: () =>
      import('./module/member/member.module').then(
        (module) => module.MemberModule
      ),
  },
  {path: 'login', component: LoginComponent},
  {path: 'request-to-reset-password', component: RequestResetPasswordComponent},
  {path: 'reset-password', component: DoResetPasswordComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'verification', component: ActiveAccountComponent},{path: 'home', redirectTo: '/'},
  {path: 'test', component: TestComponent},
  {path: '404', component: PageNotFoundComponent},
  {path: 'page-not-allow-access', component: PageNotAllowAccessComponent},
  {path: '**', redirectTo: '404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
