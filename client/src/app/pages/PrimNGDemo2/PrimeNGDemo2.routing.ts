import { Routes, RouterModule } from '@angular/router';
import { PrimNGDemo2Component } from './PrimNGDemo2.component';
import { OrderListComponent } from './OrderList/OrderList.component';
import { FullCallendarComponent } from './FullCallendar/FullCallendar.component';
import {AuthGuardService} from "../../@core/services/auth-guard.service";


const routes: Routes = [
  {
    path: '',
    component: PrimNGDemo2Component,
    children: [{
      path: 'OrderList'
       , component: OrderListComponent,
       data:{groups:['batee5']}
    },
    {
      path: 'FullCallendar'
      , component: FullCallendarComponent
    }]
  },
];
 

export const PrimeNGDemo2Routes = RouterModule.forChild(routes);
