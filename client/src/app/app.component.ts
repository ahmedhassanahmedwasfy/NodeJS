/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import { NbLayoutDirectionService, NbLayoutDirection } from '@nebular/theme';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private directionService: NbLayoutDirectionService,  private translate: TranslateService) {
    directionService.onDirectionChange().subscribe((e) => {
      let lang = e == NbLayoutDirection.LTR ? 'en' : 'ar';
      translate.use(lang);

    })

    
    translate.setDefaultLang('en');
    translate.addLangs(['en', 'ar']);
  }

  ngOnInit(): void {
   
  }
}
