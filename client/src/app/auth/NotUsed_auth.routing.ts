
import { Routes, RouterModule } from '@angular/router';

import {NbLoginComponent} from "./logIn/logInForm.component";
import {NbRegisterComponent} from "./register/registerForm.component";
import {NbAuthComponent} from "@nebular/auth";


const routes: Routes = [
  {
    path: '',
    component: NbAuthComponent,
    children: [
      {
      path: 'logIn',
      component: NbLoginComponent
    },
  {
    path: 'register',
    component: NbRegisterComponent
  },
  /*{
    path: 'profileForm',
    component: ProfileFormComponent,
    canActivate: [AuthGuardService]

  }*/]
  },
];

export const NbAuthRoutes = RouterModule.forChild(routes);

