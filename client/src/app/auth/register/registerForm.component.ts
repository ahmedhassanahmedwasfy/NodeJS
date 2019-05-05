import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NbAuthSocialLink} from '../auth.options';
import {NotificationService} from '../../@core/services/notification.service';
import {AuthService, TokenPayload} from '../../@core/services/Auth.service';

@Component({
  selector: 'ngx-registerForm',
  templateUrl: './registerForm.component.html',
  styleUrls: ['./registerForm.component.scss'],
})
export class NbRegisterComponent implements OnInit {
  socialLinks: NbAuthSocialLink[] = [];
  submitted: Boolean = false;

  credentials: TokenPayload = {
    email: '',
    name_EN: '',
    name_AR: '',
    password: '',
    confirmPassword: '',
  };

  constructor(private auth: AuthService, private router: Router, private notificationService: NotificationService) {}

  ngOnInit() {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.submitted = true;
      this.notificationService.showToasterSuccess('AuthToasters.registerSucc', 'AuthToasters.successHeader');
      this.router.navigateByUrl('/auth/profile');
    }, (err) => {
      console.error(err);
    });
  }
}
