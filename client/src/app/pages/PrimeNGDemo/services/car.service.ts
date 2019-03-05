import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Car} from '../models/car';
import {observableToBeFn} from "rxjs/internal/testing/TestScheduler";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class CarService {

    constructor(private http: HttpClient) {}

    getCarsLarge(): Observable<any> {
        return this.http.get('/assets/data/cars-large.json')
                   // .toPromise()

                    //.subscribe(data => { return data; });
    }
}
