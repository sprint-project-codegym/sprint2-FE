import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Category} from "../../entity/Category";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_CATEGORY_URL = "http://localhost:8080/api/category";

  constructor(private httpClient: HttpClient) {
  }

  getAllCategories(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.API_CATEGORY_URL);
  }
}
