import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/security/auth.service';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';
import * as CryptoJS from 'crypto-js';
import {SecurityService} from '../../../service/security/security.service';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class RequestResetPasswordComponent implements OnInit, AfterViewInit {

  userForm:FormGroup;
  @ViewChild("submitButton", {read: ElementRef}) submitButton: ElementRef;
  @ViewChild("getCodeSpan", {read: ElementRef}) getCodeSpan: ElementRef;

  isDisable: any;
  remainingTime: number = 0;
  seconds = 60;
  private intervalId = 0;

  constructor(
              private securityService: SecurityService,
              private tokenStorageService: TokenStorageService,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: ['',[Validators.required]],
      verifyCode: ['',[Validators.required]],
    })
  }


  getCode() {
    if(this.userForm.value.email==''){
      this.toastrService.error("Vui lòng nhập email", "Thông báo", {progressBar: true})
      return;
    }
    this.reset();
    this.start();
    this.securityService.requestResetPassword(this.userForm.value.email).subscribe(
      data => {
        this.submitButton.nativeElement.classList.remove("spinner-border");
        // this.submitButton.nativeElement.textContent = "Gữi";
        this.isDisable = false;
        this.toastrService.success("Đã gữi mã xác nhận, vui lòng kiểm tra email", "Thông báo", {progressBar: true});
        this.reset();
      },
      error => {
        console.log(error);
        this.toastrService.error("Tài khoản không tồn tại hoặc chưa được kích hoạt", "Lỗi", {progressBar: true});
        this.reset();
      }
    )
  }

  start(){
    this.countDown();
    if(this.remainingTime <= 0){
      this.remainingTime = this.seconds;
    }
  }

  stop(){
    this.clearTimer();
  }

  reset(){
    this.clearTimer();
    this.remainingTime = this.seconds;
    this.getCodeSpan.nativeElement.textContent = 'Lấy mã';
  }

  private countDown(){
    this.clearTimer();
    this.intervalId = window.setInterval(()=>{
      this.remainingTime -= 1;
      console.log(this.remainingTime);
      if(this.remainingTime === 0){
        this.clearTimer();
        this.getCodeSpan.nativeElement.textContent = 'Lấy mã';
      }else{
        this.getCodeSpan.nativeElement.textContent = this.remainingTime + ' s';
      }
    }, 1000);
  }

  clearTimer(){
    clearInterval(this.intervalId);
  }

  onSubmit() {
    if(this.userForm.valid){
      let verifyCode = this.userForm.value.verifyCode;
      this.securityService.checkVerificationCode(verifyCode).subscribe(
        (data) => {
          console.log(data);
          let code = CryptoJS.AES.encrypt(verifyCode, "A0321I1").toString();
          this.router.navigate(["/reset-password"],{queryParams: {code: code}});
        },
        error => {
          console.log(error);
          this.toastrService.error("Mã xác nhận không đúng", "Thông báo", {progressBar: true});
        }
      )
    } else {
      if(this.userForm.value.email=='')
        this.toastrService.warning("Vui lòng nhập email", "Thông báo", {progressBar: true});
      else
        this.toastrService.warning("Vui lòng mã xác nhận", "Thông báo", {progressBar: true});

    }
  }

  ngAfterViewInit(): void {

  }
}
