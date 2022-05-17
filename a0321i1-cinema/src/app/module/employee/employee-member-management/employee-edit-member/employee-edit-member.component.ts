import {Component, Inject, OnInit} from '@angular/core';
import {UserDto} from "../../../../dto/user-dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {UserService} from "../../../../service/security/user.service";
import {ToastrService} from "ngx-toastr";
import {NgxSpinnerService} from "ngx-spinner";
import {AngularFireStorage} from "@angular/fire/storage";
import {MemberManagementService} from "../../../../service/employee/member-management.service";
import {User} from "../../../../entity/User";
import {formatDate} from "@angular/common";
import {finalize} from "rxjs/operators";
import {Province} from "../../../../entity/Province";
import {District} from "../../../../entity/District";
import {Ward} from "../../../../entity/Ward";
import {assertNotNull} from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-employee-edit-member',
  templateUrl: './employee-edit-member.component.html',
  styleUrls: ['./employee-edit-member.component.css']
})
export class EmployeeEditMemberComponent implements OnInit {
  formEditUser: FormGroup;
  user: User;
  public wards: Ward[];
  public districts: District[];
  public provinces: Province[];
  public inputImage: any;
  public filePath;
  private uploading: boolean;
  public gender;
  public editId;
  public ward: Ward;
  public wardId1: number;
  public districtId: number;
  public provinceId: number;

  constructor(private activeRouter: ActivatedRoute,
              private memberService: MemberManagementService,
              private fb: FormBuilder,
              private router: Router,
              public toastrService: ToastrService,
              private spinner: NgxSpinnerService,
              @Inject(AngularFireStorage) private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.activeRouter.paramMap.subscribe(
      (param: ParamMap) => {
        const id = param.get('id');
        this.memberService.getUserById(parseInt(id)).subscribe(
          data => {
            this.user = data;
            this.filePath = this.user.avatarUrl;
            this.districtId = this.user.ward.district.districtId;
            this.provinceId = this.user.ward.district.province.provinceId;
            this.gender = this.user.gender;
            this.editId = this.user.userId;
            this.memberService.getDistrict(this.provinceId).subscribe(data => {
              this.districts = data;
            }, error => {
              console.log('Failed to get district list!');
            });
            this.memberService.getWard(this.districtId).subscribe(data => {
              this.wards = data;
            }, error => {
              console.log('Failed to get ward list!');
            });
            this.formEditUser.patchValue(this.user);
          }
        );
      }
    );
    this.memberService.getProvince().subscribe(data => {
      this.provinces = data;
    }, error => {
      console.log('Failed to get province list!');
    });
    this.initEditForm();
  }

  initEditForm() {
    this.formEditUser = this.fb.group({
      userId: [''],
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
      gender: [1, [Validators.required, Validators.min(0), Validators.pattern('^[\\.0-9]*$')]],
      avatarUrl: [''],
      birthday: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      idCard: ['', [Validators.required, Validators.pattern('(^\\d{9}$)|(^\\d{12}$)')]],
      phone: ['', [Validators.required, Validators.pattern('^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$')]],
      ward: ['', [Validators.required]],
    });
  }

  compareWard(ward1: Ward, ward2: Ward): boolean {
    return ward1 && ward2 ? ward1.wardId === ward2.wardId : ward1 === ward2;
  }

  onSubmit() {
    if (this.inputImage != null) {
      this.spinner.show();
      setTimeout(() => {
        /** spinner ends after 3 seconds */
        this.spinner.hide();
      }, 3000);
      this.uploading = true;
      const imageName = this.getCurrentDateTime() + this.inputImage.name;
      const fileRef = this.storage.ref(imageName);
      this.storage.upload(imageName, this.inputImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            this.formEditUser.patchValue({avatarUrl: url});
            console.log(this.formEditUser);
            this.memberService.updateUser(this.formEditUser.value, this.editId).subscribe(data => {
                this.router.navigateByUrl('employee/member/management/list');
                this.toastrService.success(
                  'Chỉnh sửa thành công!',
                  'Thông báo!',
                  {timeOut: 3000, extendedTimeOut: 1500}
                );
              },
              error => {
                this.toastrService.error(
                  'Không thể chỉnh sửa thành viên!',
                  'Có lỗi xảy ra',
                  {timeOut: 3000, extendedTimeOut: 1500}
                );
              }
            );
          });
        })
      ).subscribe();
    } else {
      this.memberService.updateUser(this.formEditUser.value, this.editId).subscribe(data => {
          this.router.navigateByUrl('/employee/member/management/list');
          this.toastrService.success(
            'Chỉnh sửa thành công!',
            'Thông báo!',
            {timeOut: 3000, extendedTimeOut: 1500}
          );
        },
        error => {
          this.toastrService.error(
            'Không thể chỉnh sửa thành viên!',
            'Có lỗi xảy ra',
            {timeOut: 3000, extendedTimeOut: 1500}
          );
        }
      );
    }
  }

  selectImage(event: any) {
    this.inputImage = event.target.files[0];
    this.formEditUser.get('avatarUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.filePath = reader.result as string;
    };
    reader.readAsDataURL(this.inputImage);
  }

  private getCurrentDateTime() {
    return formatDate(new Date(), 'dd-MM-yyyyhhmmssa', 'en-US');
  }

  refresh() {
    this.ngOnInit();
  }

  changeProvince(value: any) {
    const districtId = value.value;
    if (districtId) {
      this.memberService.getDistrict(districtId).subscribe(data => {
        this.districts = data;
        this.wards = null;
      });
    } else {
      this.districts = null;
      this.wards = null;
    }
  }

  changeDistrict(value: any) {
    const districtId = value.value;
    if (districtId) {
      this.memberService.getWard(districtId).subscribe(data => {
        this.wards = data;
      });
    } else {
      this.wards = null;
    }
  }
}
