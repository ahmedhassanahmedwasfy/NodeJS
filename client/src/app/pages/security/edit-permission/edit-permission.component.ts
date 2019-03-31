import {Component, OnInit} from '@angular/core';
import {PermissionsService} from "../services/permissions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NbLayoutDirectionService} from "@nebular/theme";
import { ToastrService } from 'ngx-toastr';
import {NotificationService} from "../../../@core/services/notification.service";

@Component({
  selector: 'ngx-edit-permission',
  templateUrl: './edit-permission.component.html',
  styleUrls: ['./edit-permission.component.scss']
})
export class EditPermissionComponent implements OnInit {
  permission: any = {};

  constructor(private permissionService: PermissionsService, private router: Router, private route: ActivatedRoute,
  private directionService: NbLayoutDirectionService, private toastr: ToastrService, private notificationService: NotificationService) {}

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    if(id) {
      await this.permissionService.getPermissionById(id).subscribe(res => {
        this.permission = res;
        console.log(this.permission)
      });
    }
  }

  async saveEditPermission() {
   await this.permissionService.editPermission(this.permission).subscribe(()=>{
     this.notificationService.showToasterSuccess('permissionsToasters.updateSucc','permissionsToasters.successHeader');
     this.router.navigateByUrl('/pages/security/permissions');
   });
}

}
