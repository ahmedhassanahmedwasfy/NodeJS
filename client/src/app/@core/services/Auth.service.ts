import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators/map';
import {Router} from '@angular/router';
import {AppConfig} from './app-config.service';

export interface UserDetails {
  _id: string;
  email: string;
  name_EN: string;
  name_AR: string;
  exp: number;
  iat: number;
}

interface TokenResponse {
  token: string;
}

export interface TokenPayload {
  email: string;
  password: string;
  name_EN?: string;
  name_AR?: string;
  confirmPassword?: string;
}

export interface NewPasswords {
  password: string;
  confirmPassword?: string;
}

@Injectable()
export class AuthService {
  private token: string;
  protected apiServer: any = AppConfig.settings.apiServer;

  constructor(private http: HttpClient, private router: Router) {
  }

  public saveToken(token: string): void {
    localStorage.setItem('token', token);
    this.token = token;
  }

  public getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public request(method: 'post' | 'get', type: 'login' | 'register' | 'forgetPassword' | 'resetPassword', user?: TokenPayload): Observable<any> {
    let base;

    if (method === 'post') {
      base = this.http.post(`${this.apiServer.API_BASE_URL}/security/${type}`, user);
    } else {
      base = this.http.get(`${this.apiServer.API_BASE_URL}/security/${type}`, {headers: {Authorization: `Bearer ${this.getToken()}`}});
    }



    const request = base.pipe(
      map((data: TokenResponse) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      }),
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('token');
    this.router.navigateByUrl('/auth/login');
  }

  public requestPassword(data) {
    return this.http.post('${this.apiServer.API_BASE_URL}/security/forgetPassword', data);
  }

  public saveNewPassword(token, data) {
    return this.http.post('${this.apiServer.API_BASE_URL}/security/resetPassword/' + token, data);
  }


}
