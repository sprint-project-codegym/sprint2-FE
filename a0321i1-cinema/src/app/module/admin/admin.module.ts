import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {AdminPageComponent} from './admin-page/admin-page.component';
import {HttpClientModule} from '@angular/common/http';
import {HomePageModule} from "../home-page/home-page.module";
import {MatDialogModule} from "@angular/material/dialog";
import {ToastrModule} from "ngx-toastr";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";


@NgModule({
    declarations: [AdminPageComponent],
    exports: [
        AdminPageComponent
    ],
    imports: [
        CommonModule,
        AdminRoutingModule,
        HttpClientModule,
        HomePageModule,
        MatDialogModule,
        ToastrModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class AdminModule {
}
