import { APP_BASE_HREF } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import {HttpClientModule, HttpClient, HTTP_INTERCEPTORS} from '@angular/common/http';
import { CoreModule } from './@core/core.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ThemeModule } from './@theme/theme.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule } from '@angular/forms';
import {NbToastrModule} from '@nebular/theme';
import { ToastrModule } from 'ngx-toastr';
import { NgxValidationMessagesModule } from 'ngx-validation-messages';
import { NbAuthModule } from './auth/auth.module';
import { NotificationService } from './@core/services/notification.service';
import { ConfigFactory, ConfigService, API_BASE_URL } from './@core/services/config.service';
//import { ErrorDialogService } from './@core/utils/error-dialog-service.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    NbAuthModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    NgxValidationMessagesModule,
    NbToastrModule.forRoot(),
    NgbModule.forRoot(),
    ThemeModule.forRoot(),
    ToastrModule.forRoot(),
    CoreModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient],
      },
  }),
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: APP_BASE_HREF, useValue: '/' },
    NotificationService,
    ConfigService,
    { provide: 'CONFIGPATH', useValue: '/assets/config.json' },
    { provide: 'APIURL-VAR', useValue: 'API_BASE_URL' },
    {
      provide: API_BASE_URL, useFactory: ConfigFactory,
      deps: [ConfigService, 'CONFIGPATH', 'APIURL-VAR'],
    },
    // ,ErrorDialogService,
    // { provide: HTTP_INTERCEPTORS, useClass: interceptor, multi: true }
    // ,ErrorDialogService,
   // , { provide: HTTP_INTERCEPTORS, useClass: interceptor, multi: true },

  ],
})
export class AppModule {
}
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
