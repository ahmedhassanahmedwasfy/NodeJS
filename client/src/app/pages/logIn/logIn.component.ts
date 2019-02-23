import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/Auth.service';

@Component({
  selector: 'ngx-logIn',
  templateUrl: './logIn.component.html',
  styleUrls: ['./logIn.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(public auth: AuthService) { }

  ngOnInit() {
  }

}
