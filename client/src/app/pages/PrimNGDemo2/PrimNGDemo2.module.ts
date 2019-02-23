import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimNGDemo2Component } from './PrimNGDemo2.component';
import { OrderListComponent } from './OrderList/OrderList.component';
import { FullCallendarComponent } from './FullCallendar/FullCallendar.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';

import { HttpModule } from '@angular/http';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { OrderListModule } from 'primeng/orderlist';
import { EventService } from './services/event.service';
import { CarService } from './services/car.service';
import { PrimeNGDemo2Routes } from './PrimeNGDemo2.routing';
import { ButtonModule } from 'primeng/button';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    ThemeModule,
    CommonModule, PrimeNGDemo2Routes, FullCalendarModule, HttpClientModule, HttpModule, OrderListModule, ButtonModule, 
],
  declarations: [PrimNGDemo2Component, OrderListComponent, FullCallendarComponent],
  providers: [EventService, CarService]
})
export class PrimNGDemo2Module {}

