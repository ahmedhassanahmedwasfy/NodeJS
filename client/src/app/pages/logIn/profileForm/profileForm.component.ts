import { Component, OnInit } from '@angular/core';
import { AuthService, UserDetails } from '../services/Auth.service';

@Component({
  selector: 'ngx-profileForm',
  templateUrl: './profileForm.component.html',
  styleUrls: ['./profileForm.component.scss']
})
export class ProfileFormComponent implements OnInit {

  details: UserDetails;

  constructor(private auth: AuthService) {}

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }

  }
