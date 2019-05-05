import {Component, OnInit} from '@angular/core';
import {NbLayoutDirection, NbLayoutDirectionService, NbThemeService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  constructor(private themeservice:NbThemeService,private http: HttpClient, private directionService: NbLayoutDirectionService, private translate: TranslateService) {
    directionService.onDirectionChange().subscribe((e) => {
      let lang = e === NbLayoutDirection.LTR ? 'en' : 'ar';
      translate.use(lang);

    })
    themeservice.changeTheme("default")
    directionService.setDirection(NbLayoutDirection.RTL)
    translate.addLangs(['en', 'ar']);
    translate.setDefaultLang('ar');
    //
    // const url = 'https://jsonplaceholder.typicode.com/posts/1';
    // this.http.get(url, ).subscribe(e=>{
    //   console.log(e)
    // });
  }

  ngOnInit(): void {

  }
}
