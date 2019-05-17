import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {PagesComponent} from './pages.component';
import {DashboardComponent} from './dashboard/dashboard.component';
// import { ECommerceComponent } from './e-commerce/e-commerce.component';
import {NotFoundComponent} from './miscellaneous/not-found/not-found.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [{
    path: 'dashboard',
    component: DashboardComponent,
  }, {
    path: 'PrimeNGDemo',
    loadChildren: './PrimeNGDemo/PrimeNGDemo.module#PrimeNGDemoModule',
  }, {
    path: 'PrimeNGDemo2',
    loadChildren: './PrimNGDemo2/PrimNGDemo2.module#PrimNGDemo2Module',
  }, {
    path: 'security',
    loadChildren: './security/security.module#SecurityModule',
  }, {
    path: 'user',
    loadChildren: './user/user.module#UserModule',
  }, {
    path: 'miscellaneous',
    loadChildren: './miscellaneous/miscellaneous.module#MiscellaneousModule',
  }, {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, {
    path: '**',
    component: NotFoundComponent,
  }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
