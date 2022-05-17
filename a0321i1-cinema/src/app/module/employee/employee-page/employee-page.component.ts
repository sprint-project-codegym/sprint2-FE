import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-page',
  templateUrl: './employee-page.component.html',
  styleUrls: ['./employee-page.component.css']
})
export class EmployeePageComponent implements OnInit {
  activeOne: any;
  constructor() { }

  ngOnInit(): void {
  }

}
