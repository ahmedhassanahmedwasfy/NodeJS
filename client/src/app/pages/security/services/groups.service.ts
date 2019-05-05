import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Permission} from '../seeds/permission';
import {Group} from '../seeds/group';
import {AppConfig} from '../../../@core/services/app-config.service';

@Injectable({
  providedIn: 'root',
})
export class GroupsService {
  protected apiServer: any = AppConfig.settings.apiServer;
  url = `${this.apiServer.API_BASE_URL}/security/groups`;


  constructor(private http: HttpClient) { }

  getGroups(): Observable<any> {
    return this.http.get(this.url);
  }

  getGroupnById(groupId): Observable<Group> {
    return this.http.get<Group>(this.url + '/view/' + groupId);
  }

  deletGroup(groupId): Observable<number> {
    return this.http.delete<number>(this.url + '/delete/' + groupId);
  }

  editGroup(group: Group): Observable<Group> {
    return this.http.post<Group>(this.url + '/update/', group);
  }

}
