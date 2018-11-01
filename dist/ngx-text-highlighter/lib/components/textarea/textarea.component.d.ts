import { OnInit } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { DomSanitizer } from '@angular/platform-browser';
export declare class TextareaComponent implements OnInit {
    protected events: EventsService;
    private sanitizer;
    constructor(events: EventsService, sanitizer: DomSanitizer);
    content: string;
    selection: string;
    position: any;
    ngOnInit(): void;
    handleSelection($event: MouseEvent): void;
    handleBlur($event: any): void;
    replaceAt(string: any, position: any, replace: any): any;
}
