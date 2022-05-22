import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {FacebookLoginProvider, GoogleLoginProvider, SocialAuthService, SocialUser} from 'angularx-social-login';
import {AuthService} from '../../../service/security/auth.service';
import {TokenStorageService} from '../../../service/security/token-storage.service';
import {ShareService} from '../../../service/security/share.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SecurityService} from '../../../service/security/security.service';
import {LoginRequest} from '../../../dto/LoginRequest';
import {ToastrService} from 'ngx-toastr';
import {User} from '../../../entity/User';
import {UserSocial} from '../../../dto/userSocial';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm:FormGroup;
  username: String;
  role: String;
  loginRequest: LoginRequest;
  auth2: any;
  user: UserSocial;

  socialUser: SocialUser;
  userLogged: SocialUser;
  id: any;
  constructor(
    // private dialogRef: MatDialogRef<LoginComponent>,
    private tokenStorageService: TokenStorageService,
    private socialAuthService: SocialAuthService,
    private toastrService: ToastrService,
    private shareService: ShareService,
    private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: [],
      password: [],
      remember: false,
    });

    if(this.tokenStorageService.getUser()){
      this.securityService.isLoggedIn = true;
      this.role = this.tokenStorageService.getUser().roles;
      this.username = this.tokenStorageService.getUser().username;
    }
    if (this.tokenStorageService.getToken() != undefined) {
      const user = this.tokenStorageService.getUser();
      this.securityService.isLoggedIn = true;
      this.role = user.authorities[0].authority;
      this.username = user.username;
    }
  }

  signInWithGoogle(): void {
    console.log("login google ...");
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then(
      data => {
        console.log(data);
        this.socialUser = data;
        console.log(this.socialUser.idToken);
        this.securityService.google(this.socialUser.idToken).subscribe(
          res => {
            console.log(res);

            this.tokenStorageService.saveTokenSession(res.jwtToken);
            this.tokenStorageService.saveUserLocal(res);
            this.securityService.isLoggedIn = true;
            this.router.navigateByUrl("/home-page");
            this.shareService.sendClickEvent();

          },
          err => {
            console.log(err);
            this.logOut();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }
  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then(
      data => {
        this.socialUser = data;
        console.log(this.socialUser);
        this.securityService.facebook(this.socialUser.authToken).subscribe(
          res => {
            console.log(res);
            this.tokenStorageService.saveTokenSession(res.jwtToken);
            this.tokenStorageService.saveUserLocal(res);
            this.securityService.isLoggedIn = true;
            this.router.navigateByUrl("/home-page");
            this.shareService.sendClickEvent();

          },
          err => {
            console.log(err);
            this.logOut();
          }
        );
      }
    ).catch(
      err => {
        console.log(err);
      }
    );
  }

  get formUsername() {
    return this.userForm.get('username');
  }

  get formPassword() {
    return this.userForm.get('password');
  }


  onSubmit() {
    this.loginRequest = new LoginRequest(this.formUsername.value, this.formPassword.value);
    this.login(this.loginRequest);
  }

  private login(authLogin) {
    console.log(authLogin);
    this.securityService.login(authLogin).subscribe(
      data => {
        this.router.navigateByUrl("/home-page");
        this.shareService.sendClickEvent();
        this.toastrService.success(
          'Đăng nhập thành công!',
          'Thông báo!',
          {timeOut: 3000, extendedTimeOut: 1500}
        );
        console.log(data);
        if (this.userForm.value.remember) {
          console.log("remember: " + this.userForm.value.remember);
          this.tokenStorageService.saveTokenLocal(data.jwtToken);
          this.tokenStorageService.saveUserLocal(data);
        } else {
          this.tokenStorageService.saveTokenSession(data.jwtToken);
          this.tokenStorageService.saveUserLocal(data);
        }

      },
      error => {
        this.toastrService.error(
          'Tài khoản không tồn tại hoặc chưa được kích hoạt!',
          'Lỗi!',
          {timeOut: 3000, extendedTimeOut: 1500}
        );
      }
    )
  }


  clearStorage() {
    this.securityService.isLoggedIn = false;
    this.tokenStorageService.signOut();
  }

  logOut(): void {
    this.socialAuthService.signOut().then(
      data => {
        this.tokenStorageService.signOut();
        this.securityService.isLoggedIn = false;
      }
    );
  }
}
