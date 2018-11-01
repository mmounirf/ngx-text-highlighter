/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
import { EventsService } from './services/events.service';
var NgxTextHighlighterComponent = /** @class */ (function () {
    function NgxTextHighlighterComponent(events) {
        this.events = events;
        this.textSelection = new EventEmitter();
        // TODO // Implement floating marker
        this.markerStyle = 'fixed';
    }
    /**
     * @return {?}
     */
    NgxTextHighlighterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Listens to events from child components
        this.events.listen().subscribe(function (event) {
            // Check event origin (which component dispatched this event)
            switch (event.origin) {
                // Events coming from the textarea component
                case ('textarea'):
                    // Emit event to the library component output
                    // Emit event to the library component output
                    _this.textSelection.emit({ selection: event.selection, mouseEvent: event.mouseEvent });
                    break;
                default:
                    break;
            }
        });
    };
    /**
     * @return {?}
     */
    NgxTextHighlighterComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.events.listen().unsubscribe();
    };
    NgxTextHighlighterComponent.decorators = [
        { type: Component, args: [{
                    selector: 'th-container',
                    template: "\n    <th-marker></th-marker>\n    <th-textarea></th-textarea>\n    <th-stored-highlights></th-stored-highlights>\n  ",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    NgxTextHighlighterComponent.ctorParameters = function () { return [
        { type: EventsService }
    ]; };
    NgxTextHighlighterComponent.propDecorators = {
        textSelection: [{ type: Output }],
        markerStyle: [{ type: Input, args: ['markerStyle',] }]
    };
    return NgxTextHighlighterComponent;
}());
export { NgxTextHighlighterComponent };
if (false) {
    /** @type {?} */
    NgxTextHighlighterComponent.prototype.textSelection;
    /** @type {?} */
    NgxTextHighlighterComponent.prototype.markerStyle;
    /** @type {?} */
    NgxTextHighlighterComponent.prototype.events;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQWEsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7SUFleEQscUNBQXNCLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7NkJBSEMsSUFBSSxZQUFZLEVBQUU7OzJCQUUxQixPQUFPO0tBQ0s7Ozs7SUFFaEQsOENBQVE7OztJQUFSO1FBQUEsaUJBZ0JDOztRQWRDLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUEsS0FBSzs7WUFFbEMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7O2dCQUVyQixLQUFLLENBQUMsVUFBVSxDQUFDOztvQkFFZixBQURBLDZDQUE2QztvQkFDN0MsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7b0JBQ3RGLEtBQUssQ0FBQztnQkFFTjtvQkFDQSxLQUFLLENBQUM7YUFDUDtTQUNGLENBQUMsQ0FBQztLQUVKOzs7O0lBRUQsaURBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Z0JBbkNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsY0FBYztvQkFDeEIsUUFBUSxFQUFFLHVIQUlUO29CQUNELE1BQU0sRUFBRSxFQUFFO2lCQUNYOzs7O2dCQVZRLGFBQWE7OztnQ0FZbkIsTUFBTTs4QkFFTixLQUFLLFNBQUMsYUFBYTs7c0NBZnRCOztTQVlhLDJCQUEyQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx0aC1tYXJrZXI+PC90aC1tYXJrZXI+XG4gICAgPHRoLXRleHRhcmVhPjwvdGgtdGV4dGFyZWE+XG4gICAgPHRoLXN0b3JlZC1oaWdobGlnaHRzPjwvdGgtc3RvcmVkLWhpZ2hsaWdodHM+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAT3V0cHV0KCkgdGV4dFNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPHt9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gVE9ETyAvLyBJbXBsZW1lbnQgZmxvYXRpbmcgbWFya2VyXG4gIEBJbnB1dCgnbWFya2VyU3R5bGUnKSBtYXJrZXJTdHlsZSA9ICdmaXhlZCc7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIExpc3RlbnMgdG8gZXZlbnRzIGZyb20gY2hpbGQgY29tcG9uZW50c1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAvLyBDaGVjayBldmVudCBvcmlnaW4gKHdoaWNoIGNvbXBvbmVudCBkaXNwYXRjaGVkIHRoaXMgZXZlbnQpXG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9yaWdpbikge1xuICAgICAgICAvLyBFdmVudHMgY29taW5nIGZyb20gdGhlIHRleHRhcmVhIGNvbXBvbmVudFxuICAgICAgICBjYXNlICgndGV4dGFyZWEnKTpcbiAgICAgICAgICAvLyBFbWl0IGV2ZW50IHRvIHRoZSBsaWJyYXJ5IGNvbXBvbmVudCBvdXRwdXRcbiAgICAgICAgICB0aGlzLnRleHRTZWxlY3Rpb24uZW1pdCh7c2VsZWN0aW9uOiBldmVudC5zZWxlY3Rpb24sIG1vdXNlRXZlbnQ6IGV2ZW50Lm1vdXNlRXZlbnR9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIl19