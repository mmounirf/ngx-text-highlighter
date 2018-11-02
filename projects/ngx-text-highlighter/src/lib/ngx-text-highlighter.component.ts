import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { EventsService } from './services/events.service';

@Component({
  selector: 'th-container',
  template: `
    <th-marker [markerStyle]="markerStyle"></th-marker>
    <th-textarea></th-textarea>
    <th-stored-highlights></th-stored-highlights>
  `,
  styles: []
})
export class NgxTextHighlighterComponent implements OnInit, OnDestroy {
  @Output() textSelection: EventEmitter<{}> = new EventEmitter();
  @Input('markerStyle') markerStyle = 'fixed';
  constructor(protected events: EventsService) { }

  ngOnInit() {
    // Listens to events from child components
    this.events.listen().subscribe(event => {
      // Check event origin (which component dispatched this event)
      switch (event.origin) {
        // Events coming from the textarea component
        case ('textarea'):
          // Emit event to the library component output
          this.textSelection.emit({selection: event.selection, mouseEvent: event.mouseEvent});
        break;

        default:
        break;
      }
    });

  }

  ngOnDestroy() {
    this.events.listen().unsubscribe();
  }

}
