import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { HttpClient } from '@angular/common/http';
/* 
export class product {
  _id: string;
  name: String;
  price: Number;
  category: String;
  quantity: Number;
  image: String;
  description: String
}

export class Item {

  product: string;
  quantity: number;
  total: number

} */


@Injectable({
  providedIn: 'root'
})
export class ProductService {

constructor(private http: Http) { }



getProduct(){
  return this.http.get('http://localhost:4000/api/products');
}

addProduct(product){
  return this.http.post('http://localhost:4000/api/products', product);
}


}
