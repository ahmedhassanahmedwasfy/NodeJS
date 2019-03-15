/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbLayoutDirectionService, NbLayoutDirection } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private http:HttpClient, private directionService: NbLayoutDirectionService,  private translate: TranslateService) {
    directionService.onDirectionChange().subscribe((e) => {
      let lang = e == NbLayoutDirection.LTR ? 'en' : 'ar';
      translate.use(lang);

    })

    
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'ar']);
    //
    // const url = 'https://jsonplaceholder.typicode.com/posts/1';
    // this.http.get(url, ).subscribe(e=>{
    //   console.log(e)
    // });
  }

  ngOnInit(): void {
   
  }
}
