import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/Auth.service';

@Component({
  selector: 'ngx-logIn',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class NbAuthComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
