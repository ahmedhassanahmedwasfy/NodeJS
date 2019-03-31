import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ProfileComponent} from "./profile/profileForm.component";
import {UserComponent} from "./user.component";
import {ProfileService} from "./services/profile.service";
import {UserRoutes} from "./user-routing.module";
import {ThemeModule} from "../../@theme/theme.module";
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [UserComponent,ProfileComponent],
  imports: [CommonModule, UserRoutes, ThemeModule, RouterModule],
  providers:[ProfileService],
})
export class UserModule { }
