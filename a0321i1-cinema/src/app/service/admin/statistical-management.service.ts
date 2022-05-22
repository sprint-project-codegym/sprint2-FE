import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatisticalManagementService {

  private API_URL = 'http://localhost:8080/api/statistical';

  constructor(private _httpClient: HttpClient) { }

  getTopMovie(limit: number): Observable<any> {
    return this._httpClient.get<any>(`${this.API_URL}/movie-top?limit=${limit}`);
  }

  getTopMember(limit: number): Observable<any> {
    return this._httpClient.get<any>(`${this.API_URL}/member-top?limit=${limit}`);
  }
}
