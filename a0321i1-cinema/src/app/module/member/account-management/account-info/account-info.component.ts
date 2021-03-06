import {Component, OnInit} from '@angular/core';
import {Account} from '../../../../entity/Account';
import {User} from '../../../../entity/User';
import {AccountManagementService} from '../../../../service/member/account-management.service';
import {UserService} from '../../../../service/security/user.service';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AccountDTO} from '../../../../dto/AccountDTO';
import {ToastrService} from 'ngx-toastr';
import {Router} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {TokenStorageService} from '../../../../service/security/token-storage.service';

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
    private router: Router,
    private spinner: NgxSpinnerService,
    private tokenStorageService: TokenStorageService
  ) {
  }

  ngOnInit(): void {
    this.getAccount();
    this.getUser();
    this.initForm();
    this.initFormPassword();
  }

  getAccount() {
    this.accountService.getAccountByUsername(this.tokenStorageService.getUser().user.account.username).subscribe(data => {
      this.account = data;
    });

  }

  getUser() {
    this.userService.getUserByUsername(this.tokenStorageService.getUser().user.account.username).subscribe(data => {
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
    // console.log(this.rfEditForm.value);
    this.user.name = this.rfEditForm.value.name;
    this.user.birthday = this.rfEditForm.value.birthday;
    this.user.gender = this.rfEditForm.value.gender;
    this.user.email = this.rfEditForm.value.email;
    this.user.idCard = this.rfEditForm.value.idCard;
    this.user.phone = this.rfEditForm.value.phone;
    console.log(this.user);
    this.userService.editUser(this.user).subscribe(data => {
      this.user = data;
      this.router.navigateByUrl('/member/info').then(
        r => this.toastr.success('Ch???nh th??ng tin th??nh c??ng!', 'Th??ng b??o! ', {
          timeOut: 2000,
          progressBar: true,
          progressAnimation: 'increasing'
        }));
    });
  }

  initFormPassword() {
    this.rfPasswordForm = this.fb.group({
      oldPassword: ['', [Validators.required]],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmNewPassword: ['', [Validators.required, this.comparePassword, Validators.minLength(6)]]
    }, {validators: this.comparePassword});
  }

  comparePassword(c: AbstractControl) {
    const value = c.value;
    return (value.newPassword === value.confirmNewPassword) ? null : {passwordNotMatch: true};
  }

  onSubmitPass() {
    if (this.rfPasswordForm.value.newPassword !== this.rfPasswordForm.value.confirmNewPassword) {
      this.toastr.error('M???t kh???u v?? x??c nh???n m???t kh???u kh??ng kh???p!', 'Th??ng b??o!');
    } else {
      this.accountDTO = new AccountDTO(this.tokenStorageService.getUser().user.account.username, this.rfPasswordForm.value.oldPassword, this.rfPasswordForm.value.newPassword);
      console.log(this.accountDTO);
      this.accountService.setNewPassword(this.accountDTO).subscribe(data => {
        this.toastr.success('?????i m???t kh???u th??nh c??ng!', 'Th??ng b??o!');
      }, error => {
        this.toastr.error('M???t kh???u c?? kh??ng kh???p!', 'Th??ng b??o!');
      });
    }
  }
}
