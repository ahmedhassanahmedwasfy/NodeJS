import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../../security/seeds/user";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url = 'http://localhost:4000/api/user/profile';

  constructor(private http: HttpClient, private router: Router) { }

  viewProfile(userId): Observable<User> {
    return this.http.get<User>(this.url + userId);
  }


}
