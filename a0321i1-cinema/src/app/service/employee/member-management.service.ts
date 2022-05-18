import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {EMPTY, Observable} from "rxjs";
import {UserDto} from "../../dto/user-dto";
import {Ward} from "../../entity/Ward";
import {District} from "../../entity/District";
import {Province} from "../../entity/Province";

@Injectable({
  providedIn: 'root'
})
export class MemberManagementService {
  public MEMBER_API = 'http://localhost:8080/api/member/user';

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

  getAllUser(page: number, size: number): Observable<any> {
    return this.http.get(this.MEMBER_API + '/list' + '?page=' + page + '&size=' + size, this.httpOptions);
  }
  searchUser(name: string, idCard: string, phone: string, page: number): Observable<any> {
    return this.http.get(this.MEMBER_API + '/list' + '?name=' + name
      + '&idCard=' + idCard + '&phone=' + phone + '&page=' + page, this.httpOptions);
  }

  getUserById(id: number): Observable<any> {
    if (id == null) {
      return EMPTY;
    } else {
      return this.http.get(this.MEMBER_API + '/list/' + id, this.httpOptions);
    }
  }

  updateUser(userDto: UserDto, id: number): Observable<any> {
    return this.http.put(this.MEMBER_API + '/edit/' + id, JSON.stringify(userDto), this.httpOptions);
  }

  getWard(districtId: number): Observable<any> {
    return this.http.get(this.MEMBER_API + '/ward?districtId=' + districtId, this.httpOptions);
  }

  getDistrict(provinceId: number): Observable<any> {
    return this.http.get(this.MEMBER_API + '/district?provinceId=' + provinceId, this.httpOptions);
  }

  getProvince() : Observable<any> {
    return this.http.get(this.MEMBER_API + '/province')
  }
}
