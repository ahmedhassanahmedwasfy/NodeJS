import { Component, OnInit } from '@angular/core';
import {ProfileService} from "../services/profile.service";
//import { AuthService, UserDetails } from '../services/Auth.service';

@Component({
  selector: 'ngx-profileForm',
  templateUrl: './profileForm.component.html',
  styleUrls: ['./profileForm.component.scss']
})
export class ProfileComponent implements OnInit {

  UserDetails: any;

  constructor(private profileService: ProfileService) {
  }

  ngOnInit() {
    /*this.profileService.viewProfile(userId).subscribe(user => {
      this.UserDetails = user;
    }, (err) => {
      console.error(err);
    });
  }*/
  }

}

