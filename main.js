(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./dist/ngx-text-highlighter/fesm5/ngx-text-highlighter.js":
/*!*****************************************************************!*\
  !*** ./dist/ngx-text-highlighter/fesm5/ngx-text-highlighter.js ***!
  \*****************************************************************/
/*! exports provided: NgxTextHighlighterService, NgxTextHighlighterComponent, NgxTextHighlighterModule, ɵd, ɵc, ɵb, ɵe, ɵa */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxTextHighlighterService", function() { return NgxTextHighlighterService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxTextHighlighterComponent", function() { return NgxTextHighlighterComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NgxTextHighlighterModule", function() { return NgxTextHighlighterModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return MarkerComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return StoredHighlightsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return TextareaComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function() { return ColorFilterPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return EventsService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common */ "./node_modules/@angular/common/fesm5/common.js");



/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxTextHighlighterService = /** @class */ (function () {
    function NgxTextHighlighterService() {
    }
    NgxTextHighlighterService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    NgxTextHighlighterService.ctorParameters = function () { return []; };
    /** @nocollapse */ NgxTextHighlighterService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function NgxTextHighlighterService_Factory() { return new NgxTextHighlighterService(); }, token: NgxTextHighlighterService, providedIn: "root" });
    return NgxTextHighlighterService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var EventsService = /** @class */ (function () {
    function EventsService() {
        this.event = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"], args: [{
                    providedIn: 'root'
                },] },
    ];
    /** @nocollapse */
    EventsService.ctorParameters = function () { return []; };
    /** @nocollapse */ EventsService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["defineInjectable"])({ factory: function EventsService_Factory() { return new EventsService(); }, token: EventsService, providedIn: "root" });
    return EventsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
