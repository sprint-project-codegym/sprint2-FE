import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginComponent} from './module/security/login/login.component';
import {LogoutComponent} from './module/security/logout/logout.component';
import {RegisterComponent} from './module/security/register/register.component';
import {ConfirmEmailComponent} from './module/security/confirm-email/confirm-email.component';
import {LoginGoogleComponent} from './module/security/login-google/login-google.component';

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
  {path: 'logout', component: LogoutComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'register/confirmEmail/:username/:email', component: ConfirmEmailComponent},
  {path: 'loginGoogle', component: LoginGoogleComponent},
  {path: 'home', redirectTo: '/'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
