import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import { User } from "../seeds/user";


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  url = 'http://localhost:4000/api/security/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  getUserById(userId): Observable<User> {
    return this.http.get<User>(this.url + '/view/' + userId);
  }

  deleteUser(userId) {
    return this.http.delete(this.url +'/delete/'+ userId);
  }

  editUser(user): Observable<User> {
    return this.http.post<User>(this.url +'/update', user);
  }

}




