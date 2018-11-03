(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-text-highlighter', ['exports', '@angular/core', '@angular/common'], factory) :
    (factory((global['ngx-text-highlighter'] = {}),global.ng.core,global.ng.common));
}(this, (function (exports,i0,common) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxTextHighlighterService = (function () {
        function NgxTextHighlighterService() {
        }
        NgxTextHighlighterService.decorators = [
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        NgxTextHighlighterService.ctorParameters = function () { return []; };
        /** @nocollapse */ NgxTextHighlighterService.ngInjectableDef = i0.defineInjectable({ factory: function NgxTextHighlighterService_Factory() { return new NgxTextHighlighterService(); }, token: NgxTextHighlighterService, providedIn: "root" });
        return NgxTextHighlighterService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var EventsService = (function () {
        function EventsService() {
            this.event = new i0.EventEmitter();
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
            { type: i0.Injectable, args: [{
                        providedIn: 'root'
                    },] },
        ];
        /** @nocollapse */
        EventsService.ctorParameters = function () { return []; };
        /** @nocollapse */ EventsService.ngInjectableDef = i0.defineInjectable({ factory: function EventsService_Factory() { return new EventsService(); }, token: EventsService, providedIn: "root" });
        return EventsService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var NgxTextHighlighterComponent = (function () {
        function NgxTextHighlighterComponent(events) {
            this.events = events;
            this.textSelection = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'th-container',
                        template: "\n    <th-marker [markerStyle]=\"markerStyle\" [colors]=\"colors\"></th-marker>\n    <th-textarea></th-textarea>\n    <th-stored-highlights [filters]=\"colors\"></th-stored-highlights>\n  ",
                        styles: []
                    },] },
        ];
        /** @nocollapse */
        NgxTextHighlighterComponent.ctorParameters = function () {
            return [
                { type: EventsService }
            ];
        };
        NgxTextHighlighterComponent.propDecorators = {
            textSelection: [{ type: i0.Output }],
            markerStyle: [{ type: i0.Input, args: ['markerStyle',] }],
            colors: [{ type: i0.Input, args: ['colors',] }]
        };
        return NgxTextHighlighterComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var TextareaComponent = (function () {
        function TextareaComponent(_document, events) {
            this._document = _document;
            this.events = events;
            this.blur = new i0.EventEmitter();
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
            { type: i0.Component, args: [{
                        selector: 'th-textarea',
                        template: "    <div class=\"textarea\"\n        (mouseup)=\"onSelection($event)\"\n        [attr.contenteditable]=\"true\"\n        (blur)=\"onTextAreaBlur()\"\n        placeholder=\"Enter text here...\"\n    >\n    </div>\n",
                        styles: [".textarea{height:250px;overflow:auto;background-color:#fff;padding:20px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);border-radius:4px;line-height:2em}.textarea:focus{outline:0}[contenteditable=true]:empty:before{content:attr(placeholder);display:block;color:#676767}"]
                    },] },
        ];
        /** @nocollapse */
        TextareaComponent.ctorParameters = function () {
            return [
                { type: undefined, decorators: [{ type: i0.Inject, args: [common.DOCUMENT,] }] },
                { type: EventsService }
            ];
        };
        TextareaComponent.propDecorators = {
            blur: [{ type: i0.Output }]
        };
        return TextareaComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var StoredHighlightsComponent = (function () {
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
            { type: i0.Component, args: [{
                        selector: 'th-stored-highlights',
                        template: "<div class=\"storage-wrapper\">\n  <ul class=\"storage-filters\">\n    <li *ngFor=\"let filter of filters\" [ngStyle]=\"{'background-color': filter}\" [ngClass]=\"isSelected(filter) ? 'selected' : ''\" (click)=\"setFilter(filter)\"></li>\n  </ul>\n  <div class=\"storage-list\">\n    <span *ngIf=\"(store | colorFilter:selectedFilters).length < 1 && store.length > 0\">No items matches the selected filter</span>\n    <span *ngIf=\"store.length < 1\">You've no highlighted items</span>\n    <p *ngFor=\"let item of store | colorFilter:selectedFilters\" [ngStyle]=\"{'background-color': item.color}\">{{item.text}}</p>\n  </div>\n</div>\n",
                        styles: [".storage-wrapper{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}ul.storage-filters{display:flex;margin:20px 0 0;background-color:#e1e1e1;padding:20px;border-radius:4px 4px 0 0}.storage-filters li{width:30px;height:30px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);list-style:none;margin-right:10px;position:relative}.storage-filters li.selected:after{position:absolute;content:'\\2713';font-size:25px;color:#fff;font-weight:bolder;text-align:center;width:30px;height:30px}div.storage-list{display:inline-block;padding:20px}.storage-list span{color:#676767}.storage-list p{padding:10px;margin:10px 0;float:left;clear:left;border-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:box-shadow .3s cubic-bezier(.25,.8,.25,1);cursor:pointer}.storage-list p:hover{box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)}"]
                    },] },
        ];
        /** @nocollapse */
        StoredHighlightsComponent.ctorParameters = function () {
            return [
                { type: EventsService }
            ];
        };
        StoredHighlightsComponent.propDecorators = {
            store: [{ type: i0.Input, args: ['store',] }],
            filters: [{ type: i0.Input, args: ['filters',] }]
        };
        return StoredHighlightsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var MarkerComponent = (function () {
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
            { type: i0.Component, args: [{
                        selector: 'th-marker',
                        template: "<div class=\"fixed colors\" *ngIf=\"markerStyle === 'fixed'\">\n  <div class=\"color\" *ngFor=\"let color of colors\" [ngStyle]=\"{'background-color': color}\" (click)=\"mark(color)\"></div>\n</div>\n\n<div #floatingMarker class=\"floating colors\" *ngIf=\"markerStyle === 'float'\" [ngStyle]=\"{'left': positionX+'px', 'top': positionY+'px', 'visibility': visibility}\">\n    <div class=\"color\" *ngFor=\"let color of colors\" [ngStyle]=\"{'background-color': color}\" (click)=\"mark(color)\"></div>\n</div>\n",
                        styles: [".colors.fixed{width:100%;display:flex;flex-wrap:wrap}.fixed>.color{width:30px;height:30px;margin:0 10px 10px 0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:.3s cubic-bezier(.25,.8,.25,1)}.fixed>.color:hover{border-radius:50%;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.colors.floating{position:absolute;width:auto;background-color:#404040;border-radius:4px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);transition:top .3s cubic-bezier(.25,.8,.25,1);display:flex}.floating>.color{margin:10px;cursor:pointer;width:30px;height:30px;transition:top .3s cubic-bezier(.25,.8,.25,1),border-radius .3s cubic-bezier(.25,.8,.25,1);z-index:10}.floating>.color:hover{border-radius:50%}.floating.colors:after{content:'';display:block;position:absolute;background-color:#404040;width:20px;height:20px;bottom:-5px;left:calc(50% - 10px);-webkit-transform:rotate(45deg);transform:rotate(45deg);z-index:1}"]
                    },] },
        ];
        /** @nocollapse */
        MarkerComponent.ctorParameters = function () {
            return [
                { type: EventsService }
            ];
        };
        MarkerComponent.propDecorators = {
            markerStyle: [{ type: i0.Input, args: ['markerStyle',] }],
            colors: [{ type: i0.Input, args: ['colors',] }],
            floatingMarker: [{ type: i0.ViewChild, args: ['floatingMarker',] }]
        };
        return MarkerComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var ColorFilterPipe = (function () {
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
            { type: i0.Pipe, args: [{
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
    var NgxTextHighlighterModule = (function () {
        function NgxTextHighlighterModule() {
        }
        NgxTextHighlighterModule.decorators = [
            { type: i0.NgModule, args: [{
                        imports: [
                            common.CommonModule
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

    exports.NgxTextHighlighterService = NgxTextHighlighterService;
    exports.NgxTextHighlighterComponent = NgxTextHighlighterComponent;
    exports.NgxTextHighlighterModule = NgxTextHighlighterModule;
    exports.ɵd = MarkerComponent;
    exports.ɵc = StoredHighlightsComponent;
    exports.ɵb = TextareaComponent;
    exports.ɵe = ColorFilterPipe;
    exports.ɵa = EventsService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuc2VydmljZS50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9jb21wb25lbnRzL3N0b3JlZC1oaWdobGlnaHRzL3N0b3JlZC1oaWdobGlnaHRzLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9waXBlcy9jb2xvci1maWx0ZXIucGlwZS50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL25neC10ZXh0LWhpZ2hsaWdodGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neFRleHRIaWdobGlnaHRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRzU2VydmljZSB7XG4gIGV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuICAvLyBEaXNwYXRjaCBldmVudHMgYWNyb3NzIGNvbXBvbmVudHNcbiAgZGlzcGF0Y2goZXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLy8gTGlzdGVucyB0byBkaXNwYXRjaGVkIGV2ZW50c1xuICBsaXN0ZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx0aC1tYXJrZXIgW21hcmtlclN0eWxlXT1cIm1hcmtlclN0eWxlXCIgW2NvbG9yc109XCJjb2xvcnNcIj48L3RoLW1hcmtlcj5cbiAgICA8dGgtdGV4dGFyZWE+PC90aC10ZXh0YXJlYT5cbiAgICA8dGgtc3RvcmVkLWhpZ2hsaWdodHMgW2ZpbHRlcnNdPVwiY29sb3JzXCI+PC90aC1zdG9yZWQtaGlnaGxpZ2h0cz5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoKSB0ZXh0U2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8e30+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoJ21hcmtlclN0eWxlJykgbWFya2VyU3R5bGUgPSAnZml4ZWQnO1xuICBASW5wdXQoJ2NvbG9ycycpIGNvbG9ycyA9IFsnI2Y0NDMzNicsICcjZmZlYjNiJywgJyM0Y2FmNTAnXTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkge31cblxuICBuZ09uSW5pdCgpIHtcbiAgICBpZiAodGhpcy5jb2xvcnMubGVuZ3RoIDwgMSkge1xuICAgICAgdGhpcy5jb2xvcnMgPSBbJyNmNDQzMzYnLCAnI2ZmZWIzYicsICcjNGNhZjUwJ107XG4gICAgfVxuICAgIC8vIExpc3RlbnMgdG8gZXZlbnRzIGZyb20gY2hpbGQgY29tcG9uZW50c1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAvLyBDaGVjayBldmVudCBvcmlnaW4gKHdoaWNoIGNvbXBvbmVudCBkaXNwYXRjaGVkIHRoaXMgZXZlbnQpXG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9yaWdpbikge1xuICAgICAgICAvLyBFdmVudHMgY29taW5nIGZyb20gdGhlIHRleHRhcmVhIGNvbXBvbmVudFxuICAgICAgICBjYXNlICgndGV4dGFyZWEnKTpcbiAgICAgICAgICAvLyBFbWl0IGV2ZW50IHRvIHRoZSBsaWJyYXJ5IGNvbXBvbmVudCBvdXRwdXRcbiAgICAgICAgICB0aGlzLnRleHRTZWxlY3Rpb24uZW1pdCh7c2VsZWN0aW9uOiBldmVudC5zZWxlY3Rpb24sIG1vdXNlRXZlbnQ6IGV2ZW50Lm1vdXNlRXZlbnR9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5qZWN0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC10ZXh0YXJlYScsXG4gIHRlbXBsYXRlOiBgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYVwiXG4gICAgICAgIChtb3VzZXVwKT1cIm9uU2VsZWN0aW9uKCRldmVudClcIlxuICAgICAgICBbYXR0ci5jb250ZW50ZWRpdGFibGVdPVwidHJ1ZVwiXG4gICAgICAgIChibHVyKT1cIm9uVGV4dEFyZWFCbHVyKClcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHRleHQgaGVyZS4uLlwiXG4gICAgPlxuICAgIDwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC50ZXh0YXJlYXtoZWlnaHQ6MjUwcHg7b3ZlcmZsb3c6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cGFkZGluZzoyMHB4O2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKTtib3JkZXItcmFkaXVzOjRweDtsaW5lLWhlaWdodDoyZW19LnRleHRhcmVhOmZvY3Vze291dGxpbmU6MH1bY29udGVudGVkaXRhYmxlPXRydWVdOmVtcHR5OmJlZm9yZXtjb250ZW50OmF0dHIocGxhY2Vob2xkZXIpO2Rpc3BsYXk6YmxvY2s7Y29sb3I6IzY3Njc2N31gXVxufSlcblxuZXhwb3J0IGNsYXNzIFRleHRhcmVhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kgIHtcbiAgc2F2ZWRTZWxlY3Rpb246IFJhbmdlIHwgbnVsbDtcbiAgc2VsZWN0ZWRUZXh0OiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCAoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIHByaXZhdGUgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBMaXN0ZW4gdG8gZXZlbnRzXG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLy8gTWFya2VyIGV2ZW50c1xuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ21hcmtlcicgJiYgZXZlbnQudHlwZSA9PT0gJ2hpZ2hsaWdodCcpIHtcbiAgICAgICAgLy8gSGlnaGxpZ2h0IHRleHRcbiAgICAgICAgdGhpcy5tYXJrZXIoZXZlbnQuY29sb3IsIHRoaXMuc2VsZWN0ZWRUZXh0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlc3RvcmVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuc2F2ZWRTZWxlY3Rpb24pIHtcbiAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBzZWwuYWRkUmFuZ2UodGhpcy5zYXZlZFNlbGVjdGlvbik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9kb2N1bWVudC5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBtYXJrZXIoY29sb3I6IHN0cmluZywgdGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gV2UgaGF2ZSBhIHNlbGVjdGlvbj9cbiAgICBpZiAodGhpcy5yZXN0b3JlU2VsZWN0aW9uKCkpIHtcbiAgICAgIC8vIEV4ZWN1dGUgYmFja2dyb3VuZCBjb2xvclxuICAgICAgdGhpcy5fZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2hpbGl0ZUNvbG9yJywgZmFsc2UsIGNvbG9yKTtcbiAgICAgIC8vIFRyaWdnZXIgc3RvcmVkIGhpZ2hsaWdodHNcbiAgICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtvcmlnaW46ICd0ZXh0YXJlYScsIHR5cGU6ICdzdG9yZScsIGNvbG9yOiBjb2xvciwgdGV4dDogdGV4dH0pO1xuICAgIH1cbiAgfVxuICBvblRleHRBcmVhQmx1cigpIHtcbiAgICAvLyBCcm93c2VyIHN1cHBvcnRzIGdldFNlbGVjdGlvbigpP1xuICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAvLyBHZXQgc2VsZWN0aW9uXG4gICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAvLyBCcm93c2VyIHN1cHBvcnQgcmFuZ2U/XG4gICAgICBpZiAoc2VsZWN0aW9uLmdldFJhbmdlQXQgJiYgc2VsZWN0aW9uLnJhbmdlQ291bnQpIHtcbiAgICAgICAgLy8gR2V0IHJhbmdlIGFuZCBzZWxlY3RlZCB0ZXh0XG4gICAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRleHQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2RvY3VtZW50LmdldFNlbGVjdGlvbiAmJiB0aGlzLl9kb2N1bWVudC5jcmVhdGVSYW5nZSkge1xuICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBudWxsO1xuICAgIH1cblxuICB9XG5cbiAgLy8gR2V0IHNlbGVjdGlvbiBiZWZvcmUgYmx1ciAoZm9yIGZsb2F0aW5nIG1hcmtlcilcbiAgb25TZWxlY3Rpb24oJGV2ZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIGlmIChzZWxlY3Rpb24udHlwZSA9PT0gJ1JhbmdlJykge1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe29yaWdpbjogJ3RleHRhcmVhJywgdHlwZTogJ3NlbGVjdGlvbicsIHZhbHVlOiBzZWxlY3Rpb259KTtcbiAgICB9XG5cbiAgICAvLyBTZWxlY3Rpb24gaXMgbm90IGEgcmFuZ2UsIG1lYW5zIHRoZSB1c2VyIGp1c3QgcGxhY2VzIGNhcmV0IGluIGFub3RoZXIgcGxhY2UsIGxldCdzIGxldCB0aGUgZmxvYXRpbmcgbWFya2VyIGtub3dzIGFib3V0IGl0XG4gICAgaWYgKHNlbGVjdGlvbi50eXBlICE9PSAnUmFuZ2UnKSB7XG4gICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7b3JpZ2luOiAndGV4dGFyZWEnLCB0eXBlOiAnYmx1cid9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS51bnN1YnNjcmliZSgpO1xuICB9XG59XG5cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLXN0b3JlZC1oaWdobGlnaHRzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic3RvcmFnZS13cmFwcGVyXCI+XG4gIDx1bCBjbGFzcz1cInN0b3JhZ2UtZmlsdGVyc1wiPlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGZpbHRlcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBmaWx0ZXJ9XCIgW25nQ2xhc3NdPVwiaXNTZWxlY3RlZChmaWx0ZXIpID8gJ3NlbGVjdGVkJyA6ICcnXCIgKGNsaWNrKT1cInNldEZpbHRlcihmaWx0ZXIpXCI+PC9saT5cbiAgPC91bD5cbiAgPGRpdiBjbGFzcz1cInN0b3JhZ2UtbGlzdFwiPlxuICAgIDxzcGFuICpuZ0lmPVwiKHN0b3JlIHwgY29sb3JGaWx0ZXI6c2VsZWN0ZWRGaWx0ZXJzKS5sZW5ndGggPCAxICYmIHN0b3JlLmxlbmd0aCA+IDBcIj5ObyBpdGVtcyBtYXRjaGVzIHRoZSBzZWxlY3RlZCBmaWx0ZXI8L3NwYW4+XG4gICAgPHNwYW4gKm5nSWY9XCJzdG9yZS5sZW5ndGggPCAxXCI+WW91J3ZlIG5vIGhpZ2hsaWdodGVkIGl0ZW1zPC9zcGFuPlxuICAgIDxwICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0b3JlIHwgY29sb3JGaWx0ZXI6c2VsZWN0ZWRGaWx0ZXJzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogaXRlbS5jb2xvcn1cIj57e2l0ZW0udGV4dH19PC9wPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5zdG9yYWdlLXdyYXBwZXJ7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfXVsLnN0b3JhZ2UtZmlsdGVyc3tkaXNwbGF5OmZsZXg7bWFyZ2luOjIwcHggMCAwO2JhY2tncm91bmQtY29sb3I6I2UxZTFlMTtwYWRkaW5nOjIwcHg7Ym9yZGVyLXJhZGl1czo0cHggNHB4IDAgMH0uc3RvcmFnZS1maWx0ZXJzIGxpe3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHg7Y3Vyc29yOnBvaW50ZXI7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMTIpLDAgMXB4IDJweCByZ2JhKDAsMCwwLC4yNCk7bGlzdC1zdHlsZTpub25lO21hcmdpbi1yaWdodDoxMHB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5zdG9yYWdlLWZpbHRlcnMgbGkuc2VsZWN0ZWQ6YWZ0ZXJ7cG9zaXRpb246YWJzb2x1dGU7Y29udGVudDonXFxcXDI3MTMnO2ZvbnQtc2l6ZToyNXB4O2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6Ym9sZGVyO3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHh9ZGl2LnN0b3JhZ2UtbGlzdHtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjIwcHh9LnN0b3JhZ2UtbGlzdCBzcGFue2NvbG9yOiM2NzY3Njd9LnN0b3JhZ2UtbGlzdCBwe3BhZGRpbmc6MTBweDttYXJnaW46MTBweCAwO2Zsb2F0OmxlZnQ7Y2xlYXI6bGVmdDtib3JkZXItcmFkaXVzOjRweDtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTt0cmFuc2l0aW9uOmJveC1zaGFkb3cgLjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO2N1cnNvcjpwb2ludGVyfS5zdG9yYWdlLWxpc3QgcDpob3Zlcntib3gtc2hhZG93OjAgMTRweCAyOHB4IHJnYmEoMCwwLDAsLjI1KSwwIDEwcHggMTBweCByZ2JhKDAsMCwwLC4yMil9YF1cbn0pXG5leHBvcnQgY2xhc3MgU3RvcmVkSGlnaGxpZ2h0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQElucHV0KCdzdG9yZScpIHN0b3JlID0gW107XG4gIEBJbnB1dCgnZmlsdGVycycpIGZpbHRlcnM7XG4gIHNlbGVjdGVkRmlsdGVyczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAndGV4dGFyZWEnICYmIGV2ZW50LnR5cGUgPT09ICdzdG9yZScpIHtcbiAgICAgICAgdGhpcy5zdG9yZS5wdXNoKHt0ZXh0OiBldmVudC50ZXh0LCBjb2xvcjogZXZlbnQuY29sb3J9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgc2V0RmlsdGVyKGZpbHRlcikge1xuICAgIC8vIENoZWNrIGZpcnN0IGlmIGZpbHRlciBleGlzdHMsIGlmIHllcyBpdCB3aWxsIHJlbW92ZSB0aGUgZmlsdGVyIGlmIG5vdCBpdCB3aWxsIHB1c2ggaXQgdG8gdGhlIHNlbGVjdGVkRmlsdGVyc1xuICAgIHRoaXMuaXNTZWxlY3RlZChmaWx0ZXIpID8gdGhpcy5zZWxlY3RlZEZpbHRlcnMuc3BsaWNlKHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLmluZGV4T2YoZmlsdGVyKSwgMSkgOiB0aGlzLnNlbGVjdGVkRmlsdGVycy5wdXNoKGZpbHRlcik7XG4gIH1cblxuICBpc1NlbGVjdGVkKGZpbHRlcikge1xuICAgIHJldHVybiB0aGlzLnNlbGVjdGVkRmlsdGVycy5pbmNsdWRlcyhmaWx0ZXIpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLW1hcmtlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImZpeGVkIGNvbG9yc1wiICpuZ0lmPVwibWFya2VyU3R5bGUgPT09ICdmaXhlZCdcIj5cbiAgPGRpdiBjbGFzcz1cImNvbG9yXCIgKm5nRm9yPVwibGV0IGNvbG9yIG9mIGNvbG9yc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9yfVwiIChjbGljayk9XCJtYXJrKGNvbG9yKVwiPjwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgI2Zsb2F0aW5nTWFya2VyIGNsYXNzPVwiZmxvYXRpbmcgY29sb3JzXCIgKm5nSWY9XCJtYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0J1wiIFtuZ1N0eWxlXT1cInsnbGVmdCc6IHBvc2l0aW9uWCsncHgnLCAndG9wJzogcG9zaXRpb25ZKydweCcsICd2aXNpYmlsaXR5JzogdmlzaWJpbGl0eX1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sb3JcIiAqbmdGb3I9XCJsZXQgY29sb3Igb2YgY29sb3JzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3J9XCIgKGNsaWNrKT1cIm1hcmsoY29sb3IpXCI+PC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuY29sb3JzLmZpeGVke3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwfS5maXhlZD4uY29sb3J7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDttYXJnaW46MCAxMHB4IDEwcHggMDtjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTt0cmFuc2l0aW9uOi4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKX0uZml4ZWQ+LmNvbG9yOmhvdmVye2JvcmRlci1yYWRpdXM6NTAlO2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKX0uY29sb3JzLmZsb2F0aW5ne3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOmF1dG87YmFja2dyb3VuZC1jb2xvcjojNDA0MDQwO2JvcmRlci1yYWRpdXM6NHB4O2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKTt0cmFuc2l0aW9uOnRvcCAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7ZGlzcGxheTpmbGV4fS5mbG9hdGluZz4uY29sb3J7bWFyZ2luOjEwcHg7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDt0cmFuc2l0aW9uOnRvcCAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSksYm9yZGVyLXJhZGl1cyAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7ei1pbmRleDoxMH0uZmxvYXRpbmc+LmNvbG9yOmhvdmVye2JvcmRlci1yYWRpdXM6NTAlfS5mbG9hdGluZy5jb2xvcnM6YWZ0ZXJ7Y29udGVudDonJztkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6IzQwNDA0MDt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O2JvdHRvbTotNXB4O2xlZnQ6Y2FsYyg1MCUgLSAxMHB4KTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3otaW5kZXg6MX1gXVxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSAge1xuICBwb3NpdGlvblggPSAwO1xuICBwb3NpdGlvblkgPSAwO1xuICB2aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gIEBJbnB1dCgnbWFya2VyU3R5bGUnKSBtYXJrZXJTdHlsZSA9ICdmaXhlZCc7XG4gIEBJbnB1dCgnY29sb3JzJykgY29sb3JzID0gWycjZjQ0MzM2JywgJyNmZmViM2InLCAnIzRjYWY1MCddO1xuICBAVmlld0NoaWxkKCdmbG9hdGluZ01hcmtlcicpIGZsb2F0aW5nTWFya2VyOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIC8vIEV2ZW50IGZyb20gdGV4dGFyZWEgcmVnYXJkaW5nIHRleHQgc2VsZWN0aW9uIGFuZCBtYXJrZXIgc3R5bGUgaXMgc2V0IHRvIGZsb2F0XG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAndGV4dGFyZWEnICYmIGV2ZW50LnR5cGUgPT09ICdzZWxlY3Rpb24nICYmIHRoaXMubWFya2VyU3R5bGUgPT09ICdmbG9hdCcpIHtcbiAgICAgICAgLy8gT3VyIG1ha2VyIHdpZHRoIGlzIGF1dG8gKFRPRE86IGNvbG9ycyBjYW4gYmUgYWRkZWQgYXMgYW4gaW5wdXQpLCBsZXQncyBnZXQgaXRzIGNvbXB1dGVkIHdpZHRoXG4gICAgICAgIGNvbnN0IG1hcmtlcldpZHRoID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5mbG9hdGluZ01hcmtlci5uYXRpdmVFbGVtZW50KS53aWR0aDtcbiAgICAgICAgLy8gU2VsZWN0aW9uIHdpZHRoIGFuZCBoZWlnaHQgZnJvbSByYW5nZSBib3VuZGluZyByZWN0YW5nbGVcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uV2lkdGggPSBldmVudC52YWx1ZS5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCB4Q2VudGVyID0gKHBhcnNlSW50KG1hcmtlcldpZHRoLCAwKSAtIHNlbGVjdGlvbldpZHRoKSAvIDI7XG5cblxuICAgICAgICB0aGlzLnBvc2l0aW9uWCA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHhDZW50ZXI7XG4gICAgICAgIC8vIDY0cHggPSA0ZW0gKGRvdWJsZSB0aGUgbGluZSBoZWlnaHQpXG4gICAgICAgIHRoaXMucG9zaXRpb25ZID0gZXZlbnQudmFsdWUuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSA2NDtcblxuICAgICAgICAvLyBMZXQncyBzaG93IG91ciBmbG9hdGluZyBtYXJrZXJcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgfVxuXG4gICAgICAvLyBFdmVudCBmcm9tIHRleHRhcmVhIHJlZ2FyZGluZyBsb3NpbmcgZm9jdXMgYW5kIG1hcmtlciBzdHlsZSBpcyBzZXQgdG8gZmxvYXRcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ2JsdXInICYmIHRoaXMubWFya2VyU3R5bGUgPT09ICdmbG9hdCcpIHtcbiAgICAgICAgLy8gTGV0J3MgaGlkZSBvdXIgZmxvYXRpbmcgbWFya2VyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbWFyayhjb2xvcikge1xuICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtcbiAgICAgIG9yaWdpbjogJ21hcmtlcicsXG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjb2xvckZpbHRlcicsXG4gIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIENvbG9yRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvLyBJdGVtcyBhcmUgc290cmVkIHNlbGVjdGlvbnMsIGFyZ3MgYXJlIHNlbGVjdGVkIGZpbHRlcnNcbiAgdHJhbnNmb3JtKGl0ZW1zOiBhbnlbXSwgYXJnczogYW55W10pIHtcbiAgICAvLyBJZiBhcmdzIGFyZSBub3QgZGVmaW5lZCBvciBlbXB0eVxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCB8fCAhYXJncykge1xuICAgICAgLy8gUmV0dXJuIGFsbCBpdGVtc1xuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZXR1cm4gb25seSBpdGVtcyB3aXRoIGNvbG9yIHZhbHVlIGV4aXN0aW5nIGluIGFyZ3MgKHNlbGVjdGVkIGZpbHRlcnMpXG4gICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKGl0ZW0gPT4gdGhpcy5pc0ZpbHRlckV4aXN0KGl0ZW0uY29sb3IsIGFyZ3MpKTtcbiAgICB9XG4gIH1cblxuICAvLyBDaGVjayBpZiBpdGVtIGNvbG9yIGluY2x1ZGVkIGluIHRoZSBzZWxlY3RlZCBmaWx0ZXJzIChhcmdzKVxuICBpc0ZpbHRlckV4aXN0KGl0ZW1Db2xvciwgYXJncykge1xuICAgIHJldHVybiBhcmdzLmluY2x1ZGVzKGl0ZW1Db2xvcik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRhcmVhQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0b3JlZC1oaWdobGlnaHRzL3N0b3JlZC1oaWdobGlnaHRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbG9yRmlsdGVyUGlwZSB9IGZyb20gJy4vcGlwZXMvY29sb3ItZmlsdGVyLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCxcbiAgICBUZXh0YXJlYUNvbXBvbmVudCxcbiAgICBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBDb2xvckZpbHRlclBpcGVcbiAgXSxcbiAgZXhwb3J0czogW05neFRleHRIaWdobGlnaHRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJPdXRwdXQiLCJJbnB1dCIsIkluamVjdCIsIkRPQ1VNRU5UIiwiVmlld0NoaWxkIiwiUGlwZSIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7Ozt3Q0FKRDs7Ozs7OztBQ0FBO1FBUUU7eUJBRjJCLElBQUlDLGVBQVksRUFBRTtTQUU1Qjs7Ozs7O1FBRWpCLGdDQUFROzs7O1lBQVIsVUFBUyxLQUFLO2dCQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hCOzs7OztRQUdELDhCQUFNOzs7WUFBTjtnQkFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDbkI7O29CQWZGRCxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7Ozs0QkFKRDs7Ozs7OztBQ0FBO1FBZ0JFLHFDQUFzQixNQUFxQjtZQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO2lDQUhDLElBQUlDLGVBQVksRUFBRTsrQkFDMUIsT0FBTzswQkFDakIsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FB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