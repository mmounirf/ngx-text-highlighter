import { Injectable, Pipe, EventEmitter, Component, Input, ViewChild, Inject, Output, NgModule, defineInjectable } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';

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
        this.markerStyle = 'fixed';
        this.colors = ['#f44336', '#ffeb3b', '#4caf50'];
    }
    /**
     * @return {?}
     */
    NgxTextHighlighterComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.colors.length < 1) {
            this.colors = ['#f44336', '#ffeb3b', '#4caf50'];
        }
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
                    template: "\n    <th-marker [markerStyle]=\"markerStyle\" [colors]=\"colors\"></th-marker>\n    <th-textarea></th-textarea>\n    <th-stored-highlights [filters]=\"colors\"></th-stored-highlights>\n  ",
                    styles: []
                },] },
    ];
    /** @nocollapse */
    NgxTextHighlighterComponent.ctorParameters = function () { return [
        { type: EventsService }
    ]; };
    NgxTextHighlighterComponent.propDecorators = {
        textSelection: [{ type: Output }],
        markerStyle: [{ type: Input, args: ['markerStyle',] }],
        colors: [{ type: Input, args: ['colors',] }]
    };
    return NgxTextHighlighterComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var TextareaComponent = /** @class */ (function () {
    function TextareaComponent(_document, events) {
        this._document = _document;
        this.events = events;
        this.blur = new EventEmitter();
    }
    /**
     * @return {?}
     */
    TextareaComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Listen to events
        this.events.listen().subscribe(function (event) {
            // Marker events
            if (event.origin === 'marker' && event.type === 'highlight') {
                // Highlight text
                // Highlight text
                _this.marker(event.color, _this.selectedText);
            }
        });
    };
    /**
     * @return {?}
     */
    TextareaComponent.prototype.restoreSelection = /**
     * @return {?}
     */
    function () {
        if (this.savedSelection) {
            if (window.getSelection) {
                /** @type {?} */
                var sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(this.savedSelection);
                return true;
            }
            else if (this._document.getSelection) {
                return true;
            }
        }
        else {
            return false;
        }
    };
    /**
     * @param {?} color
     * @param {?} text
     * @return {?}
     */
    TextareaComponent.prototype.marker = /**
     * @param {?} color
     * @param {?} text
     * @return {?}
     */
    function (color, text) {
        // We have a selection?
        if (this.restoreSelection()) {
            // Execute background color
            this._document.execCommand('hiliteColor', false, color);
            // Trigger stored highlights
            this.events.dispatch({ origin: 'textarea', type: 'store', color: color, text: text });
        }
    };
    /**
     * @return {?}
     */
    TextareaComponent.prototype.onTextAreaBlur = /**
     * @return {?}
     */
    function () {
        // Browser supports getSelection()?
        if (window.getSelection) {
            /** @type {?} */
            var selection = window.getSelection();
            // Browser support range?
            if (selection.getRangeAt && selection.rangeCount) {
                // Get range and selected text
                this.savedSelection = selection.getRangeAt(0);
                this.selectedText = selection.toString();
            }
        }
        else if (this._document.getSelection && this._document.createRange) {
            this.savedSelection = document.createRange();
        }
        else {
            this.savedSelection = null;
        }
    };
    // Get selection before blur (for floating marker)
    /**
     * @param {?} $event
     * @return {?}
     */
    TextareaComponent.prototype.onSelection = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        /** @type {?} */
        var selection = window.getSelection();
        if (selection.type === 'Range') {
            this.events.dispatch({ origin: 'textarea', type: 'selection', value: selection });
        }
        // Selection is not a range, means the user just places caret in another place, let's let the floating marker knows about it
        if (selection.type !== 'Range') {
            this.events.dispatch({ origin: 'textarea', type: 'blur' });
        }
    };
    /**
     * @return {?}
     */
    TextareaComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.events.listen().unsubscribe();
    };
    TextareaComponent.decorators = [
        { type: Component, args: [{
                    selector: 'th-textarea',
                    template: "    <div class=\"textarea\"\n        (mouseup)=\"onSelection($event)\"\n        [attr.contenteditable]=\"true\"\n        (blur)=\"onTextAreaBlur()\"\n        placeholder=\"Enter text here...\"\n    >\n    </div>\n",
                    styles: [".textarea{height:250px;overflow:auto;background-color:#fff;padding:20px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);border-radius:4px;line-height:2em}.textarea:focus{outline:0}[contenteditable=true]:empty:before{content:attr(placeholder);display:block;color:#676767}"]
                },] },
    ];
    /** @nocollapse */
    TextareaComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: EventsService }
    ]; };
    TextareaComponent.propDecorators = {
        blur: [{ type: Output }]
    };
    return TextareaComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var StoredHighlightsComponent = /** @class */ (function () {
    function StoredHighlightsComponent(events) {
        this.events = events;
        this.store = [];
        this.selectedFilters = [];
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
    /**
     * @param {?} filter
     * @return {?}
     */
    StoredHighlightsComponent.prototype.setFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        // Check first if filter exists, if yes it will remove the filter if not it will push it to the selectedFilters
        this.isSelected(filter) ? this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1) : this.selectedFilters.push(filter);
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    StoredHighlightsComponent.prototype.isSelected = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        return this.selectedFilters.includes(filter);
    };
    /**
     * @return {?}
     */
    StoredHighlightsComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.events.listen().unsubscribe();
    };
    StoredHighlightsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'th-stored-highlights',
                    template: "<div class=\"storage-wrapper\">\n  <ul class=\"storage-filters\">\n    <li *ngFor=\"let filter of filters\" [ngStyle]=\"{'background-color': filter}\" [ngClass]=\"isSelected(filter) ? 'selected' : ''\" (click)=\"setFilter(filter)\"></li>\n  </ul>\n  <div class=\"storage-list\">\n    <span *ngIf=\"(store | colorFilter:selectedFilters).length < 1 && store.length > 0\">No items matches the selected filter</span>\n    <span *ngIf=\"store.length < 1\">You've no highlighted items</span>\n    <p *ngFor=\"let item of store | colorFilter:selectedFilters\" [ngStyle]=\"{'background-color': item.color}\">{{item.text}}</p>\n  </div>\n</div>\n",
                    styles: [".storage-wrapper{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}ul.storage-filters{display:flex;margin:20px 0 0;background-color:#e1e1e1;padding:20px;border-radius:4px 4px 0 0}.storage-filters li{width:30px;height:30px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);list-style:none;margin-right:10px;position:relative}.storage-filters li.selected:after{position:absolute;content:'\\2713';font-size:25px;color:#fff;font-weight:bolder;text-align:center;width:30px;height:30px}div.storage-list{display:inline-block;padding:20px}.storage-list span{color:#676767}.storage-list p{padding:10px;margin:10px 0;float:left;clear:left;border-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:box-shadow .3s cubic-bezier(.25,.8,.25,1);cursor:pointer}.storage-list p:hover{box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)}"]
                },] },
    ];
    /** @nocollapse */
    StoredHighlightsComponent.ctorParameters = function () { return [
        { type: EventsService }
    ]; };
    StoredHighlightsComponent.propDecorators = {
        store: [{ type: Input, args: ['store',] }],
        filters: [{ type: Input, args: ['filters',] }]
    };
    return StoredHighlightsComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var MarkerComponent = /** @class */ (function () {
    function MarkerComponent(events) {
        this.events = events;
        this.positionX = 0;
        this.positionY = 0;
        this.visibility = 'hidden';
        this.markerStyle = 'fixed';
        this.colors = ['#f44336', '#ffeb3b', '#4caf50'];
    }
    /**
     * @return {?}
     */
    MarkerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.events.listen().subscribe(function (event) {
            // Event from textarea regarding text selection and marker style is set to float
            if (event.origin === 'textarea' && event.type === 'selection' && _this.markerStyle === 'float') {
                /** @type {?} */
                var markerWidth = window.getComputedStyle(_this.floatingMarker.nativeElement).width;
                /** @type {?} */
                var selectionWidth = event.value.getRangeAt(0).getBoundingClientRect().width;
                /** @type {?} */
                var xCenter = (parseInt(markerWidth, 0) - selectionWidth) / 2;
                _this.positionX = event.value.getRangeAt(0).getBoundingClientRect().left - xCenter;
                // 64px = 4em (double the line height)
                // 64px = 4em (double the line height)
                _this.positionY = event.value.getRangeAt(0).getBoundingClientRect().top - 64;
                // Let's show our floating marker
                // Let's show our floating marker
                _this.visibility = 'visible';
            }
            // Event from textarea regarding losing focus and marker style is set to float
            if (event.origin === 'textarea' && event.type === 'blur' && _this.markerStyle === 'float') {
                // Let's hide our floating marker
                // Let's hide our floating marker
                _this.visibility = 'hidden';
            }
        });
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
    /**
     * @return {?}
     */
    MarkerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.events.listen().unsubscribe();
    };
    MarkerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'th-marker',
                    template: "<div class=\"fixed colors\" *ngIf=\"markerStyle === 'fixed'\">\n  <div class=\"color\" *ngFor=\"let color of colors\" [ngStyle]=\"{'background-color': color}\" (click)=\"mark(color)\"></div>\n</div>\n\n<div #floatingMarker class=\"floating colors\" *ngIf=\"markerStyle === 'float'\" [ngStyle]=\"{'left': positionX+'px', 'top': positionY+'px', 'visibility': visibility}\">\n    <div class=\"color\" *ngFor=\"let color of colors\" [ngStyle]=\"{'background-color': color}\" (click)=\"mark(color)\"></div>\n</div>\n",
                    styles: [".colors.fixed{width:100%;display:flex;flex-wrap:wrap}.fixed>.color{width:30px;height:30px;margin:0 10px 10px 0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:.3s cubic-bezier(.25,.8,.25,1)}.fixed>.color:hover{border-radius:50%;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.colors.floating{position:absolute;width:auto;background-color:#404040;border-radius:4px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);transition:top .3s cubic-bezier(.25,.8,.25,1);display:flex}.floating>.color{margin:10px;cursor:pointer;width:30px;height:30px;transition:top .3s cubic-bezier(.25,.8,.25,1),border-radius .3s cubic-bezier(.25,.8,.25,1);z-index:10}.floating>.color:hover{border-radius:50%}.floating.colors:after{content:'';display:block;position:absolute;background-color:#404040;width:20px;height:20px;bottom:-5px;left:calc(50% - 10px);-webkit-transform:rotate(45deg);transform:rotate(45deg);z-index:1}"]
                },] },
    ];
    /** @nocollapse */
    MarkerComponent.ctorParameters = function () { return [
        { type: EventsService }
    ]; };
    MarkerComponent.propDecorators = {
        markerStyle: [{ type: Input, args: ['markerStyle',] }],
        colors: [{ type: Input, args: ['colors',] }],
        floatingMarker: [{ type: ViewChild, args: ['floatingMarker',] }]
    };
    return MarkerComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var ColorFilterPipe = /** @class */ (function () {
    function ColorFilterPipe() {
    }
    // Items are sotred selections, args are selected filters
    /**
     * @param {?} items
     * @param {?} args
     * @return {?}
     */
    ColorFilterPipe.prototype.transform = /**
     * @param {?} items
     * @param {?} args
     * @return {?}
     */
    function (items, args) {
        var _this = this;
        // If args are not defined or empty
        if (args.length === 0 || !args) {
            // Return all items
            return items;
        }
        else {
            // Return only items with color value existing in args (selected filters)
            return items.filter(function (item) { return _this.isFilterExist(item.color, args); });
        }
    };
    // Check if item color included in the selected filters (args)
    /**
     * @param {?} itemColor
     * @param {?} args
     * @return {?}
     */
    ColorFilterPipe.prototype.isFilterExist = /**
     * @param {?} itemColor
     * @param {?} args
     * @return {?}
     */
    function (itemColor, args) {
        return args.includes(itemColor);
    };
    ColorFilterPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'colorFilter',
                    pure: false
                },] },
    ];
    return ColorFilterPipe;
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
                        ColorFilterPipe
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

