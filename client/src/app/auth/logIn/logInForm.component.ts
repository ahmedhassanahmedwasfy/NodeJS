import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NbAuthSocialLink} from '../auth.options';
import {NotificationService} from '../../@core/services/notification.service';
import {AuthService, TokenPayload} from '../../@core/services/Auth.service';

@Component({
  selector: 'ngx-logInForm',
  templateUrl: './logInForm.component.html',
  styleUrls: ['./logInForm.component.scss'],
})
export class NbLoginComponent implements OnInit {
  [x: string]: any;
  submitted: Boolean = false;

  socialLinks: NbAuthSocialLink[] = [];

  credentials: TokenPayload = {
    email: '',
    password: '',
  };
  constructor(private auth: AuthService, private router: Router, private notificationService: NotificationService) {
  }

  ngOnInit() {
  }
  login() {
    this.submitted = true;

    this.auth.login(this.credentials).subscribe(() => {
      this.submitted = false;
      this.notificationService.showToasterSuccess('AuthToasters.loginSucc', 'AuthToasters.successHeader');
      this.router.navigateByUrl('/auth/profile');
    }, (err) => {
      this.submitted = false;

      console.error(err);
    });
  }
}
