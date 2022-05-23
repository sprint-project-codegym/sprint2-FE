import {Component, OnInit} from '@angular/core';
import {User} from "../../../../entity/User";
import {UserService} from "../../../../service/security/user.service";
import {Router} from "@angular/router";
import {MemberManagementService} from "../../../../service/employee/member-management.service";
import {UserDto} from "../../../../dto/user-dto";

@Component({
  selector: 'app-employee-list-member',
  templateUrl: './employee-list-member.component.html',
  styleUrls: ['./employee-list-member.component.css']
})
export class EmployeeListMemberComponent implements OnInit {
  users: User[];
  size = 5;
  pageClicked = 0;
  totalPages = 1;
  pages = [];
  name = "";
  valueSearch = '1';
  idCard = "";
  phone = "";

  constructor(private memberService: MemberManagementService, private router: Router) {
  }

  ngOnInit(): void {
    this.onSubmit(0);

  }

  onSubmit(page) {
    this.memberService.getAllUser(page, this.size).subscribe(
      data => {
        this.users = data['content'];
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
      }
    );
  }

  search(page: number, name: string, idCard: string, phone: string) {
    console.log(page);
    if (name !== undefined && idCard !== undefined && phone !== undefined) {
      this.name = name;
      this.idCard = idCard;
      this.phone = phone;
    }
    this.memberService.searchUser(this.name, this.idCard, this.phone, page).subscribe(
      data => {
        if (data === null) {
          this.users = [];
        } else {
          this.users = data['content'];
          this.pageClicked = page;
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      }
    );
  }

  onFirst() {
    this.pageClicked = 0;
    // @ts-ignore
    this.search(this.pageClicked);
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      // @ts-ignore
      this.search(this.pageClicked);
    }
  }

  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      // @ts-ignore
      this.search(this.pageClicked);
    }
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    // @ts-ignore
    this.search(this.pageClicked);
  }

  selectOption(value: any) {
    this.valueSearch = value;
    console.log(this.valueSearch);
  }

  onSearch(value: string) {
    if (this.valueSearch === '1') {
      this.search(0, value, "", "");
    }
    if (this.valueSearch === '2') {
      this.search(0, "", value, "");
    }
    if (this.valueSearch === '3') {
      this.search(0, "", "", value);
    }
  }
}
