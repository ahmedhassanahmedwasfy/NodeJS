import { Injectable } from '@angular/core';
import {Http} from '@angular/http';
import {Events} from '../models/events';



@Injectable()
export class EventService {

  constructor(private http: Http) {}

  getEvents() {
      return this.http.get('/assets/data/events.json')
                  .toPromise()
                  .then(res => <Events[]> res.json().data)
                  .then(data => { return data; });
  }
}
