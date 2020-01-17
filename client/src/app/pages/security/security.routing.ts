import {Routes, RouterModule} from '@angular/router';
import {SecurityComponent} from './security.component';
import {PermissionsComponent} from './permissions/permissions.component';
import {GroupsComponent} from './groups/groups.component';
import {UsersComponent} from './users/users.component';
import {EditPermissionComponent} from './edit-permission/edit-permission.component';
import {EditGroupComponent} from './edit-group/edit-group.component';
import {EditUserComponent} from './edit-user/edit-user.component';
import {Group} from './seeds/group';
import {AuthGuardService} from '../../@core/services/auth-guard.service';
import {groupsEnums} from "../../@core/enums/groups.enums";
import {permissionsEnums} from "../../@core/enums/permissions.enums";


const routes: Routes = [
  {
    path: '',
    component: SecurityComponent,
    //data: { allowedRoles: ['Admin'] },
    canActivateChild: [AuthGuardService],
    children: [{
      path: 'permissions',
      component: PermissionsComponent,
    },
      {
        path: 'groups',
        component: GroupsComponent,
      },
      {
        path: 'users',
        component: UsersComponent,
      },
      {
        path: 'permissions/update/:id',
        component: EditPermissionComponent,

      },
      {
        path: 'permissions/update',
        component: EditPermissionComponent,
      },
      {
        path: 'groups/update/:id',
        component: EditGroupComponent,
      }
      ,
      {
        path: 'groups/update',
        component: EditGroupComponent//,
        //data: {permission: permissionsEnums.ADD_EDIT_GROUP},

      },
      {
        path: 'users/update/:id',
        component: EditUserComponent,
      },
      {
        path: 'users/update',
        component: EditUserComponent,
      }],
  },
];


export const SecurityRoutes = RouterModule.forChild(routes);
