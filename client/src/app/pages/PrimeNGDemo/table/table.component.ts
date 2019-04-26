import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
import {AppConfig} from "../../../@core/services/app-config.service";

@Component({
  selector: 'ngx-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  constructor(private http: HttpClient) {}
  response: Observable<any>;

  protected apiServer : any = AppConfig.settings.apiServer;
  url2 = `${this.apiServer.API_BASE_URL}/product/products`;

  ngOnInit() {
  }
  checkAPI() {

    const url = 'https://jsonplaceholder.typicode.com/posts/1';
    this.http.get(url).subscribe(e=>{
      console.log(e)
    });

    this.http.get(this.url2).subscribe(e=>{
      console.log(e)
    });
  }

}
