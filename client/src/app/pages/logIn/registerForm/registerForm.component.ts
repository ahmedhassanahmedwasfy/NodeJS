import { Component, OnInit } from '@angular/core';
import { AuthService, TokenPayload } from '../services/Auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-registerForm',
  templateUrl: './registerForm.component.html',
  styleUrls: ['./registerForm.component.scss']
})
export class RegisterFormComponent implements OnInit {
  
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  constructor(private auth: AuthService, private router: Router) {}


  ngOnInit(){
  }


  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    });
  }
}
