import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ShowTime} from "../../entity/ShowTime";

@Injectable({
  providedIn: 'root'
})
export class ShowtimeService {

  private API_SHOWTIME_URL = "http://localhost:8080/api/showTime";

  constructor(private httpClient: HttpClient) {
  }

  getAllShowtimes(): Observable<ShowTime[]> {
    return this.httpClient.get<ShowTime[]>(this.API_SHOWTIME_URL);
  }


}
