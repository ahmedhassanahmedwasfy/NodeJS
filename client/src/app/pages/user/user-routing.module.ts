import { Routes, RouterModule } from '@angular/router';
import {ProfileComponent} from "./profile/profileForm.component";
import {UserComponent} from "./user.component";



const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [{
      path: 'userProfile',
      component: ProfileComponent
    },
    ]
  },
];

export const UserRoutes = RouterModule.forChild(routes);
