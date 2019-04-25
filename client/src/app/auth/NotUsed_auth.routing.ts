import { Routes, RouterModule } from '@angular/router';
import {NbLoginComponent} from './logIn/logInForm.component';
import {NbRegisterComponent} from './register/registerForm.component';
import {NbAuthComponent} from '@nebular/auth';
import {NbResetPasswordComponent} from './reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
      path: 'logIn',
      component: NbLoginComponent,
    },
  {
    path: 'register',
    component: NbRegisterComponent,
  },
  {
    path: 'reset-password/:token',
    component: NbResetPasswordComponent,

  }],
  },
];

export const NbAuthRoutes = RouterModule.forChild(routes);

