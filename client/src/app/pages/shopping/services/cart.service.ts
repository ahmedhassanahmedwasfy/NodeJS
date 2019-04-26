import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {AppConfig} from "../../../@core/services/app-config.service";

@Injectable({
  providedIn: 'root'
})
export class CartService {

constructor(private http: Http) { }
  protected apiServer : any = AppConfig.settings.apiServer;

addToCart(){
  return this.http.get('${this.apiServer.API_BASE_URL}/add-to-cart/:id');
}


}
