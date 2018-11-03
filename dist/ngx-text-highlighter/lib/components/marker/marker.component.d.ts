import { OnInit, OnDestroy } from '@angular/core';
import { EventsService } from '../../services/events.service';
export declare class MarkerComponent implements OnInit, OnDestroy {
    protected events: EventsService;
    positionX: number;
    positionY: number;
    visibility: string;
    markerStyle: string;
    colors: string[];
    floatingMarker: any;
    constructor(events: EventsService);
    ngOnInit(): void;
    mark(color: any): void;
    ngOnDestroy(): void;
}
