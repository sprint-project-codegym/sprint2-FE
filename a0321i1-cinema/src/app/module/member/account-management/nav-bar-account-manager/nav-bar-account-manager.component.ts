import {Component, OnInit} from '@angular/core';
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

  username: string;
  account: Account;
  user: User;

  constructor(
    private accountService: AccountManagementService,
    private userService: UserService
  ) {
  }

  ngOnInit(): void {
    this.getAccount();
    this.getUser();
  }

  getAccount() {
    this.accountService.getAccountByUsername('luan123').subscribe(data => {
      this.account = data;
    });
  }

  getUser() {
    this.userService.getUserByUsername('luan123').subscribe(data => {
      this.user = data;
    });
  }
}

