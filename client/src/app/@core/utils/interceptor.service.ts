import { Injectable } from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import "rxjs-compat/add/operator/do";
import {NbToastrService} from "@nebular/theme";
import {NotificationService} from "../services/notification.service";

@Injectable()
export class JWTTokenInterceptor implements HttpInterceptor {
  constructor(private notificationService: NotificationService){}
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let modified=req.clone();
    if(localStorage.getItem("token")){
     modified = req.clone({setHeaders: {'Authorization': 'Bearer '+localStorage.getItem("token")}});
    }
    return next.handle(modified).do(event => { }, (err: HttpErrorResponse) => {
       this.notificationService.showToasterError();
      if (err.error instanceof Error) {
        // A client-side or network error occurred. Handle it accordingly.
       } else if (err.status == 401) {

     //  this.router.navigate(['/login']);
      } else {
        // The backend returned an unsuccessful response code.
        // The response body may contain clues as to what went wrong,
       };
  });
}
}

