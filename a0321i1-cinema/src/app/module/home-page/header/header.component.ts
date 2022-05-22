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
  functionList: any = [];
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
      this.user = this.tokenStore.getUser().user;
      this.role = this.tokenStore.getUser().authorities[0].authority;

      if(this.role=='ROLE_ADMIN'){
        this.functionList = [
          {
            name: 'Quản lý đặt vé',
            link: '/booking/movie'
          },
          {
            name: 'Quản lý phim',
            link: '/admin/movie/list-movie'
          },
          {
            name: 'Thống kê phim',
            link: '/admin/statistical/movie'
          },
          {
            name: 'Thống kê thành viên',
            link: '/admin/statistical/member'
          },
          {
            name: 'Đăng xuất',
            link: '/login'
          }
        ]
      }

      if(this.role=='ROLE_USER'){
        this.functionList = ['Đặt vé','Lịch sữ đặt vé','Thông tin cá nhân', 'Đăng xuất'];
      }

      console.log(this.functionList)
    }
  }
  search(keySearch: string) {
    console.log(keySearch);
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(["/search"], {queryParams: {q: keySearch}});
    });
  }

  logout() {
    this.tokenStore.signOut();
    this.router.navigateByUrl("/login");
  }
}
