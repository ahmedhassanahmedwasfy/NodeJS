import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { User } from '../seeds/user';
import {AppConfig} from "../../../@core/services/app-config.service";

@Injectable({
  providedIn: 'root',
})
export class UsersService {

  protected apiServer : any = AppConfig.settings.apiServer;
  url = `${this.apiServer.API_BASE_URL}/security/users`;

  constructor(private http: HttpClient) { }

  getUsers(): Observable<any> {
    return this.http.get(this.url);
  }

  getUserById(userId): Observable<User> {
    return this.http.get<User>(this.url + '/view/' + userId);
  }

  deleteUser(userId) {
    return this.http.delete(this.url + '/delete/' + userId);
  }

  editUser(user): Observable<User> {
    return this.http.post<User>(this.url + '/update', user);
  }

}




