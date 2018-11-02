import { Component, OnInit, Input } from '@angular/core';
import { EventsService } from '../../services/events.service';

@Component({
  selector: 'th-stored-highlights',
  templateUrl: './stored-highlights.component.html',
  styleUrls: ['./stored-highlights.component.css']
})
export class StoredHighlightsComponent implements OnInit {
  @Input('store') store = [];
  @Input('filters') filters;
  constructor(protected events: EventsService) { }

  ngOnInit() {
    this.events.listen().subscribe((event) => {
      if (event.origin === 'textarea' && event.type === 'store') {
        this.store.push({text: event.text, color: event.color});
      }
    });

    console.log(this.filters)
  }

}
