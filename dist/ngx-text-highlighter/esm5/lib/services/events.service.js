/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Injectable, EventEmitter } from '@angular/core';
import * as i0 from "@angular/core";
var EventsService = /** @class */ (function () {
    function EventsService() {
        this.event = new EventEmitter();
    }
    // Dispatch events across components
    /**
     * @param {?} event
     * @return {?}
     */
    EventsService.prototype.dispatch = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.event.emit(event);
    };
    // Listens to dispatched events
    /**
     * @return {?}
     */
    EventsService.prototype.listen = /**
     * @return {?}
     */
    function () {
        return this.event;
    };
    EventsService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    EventsService.ctorParameters = function () { return []; };
    /** @nocollapse */ EventsService.ngInjectableDef = i0.defineInjectable({ factory: function EventsService_Factory() { return new EventsService(); }, token: EventsService, providedIn: "root" });
    return EventsService;
}());
export { EventsService };
if (false) {
    /** @type {?} */
    EventsService.prototype.event;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZlbnRzLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci8iLCJzb3VyY2VzIjpbImxpYi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7OztJQVF2RDtxQkFGMkIsSUFBSSxZQUFZLEVBQUU7S0FFNUI7SUFDakIsb0NBQW9DOzs7OztJQUNwQyxnQ0FBUTs7OztJQUFSLFVBQVMsS0FBSztRQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hCO0lBRUQsK0JBQStCOzs7O0lBQy9CLDhCQUFNOzs7SUFBTjtRQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COztnQkFmRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Ozt3QkFKRDs7U0FLYSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIEV2ZW50c1NlcnZpY2Uge1xuICBldmVudDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbiAgLy8gRGlzcGF0Y2ggZXZlbnRzIGFjcm9zcyBjb21wb25lbnRzXG4gIGRpc3BhdGNoKGV2ZW50KSB7XG4gICAgdGhpcy5ldmVudC5lbWl0KGV2ZW50KTtcbiAgfVxuXG4gIC8vIExpc3RlbnMgdG8gZGlzcGF0Y2hlZCBldmVudHNcbiAgbGlzdGVuKCkge1xuICAgIHJldHVybiB0aGlzLmV2ZW50O1xuICB9XG59XG4iXX0=