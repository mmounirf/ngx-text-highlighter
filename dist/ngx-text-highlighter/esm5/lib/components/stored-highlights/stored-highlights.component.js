/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { EventsService } from '../../services/events.service';
var StoredHighlightsComponent = /** @class */ (function () {
    function StoredHighlightsComponent(events) {
        this.events = events;
        this.store = [];
    }
    /**
     * @return {?}
     */
    StoredHighlightsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.events.listen().subscribe(function (event) {
            if (event.origin === 'textarea' && event.type === 'store') {
                _this.store.push({ text: event.text, color: event.color });
            }
        });
    };
    StoredHighlightsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'th-stored-highlights',
                    template: "<ul>\n<li *ngFor=\"let item of store\" [ngStyle]=\"{'background-color': item.color}\">{{item.text}}</li>\n</ul>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    StoredHighlightsComponent.ctorParameters = function () { return [
        { type: EventsService }
    ]; };
    StoredHighlightsComponent.propDecorators = {
        store: [{ type: Input, args: ['store',] }]
    };
    return StoredHighlightsComponent;
}());
export { StoredHighlightsComponent };
if (false) {
    /** @type {?} */
    StoredHighlightsComponent.prototype.store;
    /** @type {?} */
    StoredHighlightsComponent.prototype.events;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zdG9yZWQtaGlnaGxpZ2h0cy9zdG9yZWQtaGlnaGxpZ2h0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7SUFZNUQsbUNBQXNCLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7cUJBRG5CLEVBQUU7S0FDc0I7Ozs7SUFFaEQsNENBQVE7OztJQUFSO1FBQUEsaUJBTUM7UUFMQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7WUFDbkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUMxRCxLQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSyxFQUFDLENBQUMsQ0FBQzthQUN6RDtTQUNGLENBQUMsQ0FBQztLQUNKOztnQkFsQkYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLFFBQVEsRUFBRSxtSEFHWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUM7aUJBQ2I7Ozs7Z0JBVFEsYUFBYTs7O3dCQVduQixLQUFLLFNBQUMsT0FBTzs7b0NBWmhCOztTQVdhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtc3RvcmVkLWhpZ2hsaWdodHMnLFxuICB0ZW1wbGF0ZTogYDx1bD5cbjxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdG9yZVwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGl0ZW0uY29sb3J9XCI+e3tpdGVtLnRleHR9fTwvbGk+XG48L3VsPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoJ3N0b3JlJykgc3RvcmUgPSBbXTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ3RleHRhcmVhJyAmJiBldmVudC50eXBlID09PSAnc3RvcmUnKSB7XG4gICAgICAgIHRoaXMuc3RvcmUucHVzaCh7dGV4dDogZXZlbnQudGV4dCwgY29sb3I6IGV2ZW50LmNvbG9yfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuIl19