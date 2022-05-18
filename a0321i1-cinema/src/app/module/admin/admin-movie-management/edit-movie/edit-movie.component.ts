import {Component, OnInit} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {Movie} from "../../../../entity/Movie";
import {DatePipe} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {MovieService} from "../../../../service/home-page/movie.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {NgxSpinnerService} from "ngx-spinner";
import {Category} from "../../../../entity/Category";
import {MovieDTO} from "../../../../entity/dto/movieDTO";
import {MovieManagementService} from "../../../../service/admin/movie-management.service";
import {ToastrService} from "ngx-toastr";
import {finalize} from "rxjs/operators";

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.css']
})
export class EditMovieComponent implements OnInit {
  public moviePatch: Movie = null;
  public listCategory: Category[];
  public movieId: number;
  public formEditMovie: FormGroup;
  public imagePoster = null;
  public selectedImage: any = null;
  public endDateCompare = '';
  public startDateCompare = '';
  public listMovieDTO: MovieDTO[] = [];
  public movie: Movie;
  private messageImageError: string;
  private image: any;
  public categoryList: number[] = [];

  constructor(
    private movieService: MovieManagementService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    public toast: ToastrService,
    private storage: AngularFireStorage
  ) {
  }

  ngOnInit(): void {
    this.movieId = this.activatedRoute.snapshot.params['movieId'];
    this.formEditMovie = new FormGroup({
      movieId: new FormControl(null),
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
    this.movieService.getMovieById(this.movieId).subscribe(movieDTO => {
      for (let i = 0; i < movieDTO.length; i++) {
        this.moviePatch = movieDTO[i].movie;
      }
      this.formEditMovie.controls.movieId.setValue(this.movieId);
      this.formEditMovie.controls.movieName.setValue(this.moviePatch.movieName);
      this.formEditMovie.controls.posterMovie.setValue(this.moviePatch.posterMovie);
      this.imagePoster = this.moviePatch.posterMovie;
      this.formEditMovie.controls.startDate.setValue(this.moviePatch.startDate);
      this.formEditMovie.controls.endDate.setValue(this.moviePatch.endDate);
      this.formEditMovie.controls.movieStudio.setValue(this.moviePatch.movieStudio);
      this.formEditMovie.controls.actor.setValue(this.moviePatch.actor);
      this.formEditMovie.controls.director.setValue(this.moviePatch.director);
      this.formEditMovie.controls.movieLength.setValue(this.moviePatch.movieLength);
      this.formEditMovie.controls.trailer.setValue(this.moviePatch.trailer);
      console.log(this.formEditMovie);
    });
    this.movieService.getCategory().subscribe(category => {
      this.listCategory = category;
    });
    console.log(this.categoryList);
  }
  submit() {
    this.endDateCompare = this.formEditMovie.value.endDate;
    this.startDateCompare = this.formEditMovie.value.startDate;
    if (this.endDateCompare < this.startDateCompare) {
      this.toast.error('Ngày bắt đầu phải nhỏ hơn ngày kết thúc');
      // tslint:disable-next-line:triple-equals
    } else if (this.startDateCompare == this.endDateCompare) {
      this.toast.error('Ngày bắt đầu và  ngày kết thúc không được trùng nhau');
    } else {
      if (this.imagePoster !== this.formEditMovie.value.posterMovie) {
        const name = this.selectedImage.name;
        const stringImage = name.substring(name.length - 3).toLowerCase();
        if (stringImage === 'png' || stringImage === 'jpg') {
          const fileName = 'imageMovie/' + name;
          const fileRef = this.storage.ref(fileName);
          this.storage.upload(fileName, this.selectedImage).snapshotChanges().pipe(
            finalize(() => {
              fileRef.getDownloadURL().subscribe((url) => {
                  this.formEditMovie.value.posterMovie = url;
                  console.log(this.formEditMovie.value);
                  if (this.categoryList.length > 0) {
                    // tslint:disable-next-line:prefer-for-of
                    for (let i = 0; i < this.categoryList.length; i++) {
                      const movieDTO: MovieDTO = {
                        movie: this.formEditMovie.value,
                        categoryId: this.categoryList[i]
                      };
                      this.listMovieDTO.push(movieDTO);
                    }
                    console.log(this.listMovieDTO);
                    this.movieService.formEditMovie(this.listMovieDTO).subscribe(data => {
                      this.toast.success('Sửa thành công!');
                      this.router.navigate(['/admin/movie/movie-list']);
                    });
                  }
                }
              );
            })).subscribe();
        }
      } else {
        if (this.categoryList.length > 0) {
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0; i < this.categoryList.length; i++) {
            const movieDTO: MovieDTO = {
              movie: this.formEditMovie.value,
              categoryId: this.categoryList[i]
            };
            this.listMovieDTO.push(movieDTO);
          }
          console.log(this.listMovieDTO);
          this.movieService.formEditMovie(this.listMovieDTO).subscribe(data => {
            this.toast.success('Sửa thành công!');
            this.router.navigate(['/admin/movie/movie-list']);
          });
        }
      }
    }
  }
  removeImage() {
    this.imagePoster = null;
    this.selectedImage = null;
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
        this.messageImageError = '*Tệp ảnh bạn chọn không hợp lệ!';
        this.selectedImage = null;
      }
    } else {
      this.selectedImage = null;
      this.messageImageError = '*Không được bỏ trống ảnh';
    }
  }
  selectCategory(categoryId: number) {
    if (this.categoryList.includes(categoryId)) {
      this.categoryList.splice(this.categoryList.indexOf(categoryId), 1);
    } else {
      this.categoryList.push(categoryId);
    }
  }
}
