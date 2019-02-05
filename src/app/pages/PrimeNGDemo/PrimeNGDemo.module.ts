import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrimeNGDemoComponent } from './PrimeNGDemo.component';
import { TableComponent } from './table/table.component';
import { DataviewComponent } from './dataview/dataview.component';
import { PrimeNGDemoRoutes } from './PrimeNGDemo.routing'; 
import { CarService } from './services/car.service';
 
import { ThemeModule } from '../../@theme/theme.module';

@NgModule({
  imports: [
    CommonModule,PrimeNGDemoRoutes,ThemeModule
  ],
  declarations: [PrimeNGDemoComponent,TableComponent,DataviewComponent],
  providers:[CarService]
})
export class PrimeNGDemoModule { }
