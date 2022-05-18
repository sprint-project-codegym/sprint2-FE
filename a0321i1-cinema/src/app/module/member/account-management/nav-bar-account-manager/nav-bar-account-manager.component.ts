import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../../service/security/token-storage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar-account-manager',
  templateUrl: './nav-bar-account-manager.component.html',
  styleUrls: ['./nav-bar-account-manager.component.css']
})
export class NavBarAccountManagerComponent implements OnInit {

  constructor(private tokenStore: TokenStorageService,
              private router: Router) { }

  ngOnInit(): void {
  }

  logout() {
    this.tokenStore.signOut();
    this.router.navigateByUrl("/login");
  }
}
