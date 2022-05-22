import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {SecurityService} from '../../../service/security/security.service';
import {User} from '../../../entity/User';
import {ShareService} from "../../../service/security/share.service";

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
              private securityService: SecurityService,
              private shareService: ShareService) {
    this.shareService.getClickEvent().subscribe(() => {
      this.loadHeader();
    });
  }

  loadHeader(){
    if (this.tokenStore.getToken()) {
      this.user = this.tokenStore.getUser().user;
      this.role = this.tokenStore.getUser().authorities[0].authority;

      if(this.role=='ROLE_ADMIN'){
        this.functionList = [
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
            link: '/logout'
          }
        ]
      }

      if(this.role=='ROLE_MEMBER'){
        this.functionList = [
          {
            name: 'Đặt vé',
            link: '/booking/movie'
          },
          {
            name: 'Thông tin cá nhân',
            link: '/member/info'
          },
          {
            name: 'Thông tin đặt vé',
            link: '/member/booking'
          },
          {
            name: 'Đăng xuất',
            link: '/logout'
          }
        ]
      }

      if(this.role=='ROLE_EMPLOYEE'){
        this.functionList = [
          {
            name: 'Quản lý đặt vé',
            link: '/employee/book/tickets/book-ticket-list'
          },
          {
            name: 'Đăng xuất',
            link: '/logout'
          }
        ]
      }

      console.log(this.functionList)
    }
  }

  ngOnInit(): void {
    this.loadHeader();
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
