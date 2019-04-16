import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {JwtModule} from '@auth0/angular-jwt';
import {ThemeModule} from 'app/@theme/theme.module';

import {RouterModule} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {NbLoginComponent} from "./logIn/logInForm.component";
import {NbRegisterComponent} from "./register/registerForm.component";
import {NBForgetPasswordComponent} from './forget-password/forget-password.component';
import {NbResetPasswordComponent} from './reset-password/reset-password.component';
import {AuthGuardService} from "../@core/utils/auth-guard.service";
import {AuthService} from "../@core/services/auth/Auth.service";

@NgModule({
  imports: [
    CommonModule, RouterModule, ReactiveFormsModule, BrowserModule, FormsModule, ThemeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: function tokenGetter() {
          return localStorage.getItem('access_token');
        },
        whitelistedDomains: ['localhost:4000'],
        blacklistedRoutes: ['http://localhost:4000/auth/login'],
      },
    })],
  // NbAuthComponent,
  declarations: [NbLoginComponent, NbRegisterComponent, NBForgetPasswordComponent, NbResetPasswordComponent],
  providers: [AuthService, AuthGuardService],
  // exports: [ NbAuthComponent, NbLoginComponent, NbRegisterComponent]
})
export class NbAuthModule {
}
