import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileComponent} from "./profile/profileForm.component";
import {UserComponent} from "./user.component";
import {UserRoutes} from "./user-routing.module";
import {ThemeModule} from "../../@theme/theme.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {JWTTokenInterceptor} from "../../@core/utils/interceptor.service";
import {ProfileService} from "../../@core/services/profile.service";


@NgModule({
  declarations: [UserComponent,ProfileComponent],
  imports: [CommonModule, UserRoutes, ThemeModule, HttpClientModule],
  // providers:[
  //
  //
  // ],
  providers:[ProfileService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JWTTokenInterceptor,
      multi: true
    } ,
  ],
})
export class UserModule { }
