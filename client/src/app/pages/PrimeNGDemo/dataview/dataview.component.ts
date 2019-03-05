import { Component, OnInit } from '@angular/core';
import {DataViewModule} from 'primeng/dataview';
import { Car } from '../models/Car';
import { CarService } from '../services/car.service';
import {Http} from "@angular/http";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'ngx-dataview',
  templateUrl: './dataview.component.html',
  styleUrls: ['./dataview.component.scss']
})
export class DataviewComponent implements OnInit {

  cars: Car[];

  constructor(private carService: CarService ,private http:HttpClient) { }

  ngOnInit() {
      this.carService.getCarsLarge()
        .subscribe(res => {
         this.cars = res.data;
          })
  }

}
