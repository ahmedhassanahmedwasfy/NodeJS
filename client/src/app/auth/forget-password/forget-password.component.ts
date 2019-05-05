import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {NotificationService} from '../../@core/services/notification.service';
import {AuthService} from '../../@core/services/Auth.service';

@Component({
  selector: 'ngx-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class NBForgetPasswordComponent implements OnInit {
  user: any = {};

  constructor(private auth: AuthService, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
  }
  submitted = false;
  requestPassword() {
    this.submitted = true;
    this.auth.requestPassword(this.user).subscribe(() => {
      this.submitted = false;
      this.notificationService.showToasterSuccess('AuthToasters.requestSucc', 'AuthToasters.successHeader');
    }, (err) => {
      this.submitted = false;

    });
  }

}
