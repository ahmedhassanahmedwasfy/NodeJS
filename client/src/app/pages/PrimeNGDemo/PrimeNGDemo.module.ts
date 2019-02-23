import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGDemoComponent } from './PrimeNGDemo.component';
import { TableComponent } from './table/table.component';
import { DataviewComponent } from './dataview/dataview.component';
import { PrimeNGDemoRoutes } from './PrimeNGDemo.routing';
import { DataViewModule } from 'primeng/dataview';
import { CarService } from './services/car.service';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {ThemeModule} from "../../@theme/theme.module";

@NgModule({
  imports: [
    CommonModule,PrimeNGDemoRoutes,DataViewModule,HttpModule,ThemeModule,HttpClientModule
  ],
  declarations: [PrimeNGDemoComponent,TableComponent,DataviewComponent],
  providers:[CarService]
})
export class PrimeNGDemoModule { }
