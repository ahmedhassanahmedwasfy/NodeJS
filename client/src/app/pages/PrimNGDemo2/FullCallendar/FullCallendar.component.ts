import { Component, OnInit } from '@angular/core';
import { FullCalendarModule } from 'primeng/fullcalendar';
import { EventService } from '../services/event.service';
import { Events } from '../models/events';
import { TranslateService } from '@ngx-translate/core';
import { NbLayoutDirectionService, NbLayoutDirection } from '@nebular/theme';



@Component({
  selector: 'ngx-FullCallendar',
  templateUrl: './FullCallendar.component.html',
  styleUrls: ['./FullCallendar.component.scss']
})
export class FullCallendarComponent implements OnInit {
  events: Events[];
  options: any;



  constructor( private eventService: EventService) {
    
    // const browserLang = translate.getBrowserLang();
    // translate.use(browserLang.match(/en|ar/) ? browserLang : 'en');


  }

  ngOnInit() {
    this.eventService.getEvents().then(events => { this.events = events; });

    this.options = {
      defaultDate: '2017-02-01',
      header: {
        left: 'prev,next',
        center: 'title',
        right: 'month,agendaWeek,agendaDay'
      }
    };

  }

}

