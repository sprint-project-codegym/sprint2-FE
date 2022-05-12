import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../service/security/auth.service';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {ToastrService} from 'ngx-toastr';

@Component({
  selector: 'app-request-reset-password',
  templateUrl: './request-reset-password.component.html',
  styleUrls: ['./request-reset-password.component.css']
})
export class RequestResetPasswordComponent implements OnInit, AfterViewInit {

  userForm:FormGroup;
  @ViewChild("submitButton", {read: ElementRef}) submitButton: ElementRef;
  isDisable: any;
  constructor(
              private authService: AuthService,
              private tokenStorageService: TokenStorageService,
              private route: ActivatedRoute,
              private toastrService: ToastrService,
              private router: Router,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      email: []
    })
  }

  onSubmit() {
    if(this.userForm.valid){
      this.submitButton.nativeElement.classList.add("spinner-border");
      this.submitButton.nativeElement.textContent = "";
      this.isDisable = true;
      this.authService.requestResetPassword(this.userForm.value.email).subscribe(
        data => {
          this.submitButton.nativeElement.classList.remove("spinner-border");
          this.submitButton.nativeElement.textContent = "Gữi";
          this.isDisable = false;
          console.log(data);
          this.toastrService.success("Đã gữi mail xác nhận", "Thông báo", {progressBar: true})
        },
        error => {
          console.log(error);
          this.toastrService.error("Tài khoản không tồn tại hoặc chưa được kích hoạt", "Thông báo", {progressBar: true})
        }
      )
    }
  }

  ngAfterViewInit(): void {

  }
}
