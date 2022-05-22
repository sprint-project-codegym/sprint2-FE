import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {EmployeeMemberManagementRoutingModule} from './employee-member-management-routing.module';
import {EmployeeListMemberComponent} from './employee-list-member/employee-list-member.component';
import {EmployeeEditMemberComponent} from './employee-edit-member/employee-edit-member.component';
import {ToastrModule} from "ngx-toastr";
import {NgxSpinnerModule} from "ngx-spinner";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminModule} from "../../admin/admin.module";
import {HomePageModule} from "../../home-page/home-page.module";


@NgModule({
  declarations: [EmployeeListMemberComponent, EmployeeEditMemberComponent],
    imports: [
        CommonModule,
        EmployeeMemberManagementRoutingModule,
        NgxSpinnerModule,
        ReactiveFormsModule,
        FormsModule,
        AdminModule,
        HomePageModule,
    ]
})
export class EmployeeMemberManagementModule {
}
