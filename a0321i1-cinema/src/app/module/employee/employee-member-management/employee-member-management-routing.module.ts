import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {EmployeeEditMemberComponent} from './employee-edit-member/employee-edit-member.component';
import {EmployeeListMemberComponent} from './employee-list-member/employee-list-member.component';


const routes: Routes = [
  {
    path: 'list' , component : EmployeeListMemberComponent
  },
  {
    path: 'edit/:id' , component : EmployeeEditMemberComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeMemberManagementRoutingModule { }
