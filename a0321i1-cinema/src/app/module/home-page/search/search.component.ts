import {Component, OnInit} from '@angular/core';
import {Movie} from "../../../entity/Movie";
import {Category} from "../../../entity/Category";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ShowTime} from "../../../entity/ShowTime";
import {MovieService} from "../../../service/home-page/movie.service";
import {CategoryService} from "../../../service/home-page/category.service";
import {ShowtimeService} from "../../../service/home-page/showtime.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  page: number = 0;
  size: number = 8;

  isAdvancedSearch: boolean = false;
  displayLoadMore: boolean = true;
  resultMovies: Movie[] = [];
  categories: Category[] = [];
  showTimes: ShowTime[] = [];

  keySearch: string = '';
  searchForm: FormGroup;

  constructor(
    private movieService: MovieService,
    private categoryService: CategoryService,
    private showtimeService: ShowtimeService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById("header-search-input")).value = '';
    let key = this.activatedRoute.snapshot.queryParams['q'];
    if (key) {
      this.keySearch = key;
    }
    this.initForm();
    this.initData();
    this.search();
  }

  initForm() {
    this.searchForm = this.formBuilder.group({
      keySearch: [this.keySearch],
      category: [''],
      date: [''],
      time: ['']
    })
  }

  initData() {
    this.categoryService.getAllCategories().subscribe(data => {
      this.categories = data;
    })
    this.showtimeService.getAllShowtimes().subscribe(data => {
      this.showTimes = data;
    })

  }

  search() {
    this.reset();
    this.movieService.searchByTitleContaining(this.keySearch, this.page, this.size).subscribe(data => {
      console.log(data);
      this.resultMovies = data.content;
      this.getCategoriesString(this.resultMovies);
      if (this.page >= data.totalPages - 1) {
        this.displayLoadMore = false;
      }
    });
  }

  loadMoreSearchResult() {
    this.page++;
    if (this.isAdvancedSearch) {
      this.movieService.advancedSearch(this.searchForm.value, this.page, this.size).subscribe(data => {
        this.resultMovies = this.resultMovies.concat(data.content);
        this.getCategoriesString(this.resultMovies);
        if (this.page >= data.totalPages - 1) {
          this.displayLoadMore = false;
        }
      });
    } else {
      this.movieService.searchByTitleContaining(this.keySearch, this.page, this.size).subscribe(data => {
        this.resultMovies = this.resultMovies.concat(data.content);
        this.getCategoriesString(this.resultMovies);
        if (this.page >= data.totalPages - 1) {
          this.displayLoadMore = false;
        }
      })
    }
  }

  advancedSearch() {
    this.reset();
    this.movieService.advancedSearch(this.searchForm.value, this.page, this.size).subscribe(data => {
      this.resultMovies = data.content;
      this.getCategoriesString(this.resultMovies);
      if (this.page >= data.totalPages - 1) {
        this.displayLoadMore = false;
      }
      this.isAdvancedSearch = true;
    });
  }

  reset() {
    this.page = 0;
    this.displayLoadMore = true;
    this.isAdvancedSearch = false;
  }

  getCategoriesString(movies: Movie[]) {
    movies.map(movie => {
      let categories: string[] = [];
      movie.movieCategorySet.map(item => {
        categories.push(item.category.categoryName);
      });
      movie.categories = categories.join(", ");
    });
  }

}
