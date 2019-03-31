import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SecurityComponent } from './security.component';
import { PermissionsComponent } from './permissions/permissions.component';
import { GroupsComponent } from './groups/groups.component';
import { UsersComponent } from './users/users.component';
import {GroupsService} from "./services/groups.service";
import {UserService} from "../../@core/mock/users.service";
import {PermissionsService} from "./services/permissions.service";
import {SecurityRoutes} from "./security.routing";
import {ThemeModule} from "../../@theme/theme.module";
import {TableModule} from 'primeng/table';
import {PaginatorModule} from 'primeng/paginator';
import {PickListModule} from 'primeng/picklist';
import {DataViewModule} from 'primeng/dataview';
import { EditPermissionComponent } from './edit-permission/edit-permission.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { EditUserComponent } from './edit-user/edit-user.component';

@NgModule({
  declarations: [SecurityComponent, PermissionsComponent, GroupsComponent, UsersComponent, EditPermissionComponent, EditGroupComponent,
    EditUserComponent],
  imports: [CommonModule, SecurityRoutes, ThemeModule, TableModule, PaginatorModule, PickListModule, DataViewModule],
  providers: [PermissionsService, GroupsService, UserService]
})
export class SecurityModule { }
