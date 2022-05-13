import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'a0321i1-cinema';

  constructor(
    public activeRoute: ActivatedRoute
  ) {
  }


  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((param) => {
      console.log(param.paymentId)
    })
  }
}
