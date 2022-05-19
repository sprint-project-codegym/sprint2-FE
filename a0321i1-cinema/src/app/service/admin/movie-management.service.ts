import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Movie} from "../../dto/Movie";
import {MovieDTO} from "../../entity/dto/movieDTO";

@Injectable({
  providedIn: 'root'
})
export class MovieManagementService {
  httpOptions: any;
  public baseUrl = 'http://localhost:8080/api/movie';
  public categoryUrl = 'http://localhost:8080/api';
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({}),
      'Access-Control-Allow-Origin': 'http://localhost:4200',
      'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
    };
  }
  public formEditMovie(listMovieDTO: MovieDTO[]): Observable<Movie>{
    return this.http.put<any>(this.baseUrl + '/edit_movie', listMovieDTO);
  }

  public formAddMovie(listMovieDTO: MovieDTO[]): Observable<Movie>{
    return this.http.post<any>(this.baseUrl + '/create', listMovieDTO);
  }

  public getCategory(): Observable<any>{
    return this.http.get<any>(this.categoryUrl + '/category');
  }

  // public getAllMovie(page: number): Observable<any>{
  //   return this.http.get<any>(this.baseUrl + '/movie_ava?page=' + page);
  // }

  public deleteMovie(id: number): Observable<any>{
    return this.http.put(this.baseUrl + '/set_status/' + id, this.httpOptions);
  }

  public getMovieById(movieId: number): Observable<any>{
    return this.http.get(this.baseUrl + '/movie_id/' + movieId)
  }

  // createMovie(movie: Movie): Observable<Movie> {
  //   return this.httpClient.post<Movie>(this.baseUrl + '/movie/create', JSON.stringify(movie), this.httpOptions);
  // }
  // public getCategory(): Observable<any>{
  //   return this.httpClient.get<any>(this.baseUrl + '/category');
  // }
  public MOVIE_API = 'http://localhost:8080/api/movie/manage';

  getAllMovie(page: number, size: number): Observable<any> {
    return this.http.get(this.MOVIE_API + '/list' + '?page=' + page + '&size=' + size);
  }


  searchMovie(nameInput: any, studioInput: any, page: number): Observable<any> {
    return this.http.get(this.MOVIE_API + '/list' + '?name=' + nameInput + '&studio=' + studioInput + '&page=' + page);
  }

  deleteMovieById(deleteId: string) {
    return this.http.delete(this.MOVIE_API + '/delete/' + deleteId);
  }
}
