import { Component, OnInit } from '@angular/core';
import {TokenStorageService} from "../../../../service/security/token-storage.service";
import {Router} from "@angular/router";
import {User} from '../../../../entity/User';
import {AccountManagementService} from '../../../../service/member/account-management.service';
import {Account} from '../../../../entity/Account';
import {UserService} from '../../../../service/security/user.service';

@Component({
  selector: 'app-nav-bar-account-manager',
  templateUrl: './nav-bar-account-manager.component.html',
  styleUrls: ['./nav-bar-account-manager.component.css']
})
export class NavBarAccountManagerComponent implements OnInit {

  constructor(private tokenStore: TokenStorageService,
              private router: Router,
              private accountService: AccountManagementService,
              private userService: UserService) { }
  username: string;
  account: Account;
  user: User;

  ngOnInit(): void {
    this.getAccount();
    this.getUser();
  }

  getAccount() {
    this.accountService.getAccountByUsername(this.tokenStore.getUser().user.account.username).subscribe(data => {
      this.account = data;
    });
  }

  logout() {
    this.tokenStore.signOut();
    this.router.navigateByUrl("/login");
  }
  getUser() {
    this.userService.getUserByUsername(this.tokenStore.getUser().user.account.username).subscribe(data => {
      this.user = data;
    })
  }
}

