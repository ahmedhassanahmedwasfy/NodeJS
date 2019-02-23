import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import {DataViewModule} from 'primeng/dataview';
import { CartService } from '../services/cart.service';


@Component({
  selector: 'ngx-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any;


  constructor(private productService: ProductService, private cartService: CartService) { }

  ngOnInit() {
    this.productService.getProduct().subscribe(products=>{this.products = products},
      err=>{console.log(err)});
  }

  onClick(){
    
  }

}
