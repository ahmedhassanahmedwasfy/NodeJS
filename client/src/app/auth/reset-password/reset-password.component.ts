import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NotificationService} from "../../@core/services/notification.service";
import {AuthService} from "../../@core/services/auth/Auth.service";

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class NbResetPasswordComponent implements OnInit {
 user: any = {};

  constructor(private auth: AuthService, private route: ActivatedRoute, private router: Router, private notificationService: NotificationService) { }

  ngOnInit() {
    console.log(this.user)
    /*let token = this.route.snapshot.paramMap.get('token');
    if(token) {
      await this.auth.resetPassword(token).subscribe( ()=>{
        this.router.navigateByUrl('/auth/reset-password/'+token);
        },
        (err)=>{
          console.error(err);
        }
      )
    }*/
  }

  async resetPassword(){
    let token = this.route.snapshot.paramMap.get('token');
    await this.auth.saveNewPassword(token, this.user).subscribe(()=>{
        this.notificationService.showToasterSuccess('AuthToasters.resetSucc','AuthToasters.successHeader');
        this.router.navigateByUrl('/auth/login');
      },
      (err)=>{
      console.log(err)
      }
    )
  }

}
