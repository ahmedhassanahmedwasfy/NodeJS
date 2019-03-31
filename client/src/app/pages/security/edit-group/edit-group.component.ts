import {Component, OnInit} from '@angular/core';
import {PermissionsService} from "../services/permissions.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Permission} from "../seeds/permission";
import {GroupsService} from "../services/groups.service";
import {NbLayoutDirectionService} from "@nebular/theme";
import {until} from "selenium-webdriver";
import titleContains = until.titleContains;
import { forkJoin } from 'rxjs';
import {NotificationService} from 'app/@core/services/notification.service';


@Component({
  selector: 'ngx-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.scss']
})
export class EditGroupComponent implements OnInit {
  sourcPermissions: any[];
  targetPermissions: any[];
  group: any = {permissions: []};

  constructor(private PermissionService: PermissionsService, private router: Router, private route: ActivatedRoute,
              private GroupService: GroupsService, private directionService: NbLayoutDirectionService,
              private notificationService: NotificationService) {}

  async ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    let res = await this.PermissionService.getPermissions().toPromise();
    this.sourcPermissions = res.data;
    if (id) {
      let _group = await this.GroupService.getGroupnById(id).toPromise();
      this.group = _group;
      this.group.permissions = this.sourcPermissions.filter(c => this.group.permissions.indexOf(c._id) !== -1);
      this.group.permissions.forEach(i => {
        for (let j = this.sourcPermissions.length - 1; j >= 0; j--) {
          if (this.sourcPermissions[j]._id == i._id) {
            this.sourcPermissions.splice(j, 1);
          }
        }
      })
    }
  }

  checkdir() {
    let checkdir = this.directionService.isLtr();
    return checkdir;

  }

  async saveEditGroup() {
    let g: any;
    if (this.group.permissions && this.group.permissions.length > 0) {
      g = Object.assign({}, this.group, {permissions: this.group.permissions.map(c => c._id)});


    } else {
      g = this.group;
    }
    await this.GroupService.editGroup(g).subscribe(()=>{
      this.notificationService.showToasterSuccess('groupsToasters.updateSucc','groupsToasters.successHeader');
      this.router.navigateByUrl('/pages/security/groups')
    });
  }

}
