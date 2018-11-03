/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { EventsService } from './services/events.service';
export class NgxTextHighlighterComponent {
    /**
     * @param {?} events
     */
    constructor(events) {
        this.events = events;
        this.textSelection = new EventEmitter();
        this.markerStyle = 'fixed';
        this.colors = ['#f44336', '#ffeb3b', '#4caf50'];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.colors.length < 1) {
            this.colors = ['#f44336', '#ffeb3b', '#4caf50'];
        }
        // Listens to events from child components
        this.events.listen().subscribe(event => {
            // Check event origin (which component dispatched this event)
            switch (event.origin) {
                // Events coming from the textarea component
                case ('textarea'):
                    // Emit event to the library component output
                    this.textSelection.emit({ selection: event.selection, mouseEvent: event.mouseEvent });
                    break;
                default:
                    break;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.events.listen().unsubscribe();
    }
}
NgxTextHighlighterComponent.decorators = [
    { type: Component, args: [{
                selector: 'th-container',
                template: `
    <th-marker [markerStyle]="markerStyle" [colors]="colors"></th-marker>
    <th-textarea></th-textarea>
    <th-stored-highlights [filters]="colors"></th-stored-highlights>
  `,
                styles: []
            },] },
];
/** @nocollapse */
NgxTextHighlighterComponent.ctorParameters = () => [
    { type: EventsService }
];
NgxTextHighlighterComponent.propDecorators = {
    textSelection: [{ type: Output }],
    markerStyle: [{ type: Input, args: ['markerStyle',] }],
    colors: [{ type: Input, args: ['colors',] }]
};
if (false) {
    /** @type {?} */
    NgxTextHighlighterComponent.prototype.textSelection;
    /** @type {?} */
    NgxTextHighlighterComponent.prototype.markerStyle;
    /** @type {?} */
    NgxTextHighlighterComponent.prototype.colors;
    /** @type {?} */
    NgxTextHighlighterComponent.prototype.events;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQWEsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQVcxRCxNQUFNOzs7O0lBSUosWUFBc0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTs2QkFIQyxJQUFJLFlBQVksRUFBRTsyQkFDMUIsT0FBTztzQkFDakIsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQztLQUNaOzs7O0lBRS9DLFFBQVE7UUFDTixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ2pEOztRQUVELElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxFQUFFOztZQUVyQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Z0JBRXJCLEtBQUssQ0FBQyxVQUFVLENBQUM7O29CQUVmLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO29CQUN0RixLQUFLLENBQUM7Z0JBRU47b0JBQ0EsS0FBSyxDQUFDO2FBQ1A7U0FDRixDQUFDLENBQUM7S0FFSjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7WUF0Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUU7Ozs7R0FJVDtnQkFDRCxNQUFNLEVBQUUsRUFBRTthQUNYOzs7O1lBVlEsYUFBYTs7OzRCQVluQixNQUFNOzBCQUNOLEtBQUssU0FBQyxhQUFhO3FCQUNuQixLQUFLLFNBQUMsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx0aC1tYXJrZXIgW21hcmtlclN0eWxlXT1cIm1hcmtlclN0eWxlXCIgW2NvbG9yc109XCJjb2xvcnNcIj48L3RoLW1hcmtlcj5cbiAgICA8dGgtdGV4dGFyZWE+PC90aC10ZXh0YXJlYT5cbiAgICA8dGgtc3RvcmVkLWhpZ2hsaWdodHMgW2ZpbHRlcnNdPVwiY29sb3JzXCI+PC90aC1zdG9yZWQtaGlnaGxpZ2h0cz5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoKSB0ZXh0U2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8e30+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoJ21hcmtlclN0eWxlJykgbWFya2VyU3R5bGUgPSAnZml4ZWQnO1xuICBASW5wdXQoJ2NvbG9ycycpIGNvbG9ycyA9IFsnI2Y0NDMzNicsICcjZmZlYjNiJywgJyM0Y2FmNTAnXTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb2xvcnMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhpcy5jb2xvcnMgPSBbJyNmNDQzMzYnLCAnI2ZmZWIzYicsICcjNGNhZjUwJ107XG4gICAgfVxuICAgIC8vIExpc3RlbnMgdG8gZXZlbnRzIGZyb20gY2hpbGQgY29tcG9uZW50c1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAvLyBDaGVjayBldmVudCBvcmlnaW4gKHdoaWNoIGNvbXBvbmVudCBkaXNwYXRjaGVkIHRoaXMgZXZlbnQpXG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9yaWdpbikge1xuICAgICAgICAvLyBFdmVudHMgY29taW5nIGZyb20gdGhlIHRleHRhcmVhIGNvbXBvbmVudFxuICAgICAgICBjYXNlICgndGV4dGFyZWEnKTpcbiAgICAgICAgICAvLyBFbWl0IGV2ZW50IHRvIHRoZSBsaWJyYXJ5IGNvbXBvbmVudCBvdXRwdXRcbiAgICAgICAgICB0aGlzLnRleHRTZWxlY3Rpb24uZW1pdCh7c2VsZWN0aW9uOiBldmVudC5zZWxlY3Rpb24sIG1vdXNlRXZlbnQ6IGV2ZW50Lm1vdXNlRXZlbnR9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIl19