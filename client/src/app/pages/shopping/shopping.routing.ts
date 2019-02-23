import { Routes, RouterModule } from '@angular/router';
import { ShoppingComponent } from './shopping.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  {
    path: '',
    component: ShoppingComponent,
    children: [{
      path: 'products'
      , component: ProductsComponent
    },
    {
      path: 'cart'
      , component: CartComponent
    }]
  },
];

export const ShoppingRoutes = RouterModule.forChild(routes);
