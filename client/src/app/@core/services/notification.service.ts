import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NbLayoutDirectionService} from "@nebular/theme";
import {forkJoin} from "rxjs";
import {ToastrService} from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private translateService: TranslateService, private directionService: NbLayoutDirectionService, private toastr: ToastrService,) {

  }


  public async   showToasterSuccess(msg?, title?) {
    let _msg, _title;
    if (msg) {
      _msg = await this.translateService.get(msg).toPromise();
    }
    else{
      _msg = await this.translateService.get('generalToasters.success').toPromise();

    }
    if (title) {
      _title = await this.translateService.get(title).toPromise();
    }
    else{
      _title = await this.translateService.get('generalToasters.title').toPromise();
    }
    this.toastr.success(_msg, _title)
  }


  public async showToasterError(msg?, title?) {
    let _msg, _title;
    if (msg) {
      _msg = await this.translateService.get(msg).toPromise();
    }
    else{
      _msg = await this.translateService.get('generalToasters.error').toPromise();

    }
    if (title) {
      _title = await this.translateService.get(title).toPromise();
    }
    else{
      _title = await this.translateService.get('generalToasters.title').toPromise();
    }
    this.toastr.error(_msg, _title)
  }
}
