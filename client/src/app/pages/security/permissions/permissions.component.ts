import { Component, OnInit } from '@angular/core';
import {PermissionsService} from "../services/permissions.service";
import { Permission } from "../seeds/permission";
import {ActivatedRoute, Router} from "@angular/router";
import {NbLayoutDirectionService} from "@nebular/theme";
import {ToastrService} from "ngx-toastr";
import {NotificationService} from "../../../@core/services/notification.service";



@Component({
  selector: 'ngx-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  permissions: Permission[];

  constructor(private PermissionService: PermissionsService, private router: Router, private route: ActivatedRoute,
    private directionService: NbLayoutDirectionService, private toastr: ToastrService, private notificationService: NotificationService) {

  }

  ngOnInit() {
    this.PermissionService.getPermissions()
      .subscribe(res => {
        this.permissions = res.data;
      })
  }

  checkdir(){
    let checkdir = this.directionService.isLtr();
    return checkdir;

  }

  addPermission() {
    this.router.navigateByUrl('/pages/security/permissions/update');
    (err) => {
      console.error(err);
    };
  }

  editPermission(permissionId) {
    this.router.navigate(['/', { outlets: { 'edit-outlet': ['update', permissionId]} }]);
    (err) => {
      console.error(err);
    };
  }

  async deletePermission(permissionId) {
    await this.PermissionService.deletePermission(permissionId).subscribe(() => {
      this.notificationService.showToasterSuccess('permissionsToasters.deleteSucc','permissionsToasters.successHeader');
      this.ngOnInit();
    });
  }
}
