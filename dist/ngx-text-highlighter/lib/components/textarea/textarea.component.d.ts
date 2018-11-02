import { OnInit, EventEmitter } from '@angular/core';
import { EventsService } from '../../services/events.service';
export declare class TextareaComponent implements OnInit {
    private _document;
    private events;
    savedSelection: Range | null;
    selectedText: string;
    blur: EventEmitter<string>;
    constructor(_document: any, events: EventsService);
    ngOnInit(): void;
    restoreSelection(): boolean;
    marker(color: string, text: string): void;
    onTextAreaBlur(): void;
    onSelection($event: any): void;
}
