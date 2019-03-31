import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UsersService} from "../services/users.service";
import {Permission} from "../seeds/permission";
import {NbLayoutDirectionService} from "@nebular/theme";
import {ToastrService} from "ngx-toastr";
import {NotificationService} from "../../../@core/services/notification.service";

@Component({
  selector: 'ngx-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users: any[];


  constructor(private usersService: UsersService, private router: Router, private route: ActivatedRoute,
              private directionService: NbLayoutDirectionService, private toastr: ToastrService, private notificationService: NotificationService) { }

  ngOnInit() {
    this.usersService.getUsers()
      .subscribe(res => {
        this.users = res.data;
      })
  }

  addUser() {
    this.router.navigateByUrl('/pages/security/users/update');
    (err) => {
      console.error(err);
    };
  }

  checkdir(){
    let checkdir = this.directionService.isLtr();
    return checkdir;
  }

  editUser(userId) {
    this.router.navigate(['/', { outlets: { 'edit-outlet': ['update', userId]} }])
  }

  deleteUser(userId) {
    this.usersService.deleteUser(userId).subscribe(() => {
      this.notificationService.showToasterSuccess('usersToasters.deleteSucc','usersToasters.successHeader');
      this.ngOnInit();
    });
  }

}
