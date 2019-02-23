import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingComponent } from './shopping.component';
import { ProductService } from './services/product.service';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { ShoppingRoutes } from './shopping.routing';
import { DataViewModule } from 'primeng/dataview';
import { CartService } from './services/cart.service';

@NgModule({
  imports: [CommonModule, HttpClientModule, HttpModule, ShoppingRoutes, DataViewModule],
  declarations: [ShoppingComponent, ProductsComponent, CartComponent],
  providers: [ProductService, CartService]

})
export class ShoppingModule { }
