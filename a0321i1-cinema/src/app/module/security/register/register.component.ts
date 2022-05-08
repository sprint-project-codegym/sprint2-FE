import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {User} from '../../../entity/User';
import {Ward} from '../../../entity/Ward';
import {Province} from '../../../entity/Province';
import {District} from '../../../entity/District';
import {SecurityService} from '../../../service/security/security.service';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {UserDTO} from '../../../dto/UserDTO';
import {formatDate, getLocaleDateFormat} from '@angular/common';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  textType = false;
  form: FormGroup;
  user: User[];
  wards: Ward[];
  provinces: Province[];
  districts: District[];
  listError: any = '';
  userDto: UserDTO;
  inputImage: any;
  filePath = '../../../assets/img/avatar.png';
  // defaultAvatar: string = 'https://firebasestorage.googleapis.com/v0/b/c1120g1.appspot.com' +
  //   '/o/SPRINT_02%2Fusers%2Favatar.png?alt=media&token=b54ffd5e-9a20-4110-a2e2-de839d8915a7';
  private defaultAvatar: 'bc.com';
  private uploading: boolean;
  private username: any;

  constructor(
    private formBuilder: FormBuilder,
    private securityService: SecurityService,
    private router: Router,
    private toastr: ToastrService,
    @Inject(AngularFireStorage) private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.securityService.getAllProvince().subscribe(
      data => {
        this.provinces = data;
      });
    this.form = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(30)]],
        password: ['', [Validators.required,
          Validators.minLength(6), Validators.maxLength(45)]],
        name: ['', [Validators.required]],
        email: ['', [Validators.required, Validators.email]],
        birthday: ['', [Validators.required]],
        gender: ['1'],
        idCard: ['', [Validators.required, Validators.pattern('(^\\d{9}$)|(^\\d{12}$)')]],
        phone: ['', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]],
        ward: ['', [Validators.required]],
        district: ['', [Validators.required]],
        province: ['', [Validators.required]],
        avatarUrl: [this.filePath],
      }
    );
  }

  saveUser(){
    this.securityService.createUserConfirmMail(this.form.value).subscribe(data => {
        this.router.navigateByUrl('/login');
        this.toastr.success(
          'Xác nhận email để kích hoạt tài khoản.',
          'Thông báo!',
          {timeOut: 2000, extendedTimeOut: 1500}
        );
      },
      error => {
        console.log(error);
        const errorsMessage = [];
        if (error.error.existAccount){errorsMessage.push(error.error.existAccount)}
        console.log(12)
        if (error.error.existIdCard){errorsMessage.push(error.error.existIdCard)}
        console.log(34)
        if (error.error.existEmail){errorsMessage.push(error.error.existEmail)}

        console.log(56)
        errorsMessage.forEach(errors =>
          this.toastr.error(
            errors,
            'Có lỗi xảy ra',
            {timeOut: 5000, extendedTimeOut: 1500}
          )
        );
      }
    );
  }

  submitForm() {
    console.log(11111)
    if (this.form.valid) {
      if(this.uploading) {
        const imageName = this.getCurrentDateTime() + this.inputImage.name;
        const fileRef = this.storage.ref(imageName);
        this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
              this.form.patchValue({avatarUrl: url});
              this.userDto = new UserDTO(this.form.value.avatarUrl, this.form.value.birthday, this.form.value.email,
                this.form.value.gender, this.form.value.idCard, this.form.value.name, this.form.value.phone,
                this.form.value.username, this.form.value.ward, this.form.value.password);
              // console.log(this.form.value);
              console.log(2222222)
                this.saveUser();
            });
          })
        ).subscribe();
      }
      else {
        console.log(3333333)
        this.userDto = new UserDTO(this.form.value.avatarUrl, this.form.value.birthday, this.form.value.email,
          this.form.value.gender, this.form.value.idCard, this.form.value.name, this.form.value.phone,
          this.form.value.username, this.form.value.ward, this.form.value.password);
        this.saveUser();
      }

    }
    // else {
    //   console.log('err');
    // }
  }

  getCurrentDateTime(): string {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  compareProvince(province1: Province, province2: Province): boolean {
    return province1 && province2 ? province1.provinceId === province2.provinceId : province1 === province2;
  }

  compareDistrict(district1: District, district2: District): boolean {
    return district1 && district2 ? district1.districtId === district2.districtId : district1 === district2;
  }

  compareWard(ward1: Ward, ward2: Ward): boolean {
    return ward1 && ward2 ? ward1.wardId === ward2.wardId : ward1 === ward2;
  }

  onChangeProvince(event) {
    const userProfile = this.form.controls['province'].value;
    const provinceId = userProfile.provinceId;
    if (provinceId) {
      this.securityService.getAllDistrictByProvinceId(provinceId).subscribe(data => {
        this.districts = data;
        this.wards = null;
      });
    } else {
      this.districts = null;
      this.wards = null;
    }
  }

  onChangeDistrict(event) {
    const userInfo = this.form.controls['district'].value;
    const districtId = userInfo.districtId;
    if (districtId) {
      this.securityService.getAllWardByDistrictId(districtId).subscribe(data => {
        this.wards = data;
      });
    } else {
      this.wards = null;
    }
  }

  selectImage(event: any) {
    this.inputImage = event.target.files[0];
    this.form.get('avatarUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.inputImage);
    this.uploading=true;
  }
}
