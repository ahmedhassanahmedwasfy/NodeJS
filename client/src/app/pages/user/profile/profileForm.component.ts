import { Component, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import {ProfileService} from "../services/profile.service";
import {NotificationService} from "../../../@core/services/notification.service";
// import {ProfileService} from "../../../@core/services/Profile/profile.service";

@Component({
  selector: 'ngx-profileForm',
  templateUrl: './profileForm.component.html',
  styleUrls: ['./profileForm.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails: any = {};
  editable: boolean = true;
  showButton:boolean = false;


  constructor(private profileService: ProfileService, private router: Router, private notificationService: NotificationService) {}



  ngOnInit() {
    this.profileService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
       err => {
        console.log(err);
       });
  }

  editClick(){
    this.editable = false;
    this.showButton = true;
  }

  clickCancel(){
    this.ngOnInit();
    this.editable = true;
    this.showButton = false;

  }

  saveEditProfile(){
      this.profileService.editUserProfile(this.userDetails).subscribe(()=> {
        this.notificationService.showToasterSuccess('profileToasters.updateSucc', 'profileToasters.successHeader');
        this.clickCancel();
      });

  }

}

