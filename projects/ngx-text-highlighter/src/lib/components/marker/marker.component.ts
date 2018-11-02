import { Component, OnInit, Input, ViewChild } from '@angular/core';
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
  @ViewChild('floatingMarker') floatingMarker: any;
  constructor(protected events: EventsService) { }

  ngOnInit() {
    this.events.listen().subscribe((event) => {
      // Event from textarea regarding text selection and marker style is set to float
      if (event.origin === 'textarea' && event.type === 'selection' && this.markerStyle === 'float') {
        // Our maker width is auto (TODO: colors can be added as an input), let's get its computed width
        const markerWidth = window.getComputedStyle(this.floatingMarker.nativeElement).width;
        // Selection width and height from range bounding rectangle
        const selectionWidth = event.value.getRangeAt(0).getBoundingClientRect().width;
        const xCenter = (parseInt(markerWidth, 0) - selectionWidth) / 2;


        this.positionX = event.value.getRangeAt(0).getBoundingClientRect().left - xCenter;
        // 64px = 4em (double the line height)
        this.positionY = event.value.getRangeAt(0).getBoundingClientRect().top - 64;

        // Let's show our floating marker
        this.visibility = 'visible';
      }

      // Event from textarea regarding losing focus and marker style is set to float
      if (event.origin === 'textarea' && event.type === 'blur' && this.markerStyle === 'float') {
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
