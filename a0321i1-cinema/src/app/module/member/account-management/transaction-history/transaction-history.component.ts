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
  p: any;

  constructor(
    private toastr: ToastrService,
    private accountService: AccountManagementService,
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.username = this.tokenStorageService.getUser().user.account.username;
    this.getAllTransaction();
  }

  onSubmit(status, start, end) {
    if (start.value === '') {
      this.start = '0001-01-01';
    } else {
      this.start = start.value;
    }
    if (end.value === '') {
      this.end = '9999-01-01';
    } else {
      this.end = end.value;
    }
    this.accountService.getTransactionHistory(this.username, this.status, this.start, this.end).subscribe(data => {
      if (data == null) {
        this.transactions = [];
        this.toastr.info('Không tìm thấy kết quả phù hợp', 'Thông báo', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing'
        });
      } else {
        this.transactions = data.content;
      }
    });
  }

  getAllTransaction() {
    this.accountService.getAllTransaction(this.username).subscribe(data => {
      if (data == null) {
        this.transactions = [];
      } else {
        this.transactions = data.content;
      }
    });
  }

  changeStatusTrue() {
    this.status = true;
  }

  changeStatusFalse() {
    this.status = false;
  }
}
