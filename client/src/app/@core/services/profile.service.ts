import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AppConfig} from './app-config.service';

interface TokenResponse {
  token: string;
}

@Injectable(

)
export class ProfileService {

  private token: string;
  protected apiServer : any = AppConfig.settings.apiServer;

  url = `${this.apiServer.API_BASE_URL}/user`;

  constructor(private http: HttpClient, private router: Router) {
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  getUserProfile() {
    return this.http.get(this.url + '/userProfile');
    // return this.http.get(this.url + '/userProfile', { headers: { Authorization: `Bearer ${this.getToken()}` }} );
  }

  editUserProfile(user) {
    return this.http.post(this.url + '/userProfile', user);
  }

  uploadImage(image) {
    return this.http.post(this.url + '/userProfile/uploadImage', image, {reportProgress: true});
  }

  getUserProfileImage() {
    return this.http.get(this.url + '/userProfile/ProfileImage');
  }
}
