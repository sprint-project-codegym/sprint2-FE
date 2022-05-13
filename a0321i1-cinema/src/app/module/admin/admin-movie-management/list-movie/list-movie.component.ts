import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Movie} from '../../../../entity/Movie';
import {Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {MovieManagementService} from '../../../../service/admin/movie-management.service';


@Component({
  selector: 'app-list-movie',
  templateUrl: './list-movie.component.html',
  styleUrls: ['./list-movie.component.css']
})
export class ListMovieComponent implements OnInit {
  movies: Movie[] = [];
  size = 10;
  pageClicked = 0;
  totalPages = 1;
  pages = [];
  id: string;
  nameInput = '';
  studioInput = '';
  deleteId: number;
  deleteName: string;
  deleteStartDate: string;

  @Output()
  deleteComplete = new EventEmitter<boolean>();

  constructor(private movieManagementService: MovieManagementService, private  toastrService: ToastrService, private router: Router) {
  }

  ngOnInit(): void {
    this.onSubmit(0);
  }

  onFirst() {
    this.pageClicked = 0;
    // @ts-ignore
    this.search(this.pageClicked);
  }

  onPrevious() {
    if (this.pageClicked > 0) {
      this.pageClicked--;
      // @ts-ignore
      this.search(this.pageClicked);
    }
  }

  onSubmit(page) {
    this.movieManagementService.getAllMovie(page, this.size).subscribe(
      data => {
        this.movies = data.content;
        this.pageClicked = page;
        this.totalPages = data.totalPages;
        this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        console.log(this.movies);
      }
    );

  }
  onNext() {
    if (this.pageClicked < this.totalPages - 1) {
      this.pageClicked++;
      // @ts-ignore
      this.search(this.pageClicked);
    }
  }

  onLast() {
    this.pageClicked = this.totalPages - 1;
    // @ts-ignore
    this.search(this.pageClicked);
  }

  search(page: number, name, studio) {
    if (name !== undefined && studio !== undefined){
      this.nameInput = name.value;
      this.studioInput = studio.value;
    }
    this.movieManagementService.searchMovie(this.nameInput, this.studioInput, page).subscribe(
      data => {
        if (data === null) {
          this.movies = [];
        } else {
          this.movies = data.content;
          this.pageClicked = page;
          this.totalPages = data.totalPages;
          this.pages = Array.apply(null, {length: this.totalPages}).map(Number.call, Number);
        }
      }
    );
  }

  deleteSuccess() {
    this.ngOnInit();
  }

}
