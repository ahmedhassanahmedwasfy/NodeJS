import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders } from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs";
import {User} from "../../security/seeds/user";
import {map} from "rxjs/operators";

interface TokenResponse {
  token: string;
}

@Injectable(

)
export class ProfileService {

  private token: string;
  url = 'http://localhost:4000/api/user';

  constructor(private http: HttpClient, private router: Router) {}

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  getUserProfile() {
    return this.http.get(this.url + '/userProfile' );
    // return this.http.get(this.url + '/userProfile', { headers: { Authorization: `Bearer ${this.getToken()}` }} );
  }
}
