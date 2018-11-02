import { OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
export declare class StoredHighlightsComponent implements OnInit {
    protected events: EventsService;
    store: any[];
    constructor(events: EventsService);
    ngOnInit(): void;
}
