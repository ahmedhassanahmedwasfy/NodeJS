import { Routes, RouterModule } from '@angular/router';
import { PrimeNGDemoComponent } from './PrimeNGDemo.component';
import { DataviewComponent } from './dataview/dataview.component';
import { TableComponent } from './table/table.component';

const routes: Routes = [
  {
    path: '',
    component: PrimeNGDemoComponent,
    children: [{
      path: 'dataview'
      , component: DataviewComponent
    },
    {
      path: 'table'
      , component: TableComponent
    }]
  },
];

export const PrimeNGDemoRoutes = RouterModule.forChild(routes);
