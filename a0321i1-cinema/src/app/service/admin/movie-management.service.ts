import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieManagementService {

  public MOVIE_API = 'http://localhost:8080/api/movie/manage';

  constructor(
    public http: HttpClient
  ) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

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
