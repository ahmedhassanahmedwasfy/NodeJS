import { Component, OnInit } from '@angular/core';
import {GroupsService} from "../services/groups.service";
import { Group } from "../seeds/group";
import {Router} from "@angular/router";
import { Permission } from "../seeds/permission";
import {PermissionsService} from "../services/permissions.service";
import {NbLayoutDirectionService} from "@nebular/theme";
import {ToastrService} from "ngx-toastr";
import {NotificationService} from "../../../@core/services/notification.service";

@Component({
  selector: 'ngx-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  groups: Group[];
  group: Group;
  permissions: any[];

  constructor(private groupService: GroupsService, private permissionService: PermissionsService, private router: Router,
              private directionService: NbLayoutDirectionService, private toastr: ToastrService, private notificationService: NotificationService) {}

  ngOnInit() {
    this.groupService.getGroups()
      .subscribe(res => {
        this.groups = res.data;
      })
  }

  checkdir(){
    let checkdir = this.directionService.isLtr();
    return checkdir;

  }

  addGroup() {
    this.router.navigateByUrl ('/pages/security/groups/update');
    (err) => {
      console.error(err);
    };
  }

  editGroup(groupId) {
    this.router.navigate(['/', { outlets: { 'edit-outlet': ['update', groupId]} }]);
    (err) => {
      console.error(err);
    };
  }


 async  deleteGroup(groupId) {
  await  this.groupService.deletGroup(groupId).toPromise();
       this.notificationService.showToasterSuccess('groupsToasters.deleteSucc','groupsToasters.successHeader');
      this.ngOnInit();

  }
}




