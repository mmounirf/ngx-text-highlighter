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
                    template: "\n    <th-marker [markerStyle]=\"markerStyle\"></th-marker>\n    <th-textarea></th-textarea>\n    <th-stored-highlights></th-stored-highlights>\n  ",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJsaWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFVLE1BQU0sRUFBRSxZQUFZLEVBQWEsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFGLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7SUFjeEQscUNBQXNCLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7NkJBRkMsSUFBSSxZQUFZLEVBQUU7MkJBQzFCLE9BQU87S0FDSzs7OztJQUVoRCw4Q0FBUTs7O0lBQVI7UUFBQSxpQkFnQkM7O1FBZEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLOztZQUVsQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQzs7Z0JBRXJCLEtBQUssQ0FBQyxVQUFVLENBQUM7O29CQUVmLEFBREEsNkNBQTZDO29CQUM3QyxLQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztvQkFDdEYsS0FBSyxDQUFDO2dCQUVOO29CQUNBLEtBQUssQ0FBQzthQUNQO1NBQ0YsQ0FBQyxDQUFDO0tBRUo7Ozs7SUFFRCxpREFBVzs7O0lBQVg7UUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOztnQkFsQ0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxjQUFjO29CQUN4QixRQUFRLEVBQUUscUpBSVQ7b0JBQ0QsTUFBTSxFQUFFLEVBQUU7aUJBQ1g7Ozs7Z0JBVlEsYUFBYTs7O2dDQVluQixNQUFNOzhCQUNOLEtBQUssU0FBQyxhQUFhOztzQ0FkdEI7O1NBWWEsMkJBQTJCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRoLW1hcmtlciBbbWFya2VyU3R5bGVdPVwibWFya2VyU3R5bGVcIj48L3RoLW1hcmtlcj5cbiAgICA8dGgtdGV4dGFyZWE+PC90aC10ZXh0YXJlYT5cbiAgICA8dGgtc3RvcmVkLWhpZ2hsaWdodHM+PC90aC1zdG9yZWQtaGlnaGxpZ2h0cz5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoKSB0ZXh0U2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8e30+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoJ21hcmtlclN0eWxlJykgbWFya2VyU3R5bGUgPSAnZml4ZWQnO1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBMaXN0ZW5zIHRvIGV2ZW50cyBmcm9tIGNoaWxkIGNvbXBvbmVudHNcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgLy8gQ2hlY2sgZXZlbnQgb3JpZ2luICh3aGljaCBjb21wb25lbnQgZGlzcGF0Y2hlZCB0aGlzIGV2ZW50KVxuICAgICAgc3dpdGNoIChldmVudC5vcmlnaW4pIHtcbiAgICAgICAgLy8gRXZlbnRzIGNvbWluZyBmcm9tIHRoZSB0ZXh0YXJlYSBjb21wb25lbnRcbiAgICAgICAgY2FzZSAoJ3RleHRhcmVhJyk6XG4gICAgICAgICAgLy8gRW1pdCBldmVudCB0byB0aGUgbGlicmFyeSBjb21wb25lbnQgb3V0cHV0XG4gICAgICAgICAgdGhpcy50ZXh0U2VsZWN0aW9uLmVtaXQoe3NlbGVjdGlvbjogZXZlbnQuc2VsZWN0aW9uLCBtb3VzZUV2ZW50OiBldmVudC5tb3VzZUV2ZW50fSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiJdfQ==