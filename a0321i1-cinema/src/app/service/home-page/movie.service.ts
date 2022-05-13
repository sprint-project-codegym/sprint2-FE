import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../../entity/Movie";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private API_MOVIE_URL = "http://localhost:8080/api/movie";

  constructor(private httpClient: HttpClient) {
  }

  getOnShowingMovies(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_MOVIE_URL}/on-showing?page=${page}&size=${size}`);
  }

  getUpComingMovies(page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_MOVIE_URL}/up-coming?page=${page}&size=${size}`);
  }

  getTop3BySales(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.API_MOVIE_URL}/top-3`);
  }

  getPromotingMovies(): Observable<Movie[]> {
    return this.httpClient.get<Movie[]>(`${this.API_MOVIE_URL}/promoting`);
  }

  searchByTitleContaining(keySearch: string, page: number, size: number): Observable<any> {
    return this.httpClient.get<any>(`${this.API_MOVIE_URL}/search?q=${keySearch}&page=${page}&size=${size}`);
  }

  advancedSearch(form: any, page: number, size: number): Observable<any> {
    let categoryId = "";
    let showTimeId = "";
    if (form.category) {
      categoryId = form.category.categoryId;
    }
    if (form.time) {
      showTimeId = form.time.showTimeId;
    }
    let url = this.API_MOVIE_URL + "/advancedSearch?q=" + form.keySearch + "&categoryId=" + categoryId +
      "&date=" + form.date + "&showTimeId=" + showTimeId + "&page=" + page + "&size=" + size;

    console.log(url);
    return this.httpClient.get<any>(url);
  }
}
