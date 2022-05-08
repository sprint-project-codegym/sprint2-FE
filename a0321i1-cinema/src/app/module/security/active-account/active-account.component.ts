import { Component, OnInit } from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {SecurityService} from "../../../service/security/security.service";
import {Router, ActivatedRoute} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-active-account',
  templateUrl: './active-account.component.html',
  styleUrls: ['./active-account.component.css']
})
export class ActiveAccountComponent implements OnInit {

  constructor( private formBuilder: FormBuilder,
               private securityService: SecurityService,
               private router: Router,
               private route: ActivatedRoute,
               private toastr: ToastrService,) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(
      param => {
        console.log(param.code);
        this.securityService.verifyAccount(param.code).subscribe(
          ()=>console.log("account actived"),
          error => {
            console.log(error);
          }
        )
      }
    )
  }

}
