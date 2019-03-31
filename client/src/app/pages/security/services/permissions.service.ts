import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { Permission } from "../seeds/permission";


@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  url = 'http://localhost:4000/api/security/permissions';

  constructor(private http: HttpClient) {}

  getPermissions(): Observable<any> {
    return this.http.get(this.url)
  }

  getPermissionById(permissionId): Observable<Permission> {
    return this.http.get<Permission>(this.url + '/view/' + permissionId);
  }

  deletePermission(permissionId) {
    return this.http.delete(this.url +'/delete/'+ permissionId);
  }


  editPermission(permission: Permission): Observable<Permission> {
    return this.http.post<Permission>(this.url +'/update/', permission);
  }







}
