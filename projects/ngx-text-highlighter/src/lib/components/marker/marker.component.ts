import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'th-marker',
  templateUrl: './marker.component.html',
  styleUrls: ['./marker.component.css']
})
export class MarkerComponent implements OnInit {
  colors = ['#f44336', '#ffeb3b', '#4caf50'];
  positionX = 0;
  positionY = 0;
  visibility = 'hidden';
  @Input('markerStyle') markerStyle = 'fixed';
  constructor(protected events: EventsService) { }

  ngOnInit() {
    this.events.listen().subscribe((event) => {
      // Event from textarea regarding text selection and marker style is set to float
      if (event.origin === 'textarea' && event.type === 'selection' && this.markerStyle === 'float') {
        // let get selection bounding rectangle
        this.positionX = event.value.getRangeAt(0).getBoundingClientRect().left;
        this.positionY = event.value.getRangeAt(0).getBoundingClientRect().top;
        console.log('selection')
        // Let's show our floating marker
        this.visibility = 'visible';
      }

      // Event from textarea regarding losing focus and marker style is set to float
      if (event.origin === 'textarea' && event.type === 'blur' && this.markerStyle === 'float') {
        console.log('loses focus')
        // Let's hide our floating marker
        this.visibility = 'hidden';
      }
    });
  }

  mark(color) {
    this.events.dispatch({
      origin: 'marker',
      type: 'highlight',
      color: color
    });
  }

}
