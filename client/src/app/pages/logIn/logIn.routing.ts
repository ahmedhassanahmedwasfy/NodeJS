
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './logIn.component';
import { LogInFormComponent } from './logInForm/logInForm.component';
import { RegisterFormComponent } from './registerForm/registerForm.component';
import { ProfileFormComponent } from './profileForm/profileForm.component';
import { AuthGuardService } from './services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: LogInComponent,
    children: [{
      path: 'logInForm'
      , component: LogInFormComponent
    },
  {
    path: 'registerForm'
      , component: RegisterFormComponent
  },
  {
    path: 'profileForm'
      , component: ProfileFormComponent,
      canActivate: [AuthGuardService]

  }]
  },
];
 

export const LogInRoutes = RouterModule.forChild(routes);

