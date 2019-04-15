import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
// import {NbAuthComponent} from "./auth/auth.component";
import {NbLoginComponent} from "./auth/logIn/logInForm.component";
import {NbRegisterComponent} from "./auth/register/registerForm.component";
import {NbLogoutComponent} from "@nebular/auth";
  import {
   NbAuthComponent,
  } from '@nebular/auth';
import {NBForgetPasswordComponent} from "./auth/forget-password/forget-password.component";
import {NbResetPasswordComponent} from "./auth/reset-password/reset-password.component";

const routes: Routes = [
  { path: 'pages', loadChildren: 'app/pages/pages.module#PagesModule' },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbLoginComponent,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
        path: 'register',
        component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
        path: 'request-password',
        component: NBForgetPasswordComponent,
      },
      {
        path: 'reset-password/:token',
        component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  { path: '**', redirectTo: 'pages' },
];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
