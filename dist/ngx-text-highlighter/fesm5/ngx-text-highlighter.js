import { Injectable, Pipe, EventEmitter, Component, Output, Input, NgModule, defineInjectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxTextHighlighterService = /** @class */ (function () {
    function NgxTextHighlighterService() {
    }
    NgxTextHighlighterService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    NgxTextHighlighterService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxTextHighlighterService.ngInjectableDef = defineInjectable({ factory: function NgxTextHighlighterService_Factory() { return new NgxTextHighlighterService(); }, token: NgxTextHighlighterService, providedIn: "root" });
    return NgxTextHighlighterService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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
    /** @nocollapse */ EventsService.ngInjectableDef = defineInjectable({ factory: function EventsService_Factory() { return new EventsService(); }, token: EventsService, providedIn: "root" });
    return EventsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TextareaComponent = /** @class */ (function () {
    function TextareaComponent(events, sanitizer) {
        this.events = events;
        this.sanitizer = sanitizer;
        this.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet facilisis dui, a finibus dui. Donec dignissim, justo at placerat maximus, urna turpis viverra urna, at hendrerit dui sem sed quam. Donec tincidunt magna quis tortor dignissim, at condimentum turpis lacinia. Aenean id turpis sit amet lacus semper sollicitudin. Nullam gravida erat vitae posuere sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam erat volutpat. Fusce nec sapien sagittis, tincidunt tortor quis, ultricies magna. Nullam nulla erat, laoreet non neque et, bibendum ornare nisl. Aliquam nisl massa, lobortis non metus quis, hendrerit rutrum enim. Nullam in lorem ut diam varius rutrum eget consectetur est. Aliquam quis velit iaculis, vehicula lectus a, imperdiet arcu. In sodales dolor eu erat tincidunt, et cursus dui vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus sed congue tellus. Quisque pulvinar felis aliquam nunc ultrices ullamcorper. Proin eget lacus at massa ullamcorper suscipit. Sed bibendum purus lorem, at ornare est aliquet dictum. Nulla eleifend eros congue nulla luctus auctor. Donec malesuada consectetur vestibulum. Suspendisse ut neque ac risus eleifend tempus sit amet quis turpis. Praesent tincidunt bibendum egestas. Integer porta accumsan metus, nec finibus justo fermentum ac. Nulla facilisi. Pellentesque erat augue, congue nec est ac, bibendum congue libero. Maecenas venenatis vel lacus in mollis. Ut sollicitudin vel ipsum sit amet aliquet. Donec tincidunt tempus est a malesuada.';
        this.selection = '';
    }
    /**
     * @return {?}
     */
    TextareaComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.events.listen().subscribe(function (event) {
            switch (event.origin) {
                case ('marker'):
                    if (_this.selection) {
                        _this.content = _this.replaceAt(_this.content, _this.position, "<span style=\"background-color: " + event.color + ";\">" + _this.selection + "</span>");
                    }
                    break;
                case ('textarea'):
                    _this.selection = event.selection.toString();
                    _this.position = { starts: event.selection.anchorOffset, ends: event.selection.focusOffset };
                    break;
                default:
                    break;
            }
        });
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    TextareaComponent.prototype.handleSelection = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var selection = $event.view.getSelection();
        if (selection.type === 'Range') {
            this.events.dispatch({
                origin: 'textarea',
                type: 'selection',
                mouseEvent: $event,
                selection: selection,
            });
        }
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    TextareaComponent.prototype.handleBlur = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.content = $event.target.innerHTML;
    };
    // Replace string at specific position (native replace() method will just replace the first occurance)
    /**
     * @param {?} string
     * @param {?} position
     * @param {?} replace
     * @return {?}
     */
    TextareaComponent.prototype.replaceAt = /**
     * @param {?} string
     * @param {?} position
     * @param {?} replace
     * @return {?}
     */
    function (string, position, replace) {
        return string.substring(0, position.starts) + replace + string.substring(position.ends);
    };
    TextareaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'th-textarea',
                    template: "<div\n  class=\"textarea\"\n  (mouseup)=\"handleSelection($event)\"\n  contenteditable=\"true\"\n  [innerHtml]=\"content | safeHtml\"\n  (input)=\"$event.target.innerHtml\"\n  (blur)=\"handleBlur($event)\"\n></div>\n",
                    styles: [".textarea{height:250px;overflow:auto;background-color:#f1f1f1;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);border-radius:2px;line-height:2em}.textarea:focus{outline:0}"]
                },] },
    ];
    /** @nocollapse */
    TextareaComponent.ctorParameters = function () { return [
        { type: EventsService },
        { type: DomSanitizer }
    ]; };
    return TextareaComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var StoredHighlightsComponent = /** @class */ (function () {
    function StoredHighlightsComponent() {
    }
    /**
     * @return {?}
     */
    StoredHighlightsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    StoredHighlightsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'th-stored-highlights',
                    template: "<p>\n  stored-highlights works!\n</p>\n",
                    styles: [""]
                },] },
    ];
    /** @nocollapse */
    StoredHighlightsComponent.ctorParameters = function () { return []; };
    return StoredHighlightsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MarkerComponent = /** @class */ (function () {
    function MarkerComponent(events) {
        this.events = events;
        this.colors = ['#f44336', '#ffeb3b', '#4caf50'];
    }
    /**
     * @return {?}
     */
    MarkerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @param {?} color
     * @return {?}
     */
    MarkerComponent.prototype.mark = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        this.events.dispatch({
            origin: 'marker',
            type: 'highlight',
            color: color
        });
    };
    MarkerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'th-marker',
                    template: "<div class=\"colors\">\n  <div class=\"color\" *ngFor=\"let color of colors\" [ngStyle]=\"{'background-color': color}\" (click)=\"mark(color)\"></div>\n</div>\n",
                    styles: [".colors{width:100%;display:flex;flex-wrap:wrap}.color{width:50px;height:50px;margin:0 10px 10px 0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:.3s cubic-bezier(.25,.8,.25,1)}.color:hover{border-radius:50%;box-shadow:0 10px 10px rgba(0,0,0,.25),0 5px 5px rgba(0,0,0,.22)}"]
                },] },
    ];
    /** @nocollapse */
    MarkerComponent.ctorParameters = function () { return [
        { type: EventsService }
    ]; };
    return MarkerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var SafeHtmlPipe = /** @class */ (function () {
    function SafeHtmlPipe(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} html
     * @return {?}
     */
    SafeHtmlPipe.prototype.transform = /**
     * @param {?} html
     * @return {?}
     */
    function (html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    };
    SafeHtmlPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'safeHtml'
                },] },
    ];
    /** @nocollapse */
    SafeHtmlPipe.ctorParameters = function () { return [
        { type: DomSanitizer }
    ]; };
    return SafeHtmlPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxTextHighlighterModule = /** @class */ (function () {
    function NgxTextHighlighterModule() {
    }
    NgxTextHighlighterModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule
                    ],
                    declarations: [
                        NgxTextHighlighterComponent,
                        TextareaComponent,
                        StoredHighlightsComponent,
                        MarkerComponent,
                        SafeHtmlPipe
                    ],
                    exports: [NgxTextHighlighterComponent]
                },] },
    ];
    return NgxTextHighlighterModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgxTextHighlighterService, NgxTextHighlighterComponent, NgxTextHighlighterModule, MarkerComponent as ɵd, StoredHighlightsComponent as ɵc, TextareaComponent as ɵb, SafeHtmlPipe as ɵe, EventsService as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvc2VydmljZXMvZXZlbnRzLnNlcnZpY2UudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL3BpcGVzL3NhZmUtaHRtbC5waXBlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBFdmVudHNTZXJ2aWNlIHtcbiAgZXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIC8vIERpc3BhdGNoIGV2ZW50cyBhY3Jvc3MgY29tcG9uZW50c1xuICBkaXNwYXRjaChldmVudCkge1xuICAgIHRoaXMuZXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvLyBMaXN0ZW5zIHRvIGRpc3BhdGNoZWQgZXZlbnRzXG4gIGxpc3RlbigpIHtcbiAgICByZXR1cm4gdGhpcy5ldmVudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRoLW1hcmtlcj48L3RoLW1hcmtlcj5cbiAgICA8dGgtdGV4dGFyZWE+PC90aC10ZXh0YXJlYT5cbiAgICA8dGgtc3RvcmVkLWhpZ2hsaWdodHM+PC90aC1zdG9yZWQtaGlnaGxpZ2h0cz5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoKSB0ZXh0U2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8e30+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvLyBUT0RPIC8vIEltcGxlbWVudCBmbG9hdGluZyBtYXJrZXJcbiAgQElucHV0KCdtYXJrZXJTdHlsZScpIG1hcmtlclN0eWxlID0gJ2ZpeGVkJztcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gTGlzdGVucyB0byBldmVudHMgZnJvbSBjaGlsZCBjb21wb25lbnRzXG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIC8vIENoZWNrIGV2ZW50IG9yaWdpbiAod2hpY2ggY29tcG9uZW50IGRpc3BhdGNoZWQgdGhpcyBldmVudClcbiAgICAgIHN3aXRjaCAoZXZlbnQub3JpZ2luKSB7XG4gICAgICAgIC8vIEV2ZW50cyBjb21pbmcgZnJvbSB0aGUgdGV4dGFyZWEgY29tcG9uZW50XG4gICAgICAgIGNhc2UgKCd0ZXh0YXJlYScpOlxuICAgICAgICAgIC8vIEVtaXQgZXZlbnQgdG8gdGhlIGxpYnJhcnkgY29tcG9uZW50IG91dHB1dFxuICAgICAgICAgIHRoaXMudGV4dFNlbGVjdGlvbi5lbWl0KHtzZWxlY3Rpb246IGV2ZW50LnNlbGVjdGlvbiwgbW91c2VFdmVudDogZXZlbnQubW91c2VFdmVudH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLXRleHRhcmVhJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gIGNsYXNzPVwidGV4dGFyZWFcIlxuICAobW91c2V1cCk9XCJoYW5kbGVTZWxlY3Rpb24oJGV2ZW50KVwiXG4gIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIlxuICBbaW5uZXJIdG1sXT1cImNvbnRlbnQgfCBzYWZlSHRtbFwiXG4gIChpbnB1dCk9XCIkZXZlbnQudGFyZ2V0LmlubmVySHRtbFwiXG4gIChibHVyKT1cImhhbmRsZUJsdXIoJGV2ZW50KVwiXG4+PC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnRleHRhcmVhe2hlaWdodDoyNTBweDtvdmVyZmxvdzphdXRvO2JhY2tncm91bmQtY29sb3I6I2YxZjFmMTtwYWRkaW5nOjIwcHg7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMTIpLDAgMXB4IDJweCByZ2JhKDAsMCwwLC4yNCk7Ym9yZGVyLXJhZGl1czoycHg7bGluZS1oZWlnaHQ6MmVtfS50ZXh0YXJlYTpmb2N1c3tvdXRsaW5lOjB9YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHsgfVxuICBjb250ZW50ID0gJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIFZpdmFtdXMgc2l0IGFtZXQgZmFjaWxpc2lzIGR1aSwgYSBmaW5pYnVzIGR1aS4gRG9uZWMgZGlnbmlzc2ltLCBqdXN0byBhdCBwbGFjZXJhdCBtYXhpbXVzLCB1cm5hIHR1cnBpcyB2aXZlcnJhIHVybmEsIGF0IGhlbmRyZXJpdCBkdWkgc2VtIHNlZCBxdWFtLiBEb25lYyB0aW5jaWR1bnQgbWFnbmEgcXVpcyB0b3J0b3IgZGlnbmlzc2ltLCBhdCBjb25kaW1lbnR1bSB0dXJwaXMgbGFjaW5pYS4gQWVuZWFuIGlkIHR1cnBpcyBzaXQgYW1ldCBsYWN1cyBzZW1wZXIgc29sbGljaXR1ZGluLiBOdWxsYW0gZ3JhdmlkYSBlcmF0IHZpdGFlIHBvc3VlcmUgc2FnaXR0aXMuIFZlc3RpYnVsdW0gYW50ZSBpcHN1bSBwcmltaXMgaW4gZmF1Y2lidXMgb3JjaSBsdWN0dXMgZXQgdWx0cmljZXMgcG9zdWVyZSBjdWJpbGlhIEN1cmFlOyBBbGlxdWFtIGVyYXQgdm9sdXRwYXQuIEZ1c2NlIG5lYyBzYXBpZW4gc2FnaXR0aXMsIHRpbmNpZHVudCB0b3J0b3IgcXVpcywgdWx0cmljaWVzIG1hZ25hLiBOdWxsYW0gbnVsbGEgZXJhdCwgbGFvcmVldCBub24gbmVxdWUgZXQsIGJpYmVuZHVtIG9ybmFyZSBuaXNsLiBBbGlxdWFtIG5pc2wgbWFzc2EsIGxvYm9ydGlzIG5vbiBtZXR1cyBxdWlzLCBoZW5kcmVyaXQgcnV0cnVtIGVuaW0uIE51bGxhbSBpbiBsb3JlbSB1dCBkaWFtIHZhcml1cyBydXRydW0gZWdldCBjb25zZWN0ZXR1ciBlc3QuIEFsaXF1YW0gcXVpcyB2ZWxpdCBpYWN1bGlzLCB2ZWhpY3VsYSBsZWN0dXMgYSwgaW1wZXJkaWV0IGFyY3UuIEluIHNvZGFsZXMgZG9sb3IgZXUgZXJhdCB0aW5jaWR1bnQsIGV0IGN1cnN1cyBkdWkgdmVzdGlidWx1bS4gVmVzdGlidWx1bSBhbnRlIGlwc3VtIHByaW1pcyBpbiBmYXVjaWJ1cyBvcmNpIGx1Y3R1cyBldCB1bHRyaWNlcyBwb3N1ZXJlIGN1YmlsaWEgQ3VyYWU7IFBoYXNlbGx1cyBzZWQgY29uZ3VlIHRlbGx1cy4gUXVpc3F1ZSBwdWx2aW5hciBmZWxpcyBhbGlxdWFtIG51bmMgdWx0cmljZXMgdWxsYW1jb3JwZXIuIFByb2luIGVnZXQgbGFjdXMgYXQgbWFzc2EgdWxsYW1jb3JwZXIgc3VzY2lwaXQuIFNlZCBiaWJlbmR1bSBwdXJ1cyBsb3JlbSwgYXQgb3JuYXJlIGVzdCBhbGlxdWV0IGRpY3R1bS4gTnVsbGEgZWxlaWZlbmQgZXJvcyBjb25ndWUgbnVsbGEgbHVjdHVzIGF1Y3Rvci4gRG9uZWMgbWFsZXN1YWRhIGNvbnNlY3RldHVyIHZlc3RpYnVsdW0uIFN1c3BlbmRpc3NlIHV0IG5lcXVlIGFjIHJpc3VzIGVsZWlmZW5kIHRlbXB1cyBzaXQgYW1ldCBxdWlzIHR1cnBpcy4gUHJhZXNlbnQgdGluY2lkdW50IGJpYmVuZHVtIGVnZXN0YXMuIEludGVnZXIgcG9ydGEgYWNjdW1zYW4gbWV0dXMsIG5lYyBmaW5pYnVzIGp1c3RvIGZlcm1lbnR1bSBhYy4gTnVsbGEgZmFjaWxpc2kuIFBlbGxlbnRlc3F1ZSBlcmF0IGF1Z3VlLCBjb25ndWUgbmVjIGVzdCBhYywgYmliZW5kdW0gY29uZ3VlIGxpYmVyby4gTWFlY2VuYXMgdmVuZW5hdGlzIHZlbCBsYWN1cyBpbiBtb2xsaXMuIFV0IHNvbGxpY2l0dWRpbiB2ZWwgaXBzdW0gc2l0IGFtZXQgYWxpcXVldC4gRG9uZWMgdGluY2lkdW50IHRlbXB1cyBlc3QgYSBtYWxlc3VhZGEuJztcbiAgc2VsZWN0aW9uID0gJyc7XG4gIHBvc2l0aW9uO1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9yaWdpbikge1xuXG4gICAgICAgIGNhc2UgKCdtYXJrZXInKTpcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMucmVwbGFjZUF0KHRoaXMuY29udGVudCwgdGhpcy5wb3NpdGlvbiwgYDxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtldmVudC5jb2xvcn07XCI+JHt0aGlzLnNlbGVjdGlvbn08L3NwYW4+YCk7XG4gICAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICgndGV4dGFyZWEnKTpcbiAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IGV2ZW50LnNlbGVjdGlvbi50b1N0cmluZygpO1xuICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7c3RhcnRzOiBldmVudC5zZWxlY3Rpb24uYW5jaG9yT2Zmc2V0LCBlbmRzOiBldmVudC5zZWxlY3Rpb24uZm9jdXNPZmZzZXR9O1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cbiAgaGFuZGxlU2VsZWN0aW9uKCRldmVudDogTW91c2VFdmVudCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbjogU2VsZWN0aW9uID0gJGV2ZW50LnZpZXcuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbi50eXBlID09PSAnUmFuZ2UnKSB7XG4gICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7XG4gICAgICAgICAgb3JpZ2luOiAndGV4dGFyZWEnLFxuICAgICAgICAgIHR5cGU6ICdzZWxlY3Rpb24nLFxuICAgICAgICAgIG1vdXNlRXZlbnQ6ICRldmVudCxcbiAgICAgICAgICBzZWxlY3Rpb246IHNlbGVjdGlvbixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSAkZXZlbnQudGFyZ2V0LmlubmVySFRNTDtcbiAgfVxuXG4gIC8vIFJlcGxhY2Ugc3RyaW5nIGF0IHNwZWNpZmljIHBvc2l0aW9uIChuYXRpdmUgcmVwbGFjZSgpIG1ldGhvZCB3aWxsIGp1c3QgcmVwbGFjZSB0aGUgZmlyc3Qgb2NjdXJhbmNlKVxuICByZXBsYWNlQXQoc3RyaW5nLCBwb3NpdGlvbiwgcmVwbGFjZSkge1xuICAgIHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKDAsIHBvc2l0aW9uLnN0YXJ0cykgKyByZXBsYWNlICsgc3RyaW5nLnN1YnN0cmluZyhwb3NpdGlvbi5lbmRzKTtcbiAgfVxuXG59XG5cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtc3RvcmVkLWhpZ2hsaWdodHMnLFxuICB0ZW1wbGF0ZTogYDxwPlxuICBzdG9yZWQtaGlnaGxpZ2h0cyB3b3JrcyFcbjwvcD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1tYXJrZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb2xvcnNcIj5cbiAgPGRpdiBjbGFzcz1cImNvbG9yXCIgKm5nRm9yPVwibGV0IGNvbG9yIG9mIGNvbG9yc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9yfVwiIChjbGljayk9XCJtYXJrKGNvbG9yKVwiPjwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmNvbG9yc3t3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcH0uY29sb3J7d2lkdGg6NTBweDtoZWlnaHQ6NTBweDttYXJnaW46MCAxMHB4IDEwcHggMDtjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTt0cmFuc2l0aW9uOi4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKX0uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCU7Ym94LXNoYWRvdzowIDEwcHggMTBweCByZ2JhKDAsMCwwLC4yNSksMCA1cHggNXB4IHJnYmEoMCwwLDAsLjIyKX1gXVxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb2xvcnMgPSBbJyNmNDQzMzYnLCAnI2ZmZWIzYicsICcjNGNhZjUwJ107XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbWFyayhjb2xvcikge1xuICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtcbiAgICAgIG9yaWdpbjogJ21hcmtlcicsXG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVZhbHVlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3NhZmVIdG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBTYWZlSHRtbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIHRyYW5zZm9ybShodG1sOiBzdHJpbmcpOiBTYWZlVmFsdWUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dGFyZWFDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGV4dGFyZWEvdGV4dGFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2FmZUh0bWxQaXBlIH0gZnJvbSAnLi9waXBlcy9zYWZlLWh0bWwucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50LFxuICAgIFRleHRhcmVhQ29tcG9uZW50LFxuICAgIFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIFNhZmVIdG1sUGlwZVxuICBdLFxuICBleHBvcnRzOiBbTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtJQU9FO0tBQWlCOztnQkFMbEIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7b0NBSkQ7Ozs7Ozs7QUNBQTtJQVFFO3FCQUYyQixJQUFJLFlBQVksRUFBRTtLQUU1Qjs7Ozs7O0lBRWpCLGdDQUFROzs7O0lBQVIsVUFBUyxLQUFLO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDeEI7Ozs7O0lBR0QsOEJBQU07OztJQUFOO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COztnQkFmRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7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