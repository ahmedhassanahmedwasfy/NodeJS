import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../services/Auth.service';
import { Router } from '@angular/router';






@Component({
  selector: 'ngx-logInForm',
  templateUrl: './logInForm.component.html',
  styleUrls: ['./logInForm.component.scss']
})
export class LogInFormComponent implements OnInit {
  
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {
  }


  login() {
    this.auth.login(this.credentials).subscribe(() => {
      window.location.href=('http://localhost:4200/#/pages/logIn/profileForm');
    }, (err) => {
      console.error(err);
    }); 
  }
}
