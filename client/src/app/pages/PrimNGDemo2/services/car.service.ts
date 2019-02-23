import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Car} from '../models/car';

@Injectable()
export class CarService {

    constructor(private http: Http) {}

    getCarsLarge() {
        return this.http.get('/assets/data/cars-large.json')
                    .toPromise()
                    .then(res => <Car[]> res.json().data)
                    .then(data => { return data; });
    }
}