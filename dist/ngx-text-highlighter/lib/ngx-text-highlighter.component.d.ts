import { OnInit, EventEmitter, OnDestroy } from '@angular/core';
import { EventsService } from './services/events.service';
export declare class NgxTextHighlighterComponent implements OnInit, OnDestroy {
    protected events: EventsService;
    textSelection: EventEmitter<{}>;
    markerStyle: string;
    colors: string[];
    constructor(events: EventsService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
