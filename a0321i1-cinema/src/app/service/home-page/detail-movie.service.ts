import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Movie} from '../../entity/Movie';
import {MovieCategory} from '../../entity/MovieCategory';

@Injectable({
  providedIn: 'root'
})
export class DetailMovieService {
  private API = 'http://localhost:8080/api/movie';

  constructor(private httpClient: HttpClient) {
  }

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
  };

  getDetailById(id: string): Observable<Movie> {
    return this.httpClient.get<Movie>(this.API + '/detail/' + id, this.httpOptions);
  }
}