var NgxTextHighlighterComponent = /** @class */ (function () {
    function NgxTextHighlighterComponent(events) {
        this.events = events;
        this.textSelection = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
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
        textSelection: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }],
        markerStyle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['markerStyle',] }],
        colors: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['colors',] }]
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
        this.blur = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"]();
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
                    selector: 'th-textarea',
                    template: "    <div class=\"textarea\"\n        (mouseup)=\"onSelection($event)\"\n        [attr.contenteditable]=\"true\"\n        (blur)=\"onTextAreaBlur()\"\n        placeholder=\"Enter text here...\"\n    >\n    </div>\n",
                    styles: [".textarea{height:250px;overflow:auto;background-color:#fff;padding:20px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);border-radius:4px;line-height:2em}.textarea:focus{outline:0}[contenteditable=true]:empty:before{content:attr(placeholder);display:block;color:#676767}"]
                },] },
    ];
    /** @nocollapse */
    TextareaComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Inject"], args: [_angular_common__WEBPACK_IMPORTED_MODULE_1__["DOCUMENT"],] }] },
        { type: EventsService }
    ]; };
    TextareaComponent.propDecorators = {
        blur: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"] }]
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
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
        store: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['store',] }],
        filters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['filters',] }]
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"], args: [{
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
        markerStyle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['markerStyle',] }],
        colors: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Input"], args: ['colors',] }],
        floatingMarker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["ViewChild"], args: ['floatingMarker',] }]
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
        if (!args || args.length === 0) {
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"], args: [{
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
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_1__["CommonModule"]
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



//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvc2VydmljZXMvZXZlbnRzLnNlcnZpY2UudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL3BpcGVzL2NvbG9yLWZpbHRlci5waXBlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBFdmVudHNTZXJ2aWNlIHtcbiAgZXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIC8vIERpc3BhdGNoIGV2ZW50cyBhY3Jvc3MgY29tcG9uZW50c1xuICBkaXNwYXRjaChldmVudCkge1xuICAgIHRoaXMuZXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvLyBMaXN0ZW5zIHRvIGRpc3BhdGNoZWQgZXZlbnRzXG4gIGxpc3RlbigpIHtcbiAgICByZXR1cm4gdGhpcy5ldmVudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRoLW1hcmtlciBbbWFya2VyU3R5bGVdPVwibWFya2VyU3R5bGVcIiBbY29sb3JzXT1cImNvbG9yc1wiPjwvdGgtbWFya2VyPlxuICAgIDx0aC10ZXh0YXJlYT48L3RoLXRleHRhcmVhPlxuICAgIDx0aC1zdG9yZWQtaGlnaGxpZ2h0cyBbZmlsdGVyc109XCJjb2xvcnNcIj48L3RoLXN0b3JlZC1oaWdobGlnaHRzPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQE91dHB1dCgpIHRleHRTZWxlY3Rpb246IEV2ZW50RW1pdHRlcjx7fT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgnbWFya2VyU3R5bGUnKSBtYXJrZXJTdHlsZSA9ICdmaXhlZCc7XG4gIEBJbnB1dCgnY29sb3JzJykgY29sb3JzID0gWycjZjQ0MzM2JywgJyNmZmViM2InLCAnIzRjYWY1MCddO1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmNvbG9ycy5sZW5ndGggPCAxKSB7XG4gICAgICB0aGlzLmNvbG9ycyA9IFsnI2Y0NDMzNicsICcjZmZlYjNiJywgJyM0Y2FmNTAnXTtcbiAgICB9XG4gICAgLy8gTGlzdGVucyB0byBldmVudHMgZnJvbSBjaGlsZCBjb21wb25lbnRzXG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIC8vIENoZWNrIGV2ZW50IG9yaWdpbiAod2hpY2ggY29tcG9uZW50IGRpc3BhdGNoZWQgdGhpcyBldmVudClcbiAgICAgIHN3aXRjaCAoZXZlbnQub3JpZ2luKSB7XG4gICAgICAgIC8vIEV2ZW50cyBjb21pbmcgZnJvbSB0aGUgdGV4dGFyZWEgY29tcG9uZW50XG4gICAgICAgIGNhc2UgKCd0ZXh0YXJlYScpOlxuICAgICAgICAgIC8vIEVtaXQgZXZlbnQgdG8gdGhlIGxpYnJhcnkgY29tcG9uZW50IG91dHB1dFxuICAgICAgICAgIHRoaXMudGV4dFNlbGVjdGlvbi5lbWl0KHtzZWxlY3Rpb246IGV2ZW50LnNlbGVjdGlvbiwgbW91c2VFdmVudDogZXZlbnQubW91c2VFdmVudH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbmplY3QsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLXRleHRhcmVhJyxcbiAgdGVtcGxhdGU6IGAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhXCJcbiAgICAgICAgKG1vdXNldXApPVwib25TZWxlY3Rpb24oJGV2ZW50KVwiXG4gICAgICAgIFthdHRyLmNvbnRlbnRlZGl0YWJsZV09XCJ0cnVlXCJcbiAgICAgICAgKGJsdXIpPVwib25UZXh0QXJlYUJsdXIoKVwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGV4dCBoZXJlLi4uXCJcbiAgICA+XG4gICAgPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnRleHRhcmVhe2hlaWdodDoyNTBweDtvdmVyZmxvdzphdXRvO2JhY2tncm91bmQtY29sb3I6I2ZmZjtwYWRkaW5nOjIwcHg7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpO2JvcmRlci1yYWRpdXM6NHB4O2xpbmUtaGVpZ2h0OjJlbX0udGV4dGFyZWE6Zm9jdXN7b3V0bGluZTowfVtjb250ZW50ZWRpdGFibGU9dHJ1ZV06ZW1wdHk6YmVmb3Jle2NvbnRlbnQ6YXR0cihwbGFjZWhvbGRlcik7ZGlzcGxheTpibG9jaztjb2xvcjojNjc2NzY3fWBdXG59KVxuXG5leHBvcnQgY2xhc3MgVGV4dGFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSAge1xuICBzYXZlZFNlbGVjdGlvbjogUmFuZ2UgfCBudWxsO1xuICBzZWxlY3RlZFRleHQ6IHN0cmluZztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0IChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIExpc3RlbiB0byBldmVudHNcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvLyBNYXJrZXIgZXZlbnRzXG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAnbWFya2VyJyAmJiBldmVudC50eXBlID09PSAnaGlnaGxpZ2h0Jykge1xuICAgICAgICAvLyBIaWdobGlnaHQgdGV4dFxuICAgICAgICB0aGlzLm1hcmtlcihldmVudC5jb2xvciwgdGhpcy5zZWxlY3RlZFRleHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzdG9yZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5zYXZlZFNlbGVjdGlvbikge1xuICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbC5hZGRSYW5nZSh0aGlzLnNhdmVkU2VsZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2RvY3VtZW50LmdldFNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtlcihjb2xvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBXZSBoYXZlIGEgc2VsZWN0aW9uP1xuICAgIGlmICh0aGlzLnJlc3RvcmVTZWxlY3Rpb24oKSkge1xuICAgICAgLy8gRXhlY3V0ZSBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICB0aGlzLl9kb2N1bWVudC5leGVjQ29tbWFuZCgnaGlsaXRlQ29sb3InLCBmYWxzZSwgY29sb3IpO1xuICAgICAgLy8gVHJpZ2dlciBzdG9yZWQgaGlnaGxpZ2h0c1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe29yaWdpbjogJ3RleHRhcmVhJywgdHlwZTogJ3N0b3JlJywgY29sb3I6IGNvbG9yLCB0ZXh0OiB0ZXh0fSk7XG4gICAgfVxuICB9XG4gIG9uVGV4dEFyZWFCbHVyKCkge1xuICAgIC8vIEJyb3dzZXIgc3VwcG9ydHMgZ2V0U2VsZWN0aW9uKCk/XG4gICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIC8vIEdldCBzZWxlY3Rpb25cbiAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIC8vIEJyb3dzZXIgc3VwcG9ydCByYW5nZT9cbiAgICAgIGlmIChzZWxlY3Rpb24uZ2V0UmFuZ2VBdCAmJiBzZWxlY3Rpb24ucmFuZ2VDb3VudCkge1xuICAgICAgICAvLyBHZXQgcmFuZ2UgYW5kIHNlbGVjdGVkIHRleHRcbiAgICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGV4dCA9IHNlbGVjdGlvbi50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fZG9jdW1lbnQuZ2V0U2VsZWN0aW9uICYmIHRoaXMuX2RvY3VtZW50LmNyZWF0ZVJhbmdlKSB7XG4gICAgICB0aGlzLnNhdmVkU2VsZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gIH1cblxuICAvLyBHZXQgc2VsZWN0aW9uIGJlZm9yZSBibHVyIChmb3IgZmxvYXRpbmcgbWFya2VyKVxuICBvblNlbGVjdGlvbigkZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbi50eXBlID09PSAnUmFuZ2UnKSB7XG4gICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7b3JpZ2luOiAndGV4dGFyZWEnLCB0eXBlOiAnc2VsZWN0aW9uJywgdmFsdWU6IHNlbGVjdGlvbn0pO1xuICAgIH1cblxuICAgIC8vIFNlbGVjdGlvbiBpcyBub3QgYSByYW5nZSwgbWVhbnMgdGhlIHVzZXIganVzdCBwbGFjZXMgY2FyZXQgaW4gYW5vdGhlciBwbGFjZSwgbGV0J3MgbGV0IHRoZSBmbG9hdGluZyBtYXJrZXIga25vd3MgYWJvdXQgaXRcbiAgICBpZiAoc2VsZWN0aW9uLnR5cGUgIT09ICdSYW5nZScpIHtcbiAgICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtvcmlnaW46ICd0ZXh0YXJlYScsIHR5cGU6ICdibHVyJ30pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtc3RvcmVkLWhpZ2hsaWdodHMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJzdG9yYWdlLXdyYXBwZXJcIj5cbiAgPHVsIGNsYXNzPVwic3RvcmFnZS1maWx0ZXJzXCI+XG4gICAgPGxpICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgZmlsdGVyc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGZpbHRlcn1cIiBbbmdDbGFzc109XCJpc1NlbGVjdGVkKGZpbHRlcikgPyAnc2VsZWN0ZWQnIDogJydcIiAoY2xpY2spPVwic2V0RmlsdGVyKGZpbHRlcilcIj48L2xpPlxuICA8L3VsPlxuICA8ZGl2IGNsYXNzPVwic3RvcmFnZS1saXN0XCI+XG4gICAgPHNwYW4gKm5nSWY9XCIoc3RvcmUgfCBjb2xvckZpbHRlcjpzZWxlY3RlZEZpbHRlcnMpLmxlbmd0aCA8IDEgJiYgc3RvcmUubGVuZ3RoID4gMFwiPk5vIGl0ZW1zIG1hdGNoZXMgdGhlIHNlbGVjdGVkIGZpbHRlcjwvc3Bhbj5cbiAgICA8c3BhbiAqbmdJZj1cInN0b3JlLmxlbmd0aCA8IDFcIj5Zb3UndmUgbm8gaGlnaGxpZ2h0ZWQgaXRlbXM8L3NwYW4+XG4gICAgPHAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RvcmUgfCBjb2xvckZpbHRlcjpzZWxlY3RlZEZpbHRlcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBpdGVtLmNvbG9yfVwiPnt7aXRlbS50ZXh0fX08L3A+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnN0b3JhZ2Utd3JhcHBlcntib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMil9dWwuc3RvcmFnZS1maWx0ZXJze2Rpc3BsYXk6ZmxleDttYXJnaW46MjBweCAwIDA7YmFja2dyb3VuZC1jb2xvcjojZTFlMWUxO3BhZGRpbmc6MjBweDtib3JkZXItcmFkaXVzOjRweCA0cHggMCAwfS5zdG9yYWdlLWZpbHRlcnMgbGl7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDtjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luLXJpZ2h0OjEwcHg7cG9zaXRpb246cmVsYXRpdmV9LnN0b3JhZ2UtZmlsdGVycyBsaS5zZWxlY3RlZDphZnRlcntwb3NpdGlvbjphYnNvbHV0ZTtjb250ZW50OidcXFxcMjcxMyc7Zm9udC1zaXplOjI1cHg7Y29sb3I6I2ZmZjtmb250LXdlaWdodDpib2xkZXI7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MzBweDtoZWlnaHQ6MzBweH1kaXYuc3RvcmFnZS1saXN0e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MjBweH0uc3RvcmFnZS1saXN0IHNwYW57Y29sb3I6IzY3Njc2N30uc3RvcmFnZS1saXN0IHB7cGFkZGluZzoxMHB4O21hcmdpbjoxMHB4IDA7ZmxvYXQ6bGVmdDtjbGVhcjpsZWZ0O2JvcmRlci1yYWRpdXM6NHB4O2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO3RyYW5zaXRpb246Ym94LXNoYWRvdyAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7Y3Vyc29yOnBvaW50ZXJ9LnN0b3JhZ2UtbGlzdCBwOmhvdmVye2JveC1zaGFkb3c6MCAxNHB4IDI4cHggcmdiYSgwLDAsMCwuMjUpLDAgMTBweCAxMHB4IHJnYmEoMCwwLDAsLjIyKX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ3N0b3JlJykgc3RvcmUgPSBbXTtcbiAgQElucHV0KCdmaWx0ZXJzJykgZmlsdGVycztcbiAgc2VsZWN0ZWRGaWx0ZXJzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ3N0b3JlJykge1xuICAgICAgICB0aGlzLnN0b3JlLnB1c2goe3RleHQ6IGV2ZW50LnRleHQsIGNvbG9yOiBldmVudC5jb2xvcn0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBzZXRGaWx0ZXIoZmlsdGVyKSB7XG4gICAgLy8gQ2hlY2sgZmlyc3QgaWYgZmlsdGVyIGV4aXN0cywgaWYgeWVzIGl0IHdpbGwgcmVtb3ZlIHRoZSBmaWx0ZXIgaWYgbm90IGl0IHdpbGwgcHVzaCBpdCB0byB0aGUgc2VsZWN0ZWRGaWx0ZXJzXG4gICAgdGhpcy5pc1NlbGVjdGVkKGZpbHRlcikgPyB0aGlzLnNlbGVjdGVkRmlsdGVycy5zcGxpY2UodGhpcy5zZWxlY3RlZEZpbHRlcnMuaW5kZXhPZihmaWx0ZXIpLCAxKSA6IHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoZmlsdGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLmluY2x1ZGVzKGZpbHRlcik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtbWFya2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZml4ZWQgY29sb3JzXCIgKm5nSWY9XCJtYXJrZXJTdHlsZSA9PT0gJ2ZpeGVkJ1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sb3JcIiAqbmdGb3I9XCJsZXQgY29sb3Igb2YgY29sb3JzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3J9XCIgKGNsaWNrKT1cIm1hcmsoY29sb3IpXCI+PC9kaXY+XG48L2Rpdj5cblxuPGRpdiAjZmxvYXRpbmdNYXJrZXIgY2xhc3M9XCJmbG9hdGluZyBjb2xvcnNcIiAqbmdJZj1cIm1hcmtlclN0eWxlID09PSAnZmxvYXQnXCIgW25nU3R5bGVdPVwieydsZWZ0JzogcG9zaXRpb25YKydweCcsICd0b3AnOiBwb3NpdGlvblkrJ3B4JywgJ3Zpc2liaWxpdHknOiB2aXNpYmlsaXR5fVwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2xvclwiICpuZ0Zvcj1cImxldCBjb2xvciBvZiBjb2xvcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvcn1cIiAoY2xpY2spPVwibWFyayhjb2xvcilcIj48L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5jb2xvcnMuZml4ZWR7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXB9LmZpeGVkPi5jb2xvcnt3aWR0aDozMHB4O2hlaWdodDozMHB4O21hcmdpbjowIDEwcHggMTBweCAwO2N1cnNvcjpwb2ludGVyO2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO3RyYW5zaXRpb246LjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpfS5maXhlZD4uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCU7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfS5jb2xvcnMuZmxvYXRpbmd7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiM0MDQwNDA7Ym9yZGVyLXJhZGl1czo0cHg7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpO3RyYW5zaXRpb246dG9wIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtkaXNwbGF5OmZsZXh9LmZsb2F0aW5nPi5jb2xvcnttYXJnaW46MTBweDtjdXJzb3I6cG9pbnRlcjt3aWR0aDozMHB4O2hlaWdodDozMHB4O3RyYW5zaXRpb246dG9wIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKSxib3JkZXItcmFkaXVzIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTt6LWluZGV4OjEwfS5mbG9hdGluZz4uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCV9LmZsb2F0aW5nLmNvbG9yczphZnRlcntjb250ZW50OicnO2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjojNDA0MDQwO3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7Ym90dG9tOi01cHg7bGVmdDpjYWxjKDUwJSAtIDEwcHgpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7ei1pbmRleDoxfWBdXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95ICB7XG4gIHBvc2l0aW9uWCA9IDA7XG4gIHBvc2l0aW9uWSA9IDA7XG4gIHZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgQElucHV0KCdtYXJrZXJTdHlsZScpIG1hcmtlclN0eWxlID0gJ2ZpeGVkJztcbiAgQElucHV0KCdjb2xvcnMnKSBjb2xvcnMgPSBbJyNmNDQzMzYnLCAnI2ZmZWIzYicsICcjNGNhZjUwJ107XG4gIEBWaWV3Q2hpbGQoJ2Zsb2F0aW5nTWFya2VyJykgZmxvYXRpbmdNYXJrZXI6IGFueTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLy8gRXZlbnQgZnJvbSB0ZXh0YXJlYSByZWdhcmRpbmcgdGV4dCBzZWxlY3Rpb24gYW5kIG1hcmtlciBzdHlsZSBpcyBzZXQgdG8gZmxvYXRcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ3NlbGVjdGlvbicgJiYgdGhpcy5tYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICAvLyBPdXIgbWFrZXIgd2lkdGggaXMgYXV0byAoVE9ETzogY29sb3JzIGNhbiBiZSBhZGRlZCBhcyBhbiBpbnB1dCksIGxldCdzIGdldCBpdHMgY29tcHV0ZWQgd2lkdGhcbiAgICAgICAgY29uc3QgbWFya2VyV2lkdGggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmZsb2F0aW5nTWFya2VyLm5hdGl2ZUVsZW1lbnQpLndpZHRoO1xuICAgICAgICAvLyBTZWxlY3Rpb24gd2lkdGggYW5kIGhlaWdodCBmcm9tIHJhbmdlIGJvdW5kaW5nIHJlY3RhbmdsZVxuICAgICAgICBjb25zdCBzZWxlY3Rpb25XaWR0aCA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGNvbnN0IHhDZW50ZXIgPSAocGFyc2VJbnQobWFya2VyV2lkdGgsIDApIC0gc2VsZWN0aW9uV2lkdGgpIC8gMjtcblxuICAgICAgICB0aGlzLnBvc2l0aW9uWCA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHhDZW50ZXI7XG4gICAgICAgIC8vIDY0cHggPSA0ZW0gKGRvdWJsZSB0aGUgbGluZSBoZWlnaHQpXG4gICAgICAgIHRoaXMucG9zaXRpb25ZID0gZXZlbnQudmFsdWUuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSA2NDtcblxuICAgICAgICAvLyBMZXQncyBzaG93IG91ciBmbG9hdGluZyBtYXJrZXJcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgfVxuXG4gICAgICAvLyBFdmVudCBmcm9tIHRleHRhcmVhIHJlZ2FyZGluZyBsb3NpbmcgZm9jdXMgYW5kIG1hcmtlciBzdHlsZSBpcyBzZXQgdG8gZmxvYXRcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ2JsdXInICYmIHRoaXMubWFya2VyU3R5bGUgPT09ICdmbG9hdCcpIHtcbiAgICAgICAgLy8gTGV0J3MgaGlkZSBvdXIgZmxvYXRpbmcgbWFya2VyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbWFyayhjb2xvcikge1xuICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtcbiAgICAgIG9yaWdpbjogJ21hcmtlcicsXG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjb2xvckZpbHRlcicsXG4gIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIENvbG9yRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvLyBJdGVtcyBhcmUgc290cmVkIHNlbGVjdGlvbnMsIGFyZ3MgYXJlIHNlbGVjdGVkIGZpbHRlcnNcbiAgdHJhbnNmb3JtKGl0ZW1zOiBhbnlbXSwgYXJnczogYW55W10pIHtcbiAgICAvLyBJZiBhcmdzIGFyZSBub3QgZGVmaW5lZCBvciBlbXB0eVxuICAgIGlmICghYXJncyB8fCBhcmdzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgLy8gUmV0dXJuIGFsbCBpdGVtc1xuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZXR1cm4gb25seSBpdGVtcyB3aXRoIGNvbG9yIHZhbHVlIGV4aXN0aW5nIGluIGFyZ3MgKHNlbGVjdGVkIGZpbHRlcnMpXG4gICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKGl0ZW0gPT4gdGhpcy5pc0ZpbHRlckV4aXN0KGl0ZW0uY29sb3IsIGFyZ3MpKTtcbiAgICB9XG4gIH1cblxuICAvLyBDaGVjayBpZiBpdGVtIGNvbG9yIGluY2x1ZGVkIGluIHRoZSBzZWxlY3RlZCBmaWx0ZXJzIChhcmdzKVxuICBpc0ZpbHRlckV4aXN0KGl0ZW1Db2xvciwgYXJncykge1xuICAgIHJldHVybiBhcmdzLmluY2x1ZGVzKGl0ZW1Db2xvcik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRhcmVhQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0b3JlZC1oaWdobGlnaHRzL3N0b3JlZC1oaWdobGlnaHRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbG9yRmlsdGVyUGlwZSB9IGZyb20gJy4vcGlwZXMvY29sb3ItZmlsdGVyLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCxcbiAgICBUZXh0YXJlYUNvbXBvbmVudCxcbiAgICBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBDb2xvckZpbHRlclBpcGVcbiAgXSxcbiAgZXhwb3J0czogW05neFRleHRIaWdobGlnaHRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtJQU9FO0tBQWlCOztnQkFMbEIsVUFBVSxTQUFDO29CQUNWLFVBQVUsRUFBRSxNQUFNO2lCQUNuQjs7Ozs7b0NBSkQ7Ozs7Ozs7QUNBQTtJQVFFO3FCQUYyQixJQUFJLFlBQVksRUFBRTtLQUU1Qjs7Ozs7O0lBRWpCLGdDQUFROzs7O0lBQVIsVUFBUyxLQUFLO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDeEI7Ozs7O0lBR0QsOEJBQU07OztJQUFOO1FBQ0UsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COztnQkFmRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7Ozt3QkFKRDs7Ozs7OztBQ0FBO0lBZ0JFLHFDQUFzQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlOzZCQUhDLElBQUksWUFBWSxFQUFFOzJCQUMxQixPQUFPO3NCQUNqQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO0tBQ1o7Ozs7SUFFL0MsOENBQVE7OztJQUFSO1FBQUEsaUJBbUJDO1FBbEJDLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FB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

/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error('Cannot find module "' + req + '".');
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"header\">\n  <h1>Ngx Text Highlighter</h1>\n  <p>V1.0 Demo</p>\n</div>\n<div class=\"container\">\n  <div class=\"option-wrapper\">\n    <div class=\"marker-style\">\n      <h4>Marker Style</h4>\n      <p>\n        Marker or text highlighter, can be displayed in two ways, as a fixed toolbar at the top of the text area, or floating above the selected text, like medium sharer toolbar. Use <code>[markerStyle]</code> input providing either <code>'fixed'</code> or <code>'float'</code>> as string\n      </p>\n        <label class=\"switch-btn\">\n            <span class=\"switch-btn-description\">Fixed</span>\n            <input type=\"checkbox\" class=\"switch-btn-input\" [checked]=\"markerStyle\" (change)=\"changeMarkerStyle(markerStyle)\">\n            <span class=\"switch-btn-indicator\"></span>\n            <span class=\"switch-btn-description\">Float</span>\n          </label>\n    </div>\n  </div>\n  <div class=\"option-wrapper\">\n      <div class=\"colors\">\n        <h4>Marker Colors</h4>\n        <p>\n          By default text highlighter has 3 predefined colors to use for text highlighting (Red, Green and Blue), this can be extended by providing your own set of colors using <code>[color]</code> input. <code>[color]</code> accepts value of array of strings.\n        </p>\n        <input type=\"color\" class=\"color-picker\" name=\"color\" [value]=\"color\"  [(ngModel)]=\"color\" (change)=\"addColor(color)\" />\n      </div>\n    </div>\n\n  <th-container [colors]=\"colors\" [markerStyle]=\"markerStyle\"></th-container>\n</div>\n\n"

/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "@import url(\"https://fonts.googleapis.com/css?family=Roboto:300,500\");\nbody, h1, h2, h3, h4, h5, h6, p, ul, li, span {\n  font-family: 'Roboto', sans-serif; }\n.header h1 {\n  font-size: 42px;\n  font-weight: 300;\n  color: #989898;\n  text-align: center; }\n.header p {\n  color: #989898;\n  text-align: center; }\n.container {\n  margin: 10px; }\n.container .option-wrapper {\n    border: 1px solid #e1e1e1;\n    border-radius: 4px;\n    margin: 10px 0;\n    padding: 10px; }\n.container .option-wrapper h4 {\n      font-weight: 400;\n      font-size: 20px;\n      margin-top: 0; }\n.container .option-wrapper p {\n      font-weight: 300; }\n.container .option-wrapper .marker-style .switch-btn {\n      --color: #2196f3;\n      padding-left: 0; }\n.container .option-wrapper .marker-style .switch-btn .switch-btn-input {\n        display: none; }\n.container .option-wrapper .marker-style .switch-btn .switch-btn-input:checked ~ .switch-btn-indicator::after {\n          background-color: var(--color);\n          left: 17px; }\n.container .option-wrapper .marker-style .switch-btn .switch-btn-indicator {\n        display: inline-block;\n        position: relative;\n        margin: 0 10px;\n        top: 4px;\n        width: 32px;\n        height: 16px;\n        background: #ddd;\n        border-radius: 16px;\n        transition: .3s; }\n.container .option-wrapper .marker-style .switch-btn .switch-btn-indicator::after {\n          content: '';\n          display: block;\n          position: absolute;\n          width: 18px;\n          height: 18px;\n          border-radius: 50%;\n          transition: .3s;\n          top: -1px;\n          left: -1px;\n          background: #4caf50;\n          box-shadow: 0 2px 5px #aaa; }\n.container .option-wrapper .marker-style .switch-btn .switch-btn-description {\n        font-weight: 300; }\n.container th-container {\n    margin-top: 50px;\n    display: block;\n    width: 100%;\n    height: 100%; }\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent(cd) {
        this.cd = cd;
        this.title = 'app';
        this.markerStyle = 'fixed';
        this.colors = [];
        this.color = '#000000';
    }
    AppComponent.prototype.ngOnInit = function () {
    };
    AppComponent.prototype.changeMarkerStyle = function (value) {
        console.log(value);
        value ? this.markerStyle = 'float' : this.markerStyle = 'fixed';
    };
    AppComponent.prototype.addColor = function (color) {
        // Had to reassign the array, to get angular listen for input changes
        this.colors = this.colors.concat([color]);
    };
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        __metadata("design:paramtypes", [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ChangeDetectorRef"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var ngx_text_highlighter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ngx-text-highlighter */ "./dist/ngx-text-highlighter/fesm5/ngx-text-highlighter.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};





var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"],
            ],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                ngx_text_highlighter__WEBPACK_IMPORTED_MODULE_4__["NgxTextHighlighterModule"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_2__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/mou/Desktop/Projects/ngx-text-highlighter-app/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map