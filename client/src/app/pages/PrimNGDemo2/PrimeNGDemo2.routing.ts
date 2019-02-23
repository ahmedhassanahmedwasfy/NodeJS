import { Routes, RouterModule } from '@angular/router';
import { PrimNGDemo2Component } from './PrimNGDemo2.component';
import { OrderListComponent } from './OrderList/OrderList.component';
import { FullCallendarComponent } from './FullCallendar/FullCallendar.component';


const routes: Routes = [
  {
    path: '',
    component: PrimNGDemo2Component,
    children: [{
      path: 'OrderList'
      , component: OrderListComponent
    },
    {
      path: 'FullCallendar'
      , component: FullCallendarComponent
    }]
  },
];
 

export const PrimeNGDemo2Routes = RouterModule.forChild(routes);
