import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  permissions: Array<string> = [];

  constructor() {}

  hasPermission(authGroup) {
    if (this.permissions && this.permissions.find(permission => {
      return permission === authGroup;
    })) {
      return true;
    }
    return false;
  }

 /* async initializePermissions() {
      // Call API to retrieve the list of actions this user is permitted to perform. (Details not provided here.)
      // In this case, the method returns a Promise, but it could have been implemented as an Observable
      await this.authorizationDataService.getPermissions()
        .then(permissions => {
          this.permissions = permissions;
        });
  }*/

  /*isAuthorized(allowedRoles: string[]): boolean {
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }*/
    // return allowedRoles.includes(decodeToken['role']);
}
