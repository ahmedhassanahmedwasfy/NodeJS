import { Component, OnInit } from '@angular/core';
import { Car } from '../models/Car';
import { CarService } from '../services/car.service';

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  cars: Car[];

  constructor(private carService: CarService) { }

  ngOnInit() {
      this.carService.getCarsLarge().then(cars => this.cars = cars);
  }}