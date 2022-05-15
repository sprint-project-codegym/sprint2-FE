import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../service/security/auth.service';
import {log} from 'util';
import {SecurityService} from '../../../service/security/security.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.securityService.test().subscribe(
      ()=> console.log("ok"),
      ()=> console.log("error")
    )
  }

}
