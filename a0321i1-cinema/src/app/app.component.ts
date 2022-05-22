import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'a0321i1-cinema';

  constructor(
    public activeRoute: ActivatedRoute,
    public toastrService: ToastrService
  ) {
  }


  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((param) => {
      if(param.paymentId){
        this.toastrService.success(
          'Thanh toán thành công, vui lòng kiểm tra email !',
          'Thông báo!',
          {timeOut: 3000, extendedTimeOut: 1500}
        );
      }
    })
  }
}
