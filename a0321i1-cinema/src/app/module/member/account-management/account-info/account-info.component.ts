import {Component, OnInit} from '@angular/core';
import {Account} from '../../../../entity/Account';
import {User} from '../../../../entity/User';
import {AccountManagementService} from '../../../../service/member/account-management.service';
import {UserService} from '../../../../service/security/user.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountDTO} from '../../../../dto/AccountDTO';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';

@Component({
  selector: 'app-account-info',
  templateUrl: './account-info.component.html',
  styleUrls: ['./account-info.component.css']
})
export class AccountInfoComponent implements OnInit {

  username: string;
  account: Account;
  user: User;
  rfEditForm: FormGroup;
  rfPasswordForm: FormGroup;
  accountDTO: AccountDTO;

  constructor(
    private accountService: AccountManagementService,
    private userService: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.getAccount();
    this.getUser();
    this.initForm();
    this.initFormPassword();
  }

  getAccount() {
    this.accountService.getAccountByUsername('luan123').subscribe(data => {
      this.account = data;
    });
  }

  getUser() {
    this.userService.getUserByUsername('luan123').subscribe(data => {
      this.user = data;
      this.rfEditForm.patchValue(data);
    });
  }

  initForm() {
    this.rfEditForm = this.fb.group({
      name: ['', [Validators.required]],
      birthday: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      idCard: ['', [Validators.required, Validators.pattern('(^\\d{9}$)|(^\\d{12}$)')]],
      phone: ['', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]],
    });
  }

  onSubmit() {
    console.log(this.rfEditForm.value);
    this.user.name = this.rfEditForm.value.name;
    this.user.birthday = this.rfEditForm.value.birthday;
    this.user.gender = this.rfEditForm.value.gender;
    this.user.email = this.rfEditForm.value.email;
    this.user.idCard = this.rfEditForm.value.idCard;
    this.user.phone = this.rfEditForm.value.phone;
    this.userService.editUser(this.user).subscribe(data => {
      this.user = data;
      this.router.navigateByUrl('/member/info').then(
        r => this.toastr.success('Chỉnh thông tin thành công!', 'Thông báo! ', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing'
        }));
    });
  }

  initFormPassword() {
    this.rfPasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required, this.comparePassword]]
    }, {validators: this.comparePassword});
  }

  comparePassword(c: AbstractControl) {
    const value = c.value;
    return (value.newPassword === value.confirmNewPassword) ? null : {passwordNotMatch: true};
  }

  onSubmitPass() {
    if (this.rfPasswordForm.valid) {
      this.accountDTO = new AccountDTO('luan123', this.rfPasswordForm.value.oldPassword, this.rfPasswordForm.value.newPassword);
      console.log(this.accountDTO);
      this.accountService.setNewPassword(this.accountDTO).subscribe(data => {
        this.toastr.success('Đổi mật khẩu thành công!', 'Thông báo!');
      }, error => {
        this.toastr.error('Mật khẩu cũ không khớp!', 'Thông báo!');
      });
    } else {
      console.log('form sai');
    }
  }
}
