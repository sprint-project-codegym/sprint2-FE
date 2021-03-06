import {Component, Inject, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {MovieManagementService} from "../../../../service/admin/movie-management.service";
import {NgxSpinnerService} from "ngx-spinner";
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from "rxjs/operators";
import {ToastrService} from "ngx-toastr";
import {Category} from "../../../../entity/Category";
import {MovieDTO} from "../../../../entity/dto/movieDTO";
import {MovieCreateDTO} from '../../../../dto/MovieCreateDTO';


@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  public imagePoster = null;
  public selectedImage: any = null;
  public endDateCompare = '';
  public startDateCompare = '';
  public formAddMovie: FormGroup;
  public listCategory: Category[];
  public categoryList = [];
  public createDTO: MovieCreateDTO;
  private messageImageError: string;

  constructor(private movieService: MovieManagementService,
              private formBuilder: FormBuilder,
              private router: Router,
              private toast: ToastrService,
              private spinner: NgxSpinnerService,
              private storage: AngularFireStorage) {
  }

  ngOnInit(): void {
    this.formAddMovie = new FormGroup({
      movieName: new FormControl('', [Validators.required]),
      posterMovie: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      movieStudio: new FormControl('', [Validators.required]),
      actor: new FormControl('', [Validators.required]),
      director: new FormControl('', [Validators.required]),
      movieLength: new FormControl('', [Validators.required]),
      trailer: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required])
    });

    this.movieService.getCategory().subscribe(category => {
      console.log(category);
      this.listCategory = category;
    });
  }

  submit(formAddMovie) {
    let movieCreate = this.formAddMovie.value;
    movieCreate["movieCategoryList"] = this.categoryList;
    console.log(movieCreate);
    console.log(this.formAddMovie.value);
    this.endDateCompare = this.formAddMovie.value.endDate;
    this.startDateCompare = this.formAddMovie.value.startDate;
    if (this.endDateCompare < this.startDateCompare) {
      this.toast.error('Ng??y b???t ?????u ph???i nh??? h??n ng??y k???t th??c');
      // tslint:disable-next-line:triple-equals
    } else if (this.startDateCompare == this.endDateCompare) {
      this.toast.error('Ng??y b???t ?????u v??  ng??y k???t th??c kh??ng ???????c tr??ng nhau');
    } else {
      const name = this.selectedImage.name;
      const stringImage = name.substring(name.length - 3).toLowerCase();
      if (stringImage === 'png' || stringImage === 'jpg') {
        const fileName = 'imageMovie/' + name;
        const fileRef = this.storage.ref(fileName);
        this.storage.upload(fileName, this.selectedImage).snapshotChanges().pipe(
          finalize(() => {
            fileRef.getDownloadURL().subscribe((url) => {
                this.formAddMovie.value.posterMovie = url;
                if (this.categoryList.length > 0) {
                  // tslint:disable-next-line:prefer-for-of
                  console.log(this.createDTO);
                  this.movieService.formAddMovie(movieCreate).subscribe(data => {
                    this.toast.success('Th??m m???i th??nh c??ng!');
                    this.router.navigate(['/admin/movie/movie-list']);
                  });
                }
              }
            );
          })).subscribe();
      }
    }
  }

  showImage(image) {
    if (image.target.files && image.target.files[0]) {
      const file = image.target.files[0].name;
      const path = file.substring(file.length - 3).toLowerCase();
      if (path === 'png' || path === 'jpg') {
        const reader = new FileReader();
        reader.onload = (e: any) => this.imagePoster = e.target.result;
        reader.readAsDataURL(image.target.files[0]);
        this.selectedImage = image.target.files[0];
        this.messageImageError = '';
      } else {
        this.imagePoster = null;
        this.messageImageError = '*T???p ???nh b???n ch???n kh??ng h???p l???!';
        this.selectedImage = null;
      }
    } else {
      this.selectedImage = null;
      this.messageImageError = '*Kh??ng ???????c b??? tr???ng ???nh';
    }
  }

  selectCategory(categoryId: number) {
    let index = this.categoryList.findIndex((element) => {
      return element.categoryId == categoryId;
    });
    if (index!=-1) {
      this.categoryList.splice(index, 1);
    } else {
      this.categoryList.push(
      {
        "categoryId": categoryId
      });
    }
  }

  removeImage() {
    this.imagePoster = null;
    this.selectedImage = null;
  }

  resetForm() {
    this.formAddMovie.reset();
    this.imagePoster = null;
    this.selectedImage = null;
  }
}
