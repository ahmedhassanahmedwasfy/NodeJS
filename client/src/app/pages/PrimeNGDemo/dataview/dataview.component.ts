import { Component, OnInit } from '@angular/core';
import {DataViewModule} from 'primeng/dataview';
import { Car } from '../models/Car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'ngx-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss']
})
export class DataviewComponent implements OnInit {

  cars: Car[];

  constructor(private carService: CarService) { }

  ngOnInit() {
      this.carService.getCarsLarge().then(cars => this.cars = cars);
  }
}