import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import { OVERLAY_KEYBOARD_DISPATCHER_PROVIDER_FACTORY } from '@angular/cdk/overlay/typings/keyboard/overlay-keyboard-dispatcher';


@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor(private http: Http) { }

addToCart(){
  return this.http.get('http://localhost:4000/api/add-to-cart/:id');
}


}
