import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../services/Auth.service';
import { Router } from '@angular/router';
import {NbAuthSocialLink} from "../auth.options";


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
  constructor(private auth: AuthService, private router: Router) {
    //this.socialLinks = this.getConfigValue('forms.login.socialLinks');

  }

  ngOnInit() {
  }

  login() {
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('pages/user/profile');
    }, (err) => {
      console.error(err);
    }); 
  }
}
