import { Component, OnInit } from '@angular/core';
import {PermissionsService} from "../services/permissions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {GroupsService} from "../services/groups.service";
import {UsersService} from "../services/users.service";
import {NbLayoutDirectionService} from "@nebular/theme";
import {ToastrService} from "ngx-toastr";
import {NotificationService} from "../../../@core/services/notification.service";

@Component({
  selector: 'ngx-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  sourcPermissions: any[];
  targetPermissions: any[];
  sourceGroups: any[];
  targetGroups: any[];
  user: any = {permissions: [], groups: []};


  constructor(private PermissionService: PermissionsService, private router: Router, private route: ActivatedRoute,
              private GroupService: GroupsService, private UserService: UsersService, private directionService: NbLayoutDirectionService,
              private toastr: ToastrService, private notificationService: NotificationService) {}

  async ngOnInit() {
    try {
      let id = this.route.snapshot.paramMap.get('id');
      let resp = await this.PermissionService.getPermissions().toPromise();
      let resg = await this.GroupService.getGroups().toPromise();
      this.sourcPermissions = resp.data;
      this.sourceGroups = resg.data;
      if (id) {
        let _user = await this.UserService.getUserById(id).toPromise();
        this.user = _user;
        console.log(this.user)
        this.user.permissions = this.sourcPermissions.filter(c => this.user.permissions.indexOf(c._id) !== -1);
        this.user.groups = this.sourceGroups.filter(c => this.user.groups.indexOf(c._id) !== -1);
        this.user.permissions.forEach(i => {
          for (let j =this.sourcPermissions.length-1; j >=0; j--) {
            if (this.sourcPermissions[j]._id == i._id) {
              this.sourcPermissions.splice(j, 1);
            }
          }
        })
        this.user.groups.forEach(i => {
          for (let j =this.sourceGroups.length-1; j >=0; j--) {
            if (this.sourceGroups[j]._id == i._id) {
              this.sourceGroups.splice(j, 1);
            }
          }
        })
      }

    } catch (e) {
      console.log(e)
    }
  }

  checkdir(){
    let checkdir = this.directionService.isLtr();
    return checkdir;
  }

  async saveEditUser() {
    let u: any;
    if (this.user.permissions && this.user.permissions.length > 0) {
      u = Object.assign({}, this.user, {permissions: this.user.permissions.map(c => c._id)}, {groups: this.user.groups.map(d => d._id)});


    } else {
      u = this.user;
    }
    await this.UserService.editUser(u).subscribe(()=>{
      this.notificationService.showToasterSuccess('usersToasters.updateSucc','usersToasters.successHeader');
      this.router.navigateByUrl('/pages/security/users')
    });
  }

}
