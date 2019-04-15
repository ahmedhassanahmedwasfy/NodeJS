import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../services/profile.service";
import {ActivatedRoute} from "@angular/router";
import {AuthService} from "../../../auth/services/Auth.service";

@Component({
  selector: 'ngx-profileForm',
  templateUrl: './profileForm.component.html',
  styleUrls: ['./profileForm.component.scss']
})
export class ProfileComponent implements OnInit {

  userDetails: any = {};

  constructor(private profileService: ProfileService, private route: ActivatedRoute) {
  }


  async ngOnInit() {
    await this.profileService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
      },
      err => {
        console.log(err);

      }
    );
  }
}

