import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../services/Auth.service';
import { Router } from '@angular/router';
import {NbAuthSocialLink} from "../auth.options";

@Component({
  selector: 'ngx-registerForm',
  templateUrl: './registerForm.component.html',
  styleUrls: ['./registerForm.component.scss']
})
export class NbRegisterComponent implements OnInit {
  socialLinks: NbAuthSocialLink[] = [];

  credentials: TokenPayload = {
    email: '',
    name_EN: '',
    name_AR:'',
    password: '',
    confirmPassword:''
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(){
  }

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/pages/user/profile');
    }, (err) => {
      console.error(err);
    });
  }
}
