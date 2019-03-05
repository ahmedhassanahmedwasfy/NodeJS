import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private http: HttpClient) {}
  response: Observable<any>;

  ngOnInit() {
  }
  checkAPI() {

    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    this.http.get(url).subscribe(e=>{
      console.log(e)
    });
   let url2= 'http://localhost:4000/api/product/products';
    this.http.get(url2).subscribe(e=>{
      console.log(e)
    });
  }

}
