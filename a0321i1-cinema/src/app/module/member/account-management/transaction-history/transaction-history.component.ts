import {Component, OnInit} from '@angular/core';
import {TransactionHistory} from '../../../../entity/TransactionHistory';
import {AccountManagementService} from '../../../../service/member/account-management.service';
import {ToastrService} from 'ngx-toastr';
import {TokenStorageService} from '../../../../service/security/token-storage.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {
  username;
  status = true;
  start: string;
  end: string;
  length: number;
  transactions: TransactionHistory[];
  pageClicked = 0;
  page = 0;
  totalPage = 1;
  pages = [];

  constructor(
    private toastr: ToastrService,
    private accountService: AccountManagementService,
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser().user.account.username;
    this.onSubmit('', '', '', 0);
  }

  onSubmit(status, start, end, page) {
    if (start.value === '' || start.value === undefined) {
      this.start = null;
    } else {
      this.start = start.value;
    }
    if (end.value === '' || end.value === undefined) {
      this.end = null;
    } else {
      this.end = end.value;
    }
    this.accountService.getTransactionHistory(this.username, this.status, this.start, this.end, page).subscribe(data => {
      if (data == null) {
        this.transactions = [];
        this.toastr.info('Không tìm thấy kết quả phù hợp', 'Thông báo', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
      } else {
        this.transactions = data.content;
        this.pageClicked = page;
        this.totalPage = data['totalPages'];
        this.pages = Array.apply(null, {length: this.totalPage}).map(Number.call, Number);
      }
    });
  }

  changeStatusTrue() {
    this.status = true;
  }

  changeStatusFalse() {
    this.status = false;
  }

  onNext(status: any, start: any, end: any){
    if (this.pageClicked < this.totalPage - 1) {
      this.pageClicked++;
      this.onSubmit(status, start, end, this.pageClicked);
    }
  }

  onPrevious(status: any, start: any, end: any) {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      this.onSubmit(status, start, end, this.pageClicked);
    }
  }

  onFirst(status: any, start: any, end: any) {
    this.pageClicked = 0;
    this.onSubmit(status, start, end, this.pageClicked);
  }

  onLast(status: any, start: any, end: any) {
    this.pageClicked = this.totalPage - 1;
    this.onSubmit(status, start, end, this.pageClicked);
  }
}
