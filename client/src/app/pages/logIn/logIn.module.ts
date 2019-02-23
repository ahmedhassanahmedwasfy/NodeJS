import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogInComponent } from './logIn.component';
import { LogInFormComponent } from './logInForm/logInForm.component';
import { AlertService } from './services/alert.service';
import { AuthService } from './services/Auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LogInRoutes } from './logIn.routing';
import { JwtModule } from '@auth0/angular-jwt';
import { RegisterFormComponent } from './registerForm/registerForm.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProfileFormComponent } from './profileForm/profileForm.component';


@NgModule({
  imports: [
    CommonModule, HttpClientModule, ReactiveFormsModule, LogInRoutes, FormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function  tokenGetter() {
             return     localStorage.getItem('access_token');},
        whitelistedDomains: ['localhost:3000'],
        blacklistedRoutes: ['http://localhost:3000/auth/login']
      }
    })],
    declarations: [LogInComponent, LogInFormComponent, RegisterFormComponent, ProfileFormComponent],
    providers: [AlertService, AuthService, AuthGuardService]
})
export class LogInModule { }
