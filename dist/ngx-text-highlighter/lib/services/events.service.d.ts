import { EventEmitter } from '@angular/core';
export declare class EventsService {
    event: EventEmitter<any>;
    constructor();
    dispatch(event: any): void;
    listen(): EventEmitter<any>;
}
