import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './Auth.service';
import {AuthorizationService} from './authorization.service';
import {ProfileService} from './profile.service';
import {GroupsService} from "../../pages/security/services/groups.service";
import {PermissionsService} from "../../pages/security/services/permissions.service";
import {Group} from "../../pages/security/seeds/group";
// import {permissionsEnums} from '../enums/permissions.enums'


@Injectable()
export class AuthGuardService implements CanActivate {

  currentUser: any = {};

  constructor(private authService: AuthService, private router: Router, private authorizationService: AuthorizationService,
              private profileService: ProfileService, private permissionsService: PermissionsService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        if (!this.authService.isLoggedIn()) {
          resolve(false);
          this.router.navigateByUrl('/auth/login');
          return;
        }

        let permission = route && route.data['permission'];
        if (permission) {
          this.profileService.getUserProfile().subscribe(res => {
              this.currentUser = res['user'];

              let permissionsIds = this.currentUser.permissions;
              let userGroups_Ids = this.currentUser.groups.map(c => c.permissions);
              permissionsIds.concat(userGroups_Ids);

              if (permissionsIds && permissionsIds.indexOf(permission) !== -1) resolve(true);


              else {
                resolve(false);
                this.router.navigateByUrl('/auth/login');
              }
            },
            err => {
              reject(err);
              this.router.navigateByUrl('/auth/login');

            });
        } else {
          resolve(true)
        }
      }
    );

  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {

        if (!this.authService.isLoggedIn()) {
          resolve(false);
          this.router.navigateByUrl('/auth/login');
          return;
        }

        let permission = route && route.data['permission'];
        if (permission) {
          this.profileService.getUserProfile().subscribe(res => {
              this.currentUser = res['user'];

              let permissionsIds = this.currentUser.permissions;
              let userGroups_Ids = this.currentUser.groups.map(c => c.permissions);
              permissionsIds= permissionsIds.concat(userGroups_Ids);

              if (permissionsIds && permissionsIds.indexOf(permission) !== -1) resolve(true);


              else {
                resolve(false);
                this.router.navigateByUrl('/auth/login');
              }
            },
            err => {
              reject(err);
              this.router.navigateByUrl('/auth/login');

            });
        } else {
          resolve(true)
        }
      }
    );
  }
}


/*  hasRequiredPermission(authGroup): Promise<boolean> | boolean {
    // If user’s permissions already retrieved from the API
    if (this.authorizationService.permissions) {
      if (authGroup) {
        return this.authorizationService.hasPermission(authGroup);
      } else {
        return this.authorizationService.hasPermission(null);
      }
    } else {
      // Otherwise, must request permissions from the API first
      const promise = new Promise<boolean>((resolve, reject) => {
        this.authorizationService.initializePermissions()
          .then(() => {
            if (authGroup) {
              resolve(this.authorizationService.hasPermission(authGroup));
            } else {
              resolve(this.authorizationService.hasPermission(null));
            }
          }).catch(() => {
          resolve(false);
        });
      });
      return promise;
    }
  }*/

