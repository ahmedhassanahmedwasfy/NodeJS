import { Component, OnInit } from '@angular/core';
import {OrderListModule} from 'primeng/orderlist';
import { Car } from '../models/car';
import { CarService } from '../services/car.service';
import {ButtonModule} from 'primeng/button';
import {TranslateService} from '@ngx-translate/core';



@Component({
  selector: 'ngx-OrderList',
  templateUrl: './OrderList.component.html',
  styleUrls: ['./OrderList.component.scss']
})
export class OrderListComponent implements OnInit {

 cars: Car[];
 selectedCars: Car[];
 clickMessage = '';

 onClick() {
  this.clickMessage = 'You are my hero!';
}
    

  constructor(private carService: CarService) { }

  ngOnInit() {
      this.carService.getCarsLarge().then(cars => this.cars = cars);
  }
}


