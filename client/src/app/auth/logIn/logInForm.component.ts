import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../services/Auth.service';
import { Router } from '@angular/router';
import {NbAuthSocialLink} from "../auth.options";
import {NotificationService} from "../../@core/services/notification.service";


@Component({
  selector: 'ngx-logInForm',
  templateUrl: './logInForm.component.html',
  styleUrls: ['./logInForm.component.scss']
})
export class NbLoginComponent implements OnInit {
  [x: string]: any;

  socialLinks: NbAuthSocialLink[] = [];

  credentials: TokenPayload = {
    email: '',
    password: ''
  };
  constructor(private auth: AuthService, private router: Router, private notificationService: NotificationService) {
  }

  ngOnInit() {
  }
  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.notificationService.showToasterSuccess('AuthToasters.loginSucc','AuthToasters.successHeader');
      this.router.navigateByUrl('/auth/profile');
    }, (err) => {
      console.error(err);

    }); 
  }
}
