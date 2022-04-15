import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeMemberManagementRoutingModule } from './employee-member-management-routing.module';
import { EmployeeListMemberComponent } from './employee-list-member/employee-list-member.component';
import { EmployeeEditMemberComponent } from './employee-edit-member/employee-edit-member.component';


@NgModule({
  declarations: [EmployeeListMemberComponent, EmployeeEditMemberComponent],
  imports: [
    CommonModule,
    EmployeeMemberManagementRoutingModule
  ]
})
export class EmployeeMemberManagementModule { }