export { NgxTextHighlighterService, NgxTextHighlighterComponent, NgxTextHighlighterModule, MarkerComponent as ɵd, StoredHighlightsComponent as ɵc, TextareaComponent as ɵb, ColorFilterPipe as ɵe, EventsService as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvc2VydmljZXMvZXZlbnRzLnNlcnZpY2UudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL3BpcGVzL2NvbG9yLWZpbHRlci5waXBlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBFdmVudHNTZXJ2aWNlIHtcbiAgZXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIC8vIERpc3BhdGNoIGV2ZW50cyBhY3Jvc3MgY29tcG9uZW50c1xuICBkaXNwYXRjaChldmVudCkge1xuICAgIHRoaXMuZXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvLyBMaXN0ZW5zIHRvIGRpc3BhdGNoZWQgZXZlbnRzXG4gIGxpc3RlbigpIHtcbiAgICByZXR1cm4gdGhpcy5ldmVudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRoLW1hcmtlciBbbWFya2VyU3R5bGVdPVwibWFya2VyU3R5bGVcIiBbY29sb3JzXT1cImNvbG9yc1wiPjwvdGgtbWFya2VyPlxuICAgIDx0aC10ZXh0YXJlYT48L3RoLXRleHRhcmVhPlxuICAgIDx0aC1zdG9yZWQtaGlnaGxpZ2h0cyBbZmlsdGVyc109XCJjb2xvcnNcIj48L3RoLXN0b3JlZC1oaWdobGlnaHRzPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQE91dHB1dCgpIHRleHRTZWxlY3Rpb246IEV2ZW50RW1pdHRlcjx7fT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgnbWFya2VyU3R5bGUnKSBtYXJrZXJTdHlsZSA9ICdmaXhlZCc7XG4gIEBJbnB1dCgnY29sb3JzJykgY29sb3JzID0gWycjZjQ0MzM2JywgJyNmZmViM2InLCAnIzRjYWY1MCddO1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmNvbG9ycy5sZW5ndGggPCAxKSB7XG4gICAgICB0aGlzLmNvbG9ycyA9IFsnI2Y0NDMzNicsICcjZmZlYjNiJywgJyM0Y2FmNTAnXTtcbiAgICB9XG4gICAgLy8gTGlzdGVucyB0byBldmVudHMgZnJvbSBjaGlsZCBjb21wb25lbnRzXG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIC8vIENoZWNrIGV2ZW50IG9yaWdpbiAod2hpY2ggY29tcG9uZW50IGRpc3BhdGNoZWQgdGhpcyBldmVudClcbiAgICAgIHN3aXRjaCAoZXZlbnQub3JpZ2luKSB7XG4gICAgICAgIC8vIEV2ZW50cyBjb21pbmcgZnJvbSB0aGUgdGV4dGFyZWEgY29tcG9uZW50XG4gICAgICAgIGNhc2UgKCd0ZXh0YXJlYScpOlxuICAgICAgICAgIC8vIEVtaXQgZXZlbnQgdG8gdGhlIGxpYnJhcnkgY29tcG9uZW50IG91dHB1dFxuICAgICAgICAgIHRoaXMudGV4dFNlbGVjdGlvbi5lbWl0KHtzZWxlY3Rpb246IGV2ZW50LnNlbGVjdGlvbiwgbW91c2VFdmVudDogZXZlbnQubW91c2VFdmVudH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbmplY3QsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLXRleHRhcmVhJyxcbiAgdGVtcGxhdGU6IGAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhXCJcbiAgICAgICAgKG1vdXNldXApPVwib25TZWxlY3Rpb24oJGV2ZW50KVwiXG4gICAgICAgIFthdHRyLmNvbnRlbnRlZGl0YWJsZV09XCJ0cnVlXCJcbiAgICAgICAgKGJsdXIpPVwib25UZXh0QXJlYUJsdXIoKVwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGV4dCBoZXJlLi4uXCJcbiAgICA+XG4gICAgPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnRleHRhcmVhe2hlaWdodDoyNTBweDtvdmVyZmxvdzphdXRvO2JhY2tncm91bmQtY29sb3I6I2ZmZjtwYWRkaW5nOjIwcHg7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpO2JvcmRlci1yYWRpdXM6NHB4O2xpbmUtaGVpZ2h0OjJlbX0udGV4dGFyZWE6Zm9jdXN7b3V0bGluZTowfVtjb250ZW50ZWRpdGFibGU9dHJ1ZV06ZW1wdHk6YmVmb3Jle2NvbnRlbnQ6YXR0cihwbGFjZWhvbGRlcik7ZGlzcGxheTpibG9jaztjb2xvcjojNjc2NzY3fWBdXG59KVxuXG5leHBvcnQgY2xhc3MgVGV4dGFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSAge1xuICBzYXZlZFNlbGVjdGlvbjogUmFuZ2UgfCBudWxsO1xuICBzZWxlY3RlZFRleHQ6IHN0cmluZztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0IChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIExpc3RlbiB0byBldmVudHNcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvLyBNYXJrZXIgZXZlbnRzXG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAnbWFya2VyJyAmJiBldmVudC50eXBlID09PSAnaGlnaGxpZ2h0Jykge1xuICAgICAgICAvLyBIaWdobGlnaHQgdGV4dFxuICAgICAgICB0aGlzLm1hcmtlcihldmVudC5jb2xvciwgdGhpcy5zZWxlY3RlZFRleHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzdG9yZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5zYXZlZFNlbGVjdGlvbikge1xuICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbC5hZGRSYW5nZSh0aGlzLnNhdmVkU2VsZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2RvY3VtZW50LmdldFNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtlcihjb2xvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBXZSBoYXZlIGEgc2VsZWN0aW9uP1xuICAgIGlmICh0aGlzLnJlc3RvcmVTZWxlY3Rpb24oKSkge1xuICAgICAgLy8gRXhlY3V0ZSBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICB0aGlzLl9kb2N1bWVudC5leGVjQ29tbWFuZCgnaGlsaXRlQ29sb3InLCBmYWxzZSwgY29sb3IpO1xuICAgICAgLy8gVHJpZ2dlciBzdG9yZWQgaGlnaGxpZ2h0c1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe29yaWdpbjogJ3RleHRhcmVhJywgdHlwZTogJ3N0b3JlJywgY29sb3I6IGNvbG9yLCB0ZXh0OiB0ZXh0fSk7XG4gICAgfVxuICB9XG4gIG9uVGV4dEFyZWFCbHVyKCkge1xuICAgIC8vIEJyb3dzZXIgc3VwcG9ydHMgZ2V0U2VsZWN0aW9uKCk/XG4gICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIC8vIEdldCBzZWxlY3Rpb25cbiAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIC8vIEJyb3dzZXIgc3VwcG9ydCByYW5nZT9cbiAgICAgIGlmIChzZWxlY3Rpb24uZ2V0UmFuZ2VBdCAmJiBzZWxlY3Rpb24ucmFuZ2VDb3VudCkge1xuICAgICAgICAvLyBHZXQgcmFuZ2UgYW5kIHNlbGVjdGVkIHRleHRcbiAgICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGV4dCA9IHNlbGVjdGlvbi50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fZG9jdW1lbnQuZ2V0U2VsZWN0aW9uICYmIHRoaXMuX2RvY3VtZW50LmNyZWF0ZVJhbmdlKSB7XG4gICAgICB0aGlzLnNhdmVkU2VsZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gIH1cblxuICAvLyBHZXQgc2VsZWN0aW9uIGJlZm9yZSBibHVyIChmb3IgZmxvYXRpbmcgbWFya2VyKVxuICBvblNlbGVjdGlvbigkZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbi50eXBlID09PSAnUmFuZ2UnKSB7XG4gICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7b3JpZ2luOiAndGV4dGFyZWEnLCB0eXBlOiAnc2VsZWN0aW9uJywgdmFsdWU6IHNlbGVjdGlvbn0pO1xuICAgIH1cblxuICAgIC8vIFNlbGVjdGlvbiBpcyBub3QgYSByYW5nZSwgbWVhbnMgdGhlIHVzZXIganVzdCBwbGFjZXMgY2FyZXQgaW4gYW5vdGhlciBwbGFjZSwgbGV0J3MgbGV0IHRoZSBmbG9hdGluZyBtYXJrZXIga25vd3MgYWJvdXQgaXRcbiAgICBpZiAoc2VsZWN0aW9uLnR5cGUgIT09ICdSYW5nZScpIHtcbiAgICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtvcmlnaW46ICd0ZXh0YXJlYScsIHR5cGU6ICdibHVyJ30pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtc3RvcmVkLWhpZ2hsaWdodHMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJzdG9yYWdlLXdyYXBwZXJcIj5cbiAgPHVsIGNsYXNzPVwic3RvcmFnZS1maWx0ZXJzXCI+XG4gICAgPGxpICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgZmlsdGVyc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGZpbHRlcn1cIiBbbmdDbGFzc109XCJpc1NlbGVjdGVkKGZpbHRlcikgPyAnc2VsZWN0ZWQnIDogJydcIiAoY2xpY2spPVwic2V0RmlsdGVyKGZpbHRlcilcIj48L2xpPlxuICA8L3VsPlxuICA8ZGl2IGNsYXNzPVwic3RvcmFnZS1saXN0XCI+XG4gICAgPHNwYW4gKm5nSWY9XCIoc3RvcmUgfCBjb2xvckZpbHRlcjpzZWxlY3RlZEZpbHRlcnMpLmxlbmd0aCA8IDEgJiYgc3RvcmUubGVuZ3RoID4gMFwiPk5vIGl0ZW1zIG1hdGNoZXMgdGhlIHNlbGVjdGVkIGZpbHRlcjwvc3Bhbj5cbiAgICA8c3BhbiAqbmdJZj1cInN0b3JlLmxlbmd0aCA8IDFcIj5Zb3UndmUgbm8gaGlnaGxpZ2h0ZWQgaXRlbXM8L3NwYW4+XG4gICAgPHAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RvcmUgfCBjb2xvckZpbHRlcjpzZWxlY3RlZEZpbHRlcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBpdGVtLmNvbG9yfVwiPnt7aXRlbS50ZXh0fX08L3A+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnN0b3JhZ2Utd3JhcHBlcntib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMil9dWwuc3RvcmFnZS1maWx0ZXJze2Rpc3BsYXk6ZmxleDttYXJnaW46MjBweCAwIDA7YmFja2dyb3VuZC1jb2xvcjojZTFlMWUxO3BhZGRpbmc6MjBweDtib3JkZXItcmFkaXVzOjRweCA0cHggMCAwfS5zdG9yYWdlLWZpbHRlcnMgbGl7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDtjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luLXJpZ2h0OjEwcHg7cG9zaXRpb246cmVsYXRpdmV9LnN0b3JhZ2UtZmlsdGVycyBsaS5zZWxlY3RlZDphZnRlcntwb3NpdGlvbjphYnNvbHV0ZTtjb250ZW50OidcXFxcMjcxMyc7Zm9udC1zaXplOjI1cHg7Y29sb3I6I2ZmZjtmb250LXdlaWdodDpib2xkZXI7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MzBweDtoZWlnaHQ6MzBweH1kaXYuc3RvcmFnZS1saXN0e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MjBweH0uc3RvcmFnZS1saXN0IHNwYW57Y29sb3I6IzY3Njc2N30uc3RvcmFnZS1saXN0IHB7cGFkZGluZzoxMHB4O21hcmdpbjoxMHB4IDA7ZmxvYXQ6bGVmdDtjbGVhcjpsZWZ0O2JvcmRlci1yYWRpdXM6NHB4O2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO3RyYW5zaXRpb246Ym94LXNoYWRvdyAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7Y3Vyc29yOnBvaW50ZXJ9LnN0b3JhZ2UtbGlzdCBwOmhvdmVye2JveC1zaGFkb3c6MCAxNHB4IDI4cHggcmdiYSgwLDAsMCwuMjUpLDAgMTBweCAxMHB4IHJnYmEoMCwwLDAsLjIyKX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ3N0b3JlJykgc3RvcmUgPSBbXTtcbiAgQElucHV0KCdmaWx0ZXJzJykgZmlsdGVycztcbiAgc2VsZWN0ZWRGaWx0ZXJzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ3N0b3JlJykge1xuICAgICAgICB0aGlzLnN0b3JlLnB1c2goe3RleHQ6IGV2ZW50LnRleHQsIGNvbG9yOiBldmVudC5jb2xvcn0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBzZXRGaWx0ZXIoZmlsdGVyKSB7XG4gICAgLy8gQ2hlY2sgZmlyc3QgaWYgZmlsdGVyIGV4aXN0cywgaWYgeWVzIGl0IHdpbGwgcmVtb3ZlIHRoZSBmaWx0ZXIgaWYgbm90IGl0IHdpbGwgcHVzaCBpdCB0byB0aGUgc2VsZWN0ZWRGaWx0ZXJzXG4gICAgdGhpcy5pc1NlbGVjdGVkKGZpbHRlcikgPyB0aGlzLnNlbGVjdGVkRmlsdGVycy5zcGxpY2UodGhpcy5zZWxlY3RlZEZpbHRlcnMuaW5kZXhPZihmaWx0ZXIpLCAxKSA6IHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoZmlsdGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLmluY2x1ZGVzKGZpbHRlcik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtbWFya2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZml4ZWQgY29sb3JzXCIgKm5nSWY9XCJtYXJrZXJTdHlsZSA9PT0gJ2ZpeGVkJ1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sb3JcIiAqbmdGb3I9XCJsZXQgY29sb3Igb2YgY29sb3JzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3J9XCIgKGNsaWNrKT1cIm1hcmsoY29sb3IpXCI+PC9kaXY+XG48L2Rpdj5cblxuPGRpdiAjZmxvYXRpbmdNYXJrZXIgY2xhc3M9XCJmbG9hdGluZyBjb2xvcnNcIiAqbmdJZj1cIm1hcmtlclN0eWxlID09PSAnZmxvYXQnXCIgW25nU3R5bGVdPVwieydsZWZ0JzogcG9zaXRpb25YKydweCcsICd0b3AnOiBwb3NpdGlvblkrJ3B4JywgJ3Zpc2liaWxpdHknOiB2aXNpYmlsaXR5fVwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2xvclwiICpuZ0Zvcj1cImxldCBjb2xvciBvZiBjb2xvcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvcn1cIiAoY2xpY2spPVwibWFyayhjb2xvcilcIj48L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5jb2xvcnMuZml4ZWR7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXB9LmZpeGVkPi5jb2xvcnt3aWR0aDozMHB4O2hlaWdodDozMHB4O21hcmdpbjowIDEwcHggMTBweCAwO2N1cnNvcjpwb2ludGVyO2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO3RyYW5zaXRpb246LjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpfS5maXhlZD4uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCU7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfS5jb2xvcnMuZmxvYXRpbmd7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiM0MDQwNDA7Ym9yZGVyLXJhZGl1czo0cHg7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpO3RyYW5zaXRpb246dG9wIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtkaXNwbGF5OmZsZXh9LmZsb2F0aW5nPi5jb2xvcnttYXJnaW46MTBweDtjdXJzb3I6cG9pbnRlcjt3aWR0aDozMHB4O2hlaWdodDozMHB4O3RyYW5zaXRpb246dG9wIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKSxib3JkZXItcmFkaXVzIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTt6LWluZGV4OjEwfS5mbG9hdGluZz4uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCV9LmZsb2F0aW5nLmNvbG9yczphZnRlcntjb250ZW50OicnO2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjojNDA0MDQwO3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7Ym90dG9tOi01cHg7bGVmdDpjYWxjKDUwJSAtIDEwcHgpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7ei1pbmRleDoxfWBdXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95ICB7XG4gIHBvc2l0aW9uWCA9IDA7XG4gIHBvc2l0aW9uWSA9IDA7XG4gIHZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgQElucHV0KCdtYXJrZXJTdHlsZScpIG1hcmtlclN0eWxlID0gJ2ZpeGVkJztcbiAgQElucHV0KCdjb2xvcnMnKSBjb2xvcnMgPSBbJyNmNDQzMzYnLCAnI2ZmZWIzYicsICcjNGNhZjUwJ107XG4gIEBWaWV3Q2hpbGQoJ2Zsb2F0aW5nTWFya2VyJykgZmxvYXRpbmdNYXJrZXI6IGFueTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLy8gRXZlbnQgZnJvbSB0ZXh0YXJlYSByZWdhcmRpbmcgdGV4dCBzZWxlY3Rpb24gYW5kIG1hcmtlciBzdHlsZSBpcyBzZXQgdG8gZmxvYXRcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ3NlbGVjdGlvbicgJiYgdGhpcy5tYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICAvLyBPdXIgbWFrZXIgd2lkdGggaXMgYXV0byAoVE9ETzogY29sb3JzIGNhbiBiZSBhZGRlZCBhcyBhbiBpbnB1dCksIGxldCdzIGdldCBpdHMgY29tcHV0ZWQgd2lkdGhcbiAgICAgICAgY29uc3QgbWFya2VyV2lkdGggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmZsb2F0aW5nTWFya2VyLm5hdGl2ZUVsZW1lbnQpLndpZHRoO1xuICAgICAgICAvLyBTZWxlY3Rpb24gd2lkdGggYW5kIGhlaWdodCBmcm9tIHJhbmdlIGJvdW5kaW5nIHJlY3RhbmdsZVxuICAgICAgICBjb25zdCBzZWxlY3Rpb25XaWR0aCA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGNvbnN0IHhDZW50ZXIgPSAocGFyc2VJbnQobWFya2VyV2lkdGgsIDApIC0gc2VsZWN0aW9uV2lkdGgpIC8gMjtcblxuXG4gICAgICAgIHRoaXMucG9zaXRpb25YID0gZXZlbnQudmFsdWUuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0geENlbnRlcjtcbiAgICAgICAgLy8gNjRweCA9IDRlbSAoZG91YmxlIHRoZSBsaW5lIGhlaWdodClcbiAgICAgICAgdGhpcy5wb3NpdGlvblkgPSBldmVudC52YWx1ZS5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIDY0O1xuXG4gICAgICAgIC8vIExldCdzIHNob3cgb3VyIGZsb2F0aW5nIG1hcmtlclxuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICB9XG5cbiAgICAgIC8vIEV2ZW50IGZyb20gdGV4dGFyZWEgcmVnYXJkaW5nIGxvc2luZyBmb2N1cyBhbmQgbWFya2VyIHN0eWxlIGlzIHNldCB0byBmbG9hdFxuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ3RleHRhcmVhJyAmJiBldmVudC50eXBlID09PSAnYmx1cicgJiYgdGhpcy5tYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICAvLyBMZXQncyBoaWRlIG91ciBmbG9hdGluZyBtYXJrZXJcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBtYXJrKGNvbG9yKSB7XG4gICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe1xuICAgICAgb3JpZ2luOiAnbWFya2VyJyxcbiAgICAgIHR5cGU6ICdoaWdobGlnaHQnLFxuICAgICAgY29sb3I6IGNvbG9yXG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NvbG9yRmlsdGVyJyxcbiAgcHVyZTogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgQ29sb3JGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIC8vIEl0ZW1zIGFyZSBzb3RyZWQgc2VsZWN0aW9ucywgYXJncyBhcmUgc2VsZWN0ZWQgZmlsdGVyc1xuICB0cmFuc2Zvcm0oaXRlbXM6IGFueVtdLCBhcmdzOiBhbnlbXSkge1xuICAgIC8vIElmIGFyZ3MgYXJlIG5vdCBkZWZpbmVkIG9yIGVtcHR5XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwIHx8ICFhcmdzKSB7XG4gICAgICAvLyBSZXR1cm4gYWxsIGl0ZW1zXG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJldHVybiBvbmx5IGl0ZW1zIHdpdGggY29sb3IgdmFsdWUgZXhpc3RpbmcgaW4gYXJncyAoc2VsZWN0ZWQgZmlsdGVycylcbiAgICAgIHJldHVybiBpdGVtcy5maWx0ZXIoaXRlbSA9PiB0aGlzLmlzRmlsdGVyRXhpc3QoaXRlbS5jb2xvciwgYXJncykpO1xuICAgIH1cbiAgfVxuXG4gIC8vIENoZWNrIGlmIGl0ZW0gY29sb3IgaW5jbHVkZWQgaW4gdGhlIHNlbGVjdGVkIGZpbHRlcnMgKGFyZ3MpXG4gIGlzRmlsdGVyRXhpc3QoaXRlbUNvbG9yLCBhcmdzKSB7XG4gICAgcmV0dXJuIGFyZ3MuaW5jbHVkZXMoaXRlbUNvbG9yKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dGFyZWFDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGV4dGFyZWEvdGV4dGFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29sb3JGaWx0ZXJQaXBlIH0gZnJvbSAnLi9waXBlcy9jb2xvci1maWx0ZXIucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50LFxuICAgIFRleHRhcmVhQ29tcG9uZW50LFxuICAgIFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIENvbG9yRmlsdGVyUGlwZVxuICBdLFxuICBleHBvcnRzOiBbTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0lBT0U7S0FBaUI7O2dCQUxsQixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7OztvQ0FKRDs7Ozs7OztBQ0FBO0lBUUU7cUJBRjJCLElBQUksWUFBWSxFQUFFO0tBRTVCOzs7Ozs7SUFFakIsZ0NBQVE7Ozs7SUFBUixVQUFTLEtBQUs7UUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4Qjs7Ozs7SUFHRCw4QkFBTTs7O0lBQU47UUFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7S0FDbkI7O2dCQWZGLFVBQVUsU0FBQztvQkFDVixVQUFVLEVBQUUsTUFBTTtpQkFDbkI7Ozs7O3dCQUpEOzs7Ozs7O0FDQUE7SUFnQkUscUNBQXNCLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7NkJBSEMsSUFBSSxZQUFZLEVBQUU7MkJBQzFCLE9BQU87c0JBQ2pCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7S0FDWjs7OztJQUUvQyw4Q0FBUTs7O0lBQVI7UUFBQSxpQkFtQkM7UUFsQkMsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLFNBQVMsRUFBRSxT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