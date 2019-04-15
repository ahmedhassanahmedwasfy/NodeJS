import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../../security/seeds/user";
import {AuthService} from "../../../auth/services/Auth.service";
import {map} from "rxjs/operators";

interface TokenResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private token: string;

  url = 'http://localhost:4000/api/user';


  constructor(private http: HttpClient, private router: Router, private AuthinticationService: AuthService) {
  }


  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  getUserProfile() {
    return this.http.get(this.url+ '/userProfile' );

    /*let headers = new Headers();
    this.getToken();
    headers.append('Authorization', this.token);
    headers.append('Content-Type', 'application/json');
    return this.http.get(this.url);*/
  }
}
