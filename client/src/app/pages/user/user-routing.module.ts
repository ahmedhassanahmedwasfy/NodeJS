import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from "./profile/profileForm.component";
import {UserComponent} from "./user.component";
import {AuthGuardService} from "../../auth/services/auth-guard.service";



const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [{
      path: 'userProfile',
      component: ProfileComponent,
      canActivate:[AuthGuardService]
    },
    ]
  },
];

export const UserRoutes = RouterModule.forChild(routes);
