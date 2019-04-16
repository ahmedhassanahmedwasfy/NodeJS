import { Component, OnInit } from '@angular/core';

import {ActivatedRoute} from "@angular/router";
import {ProfileService} from "../services/profile.service";
// import {ProfileService} from "../../../@core/services/Profile/profile.service";

@Component({
  selector: 'ngx-profileForm',
  templateUrl: './profileForm.component.html',
  styleUrls: ['./profileForm.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails: any = {};

  constructor(private profileService: ProfileService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.profileService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      }
      // ,
      // err => {
      //   console.log(err);
      //
      // }

    );
  }
}

