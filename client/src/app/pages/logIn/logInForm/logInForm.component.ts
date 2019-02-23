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
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    }); 
  }
}
