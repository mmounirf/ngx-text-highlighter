import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  event: EventEmitter<any> = new EventEmitter();

  constructor() { }
  // Dispatch events across components
  dispatch(event) {
    this.event.emit(event);
  }

  // Listens to dispatched events
  listen() {
    return this.event;
  }
}
