import { OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
export declare class MarkerComponent implements OnInit {
    protected events: EventsService;
    colors: string[];
    constructor(events: EventsService);
    ngOnInit(): void;
    mark(color: any): void;
}
