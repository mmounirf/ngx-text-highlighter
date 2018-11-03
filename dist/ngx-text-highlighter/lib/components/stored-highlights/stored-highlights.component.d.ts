import { OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
export declare class StoredHighlightsComponent implements OnInit {
    protected events: EventsService;
    store: any[];
    filters: any;
    selectedFilters: Array<string>;
    constructor(events: EventsService);
    ngOnInit(): void;
    setFilter(filter: any): void;
    isSelected(filter: any): boolean;
}
