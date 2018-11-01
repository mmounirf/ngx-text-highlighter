import { Component, OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'th-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {
  colors = ['#f44336', '#ffeb3b', '#4caf50'];
  constructor(protected events: EventsService) { }

  ngOnInit() {
  }

  mark(color) {
    this.events.dispatch({
      origin: 'marker',
      type: 'highlight',
      color: color
    });
  }

}
