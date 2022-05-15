import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {SecurityService} from '../../../service/security/security.service';
import {User} from '../../../entity/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string = '';
  role: string = '';
  user: User;
  avatarUrl: string = "";
  name: string = "123";

  name1: string = "123";

  constructor(private router: Router,
              private tokenStore: TokenStorageService,
              private securityService: SecurityService) { }

  ngOnInit(): void {
    if (this.tokenStore.getToken()) {
      const user = this.tokenStore.getUser();
      console.log(user.user.name);
      this.name = user.user.name;
      console.log(this.name);
      this.securityService.isLoggedIn = true;
      console.log(this.securityService.isLoggedIn);
    }
    if (this.tokenStore.getToken()) {
      console.log(this.tokenStore.getUser().user.name);
      this.user = this.tokenStore.getUser().user;
      console.log(this.user);
      this.role = this.tokenStore.getUser().authorities[0].authority;
    }
  }

  logout() {
    this.tokenStore.signOut();
    this.router.navigateByUrl("/login");
  }
}
