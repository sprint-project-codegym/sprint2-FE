import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../service/security/auth.service';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from '@angular/forms';
import * as CryptoJS from 'crypto-js';
import {SecurityService} from '../../../service/security/security.service';

function comparePassword(c: AbstractControl) {
  const v = c.value;
  return (v.password === v.confirmPassword) ? null : {
    passwordnotmatch: true
  };
}

@Component({
  selector: 'app-do-reset-password',
  templateUrl: './do-reset-password.component.html',
  styleUrls: ['./do-reset-password.component.css']
})
export class DoResetPasswordComponent implements OnInit {
  resetPasswordForm: FormGroup;
  encryptionKey: any = 'secret key string';
  verificationCode: any;

  constructor(private securityService: SecurityService,
              private tokenStorageService: TokenStorageService,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params.code);
      this.verificationCode = CryptoJS.AES.decrypt(params.code, "A0321I1").toString(CryptoJS.enc.Utf8);
      console.log(this.verificationCode);
      this.securityService.checkVerificationCode(this.verificationCode).subscribe(
        ()=> {

        },
        (error)=> {
          this.router.navigateByUrl("/");
        }
      )
    });

    this.resetPasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: [''],
      verificationCode: this.verificationCode
    }, {validator: comparePassword});
  }

  onSubmit() {
    if(this.resetPasswordForm.valid){
      console.log(this.resetPasswordForm.value);
      let confirmPassword = this.resetPasswordForm.value.confirmPassword;
      let verificationCode = this.resetPasswordForm.value.verificationCode;
      this.securityService.resetPassword(confirmPassword,verificationCode).subscribe(
        () => {
            this.toastrService.success("?????i m???t kh???u th??nh c??ng", "Th??ng b??o", {progressBar: true});
              this.router.navigateByUrl("/login");
            },
        error => {
              console.log(error);
          }
      );
    } else {
      console.log(this.resetPasswordForm.value.password.length);
      if(this.resetPasswordForm.value.password.length < 6)
        this.toastrService.error("M???t kh???u t???i thi???u 6 k?? t???", "L???i", {progressBar: true});
      else
        this.toastrService.error("M???t kh???u kh??ng kh???p", "L???i", {progressBar: true});
    }
  }
}
