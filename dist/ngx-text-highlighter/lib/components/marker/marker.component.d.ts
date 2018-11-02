import { OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
export declare class MarkerComponent implements OnInit {
    protected events: EventsService;
    colors: string[];
    positionX: number;
    positionY: number;
    visibility: string;
    markerStyle: string;
    floatingMarker: any;
    constructor(events: EventsService);
    ngOnInit(): void;
    mark(color: any): void;
}
