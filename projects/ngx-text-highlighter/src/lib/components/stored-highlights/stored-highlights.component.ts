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
  selectedFilters: Array<string> = [];
  constructor(protected events: EventsService) { }

  ngOnInit() {
    this.events.listen().subscribe((event) => {
      if (event.origin === 'textarea' && event.type === 'store') {
        this.store.push({text: event.text, color: event.color});
      }
    });

  }

  setFilter(filter) {
    // Check first if filter exists, if yes it will remove the filter if not it will push it to the selectedFilters
    this.isSelected(filter) ? this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1) : this.selectedFilters.push(filter);
  }

  isSelected(filter) {
    return this.selectedFilters.includes(filter);
  }

}
