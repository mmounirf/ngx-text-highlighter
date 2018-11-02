(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/common'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('ngx-text-highlighter', ['exports', '@angular/core', '@angular/common', '@angular/platform-browser'], factory) :
    (factory((global['ngx-text-highlighter'] = {}),global.ng.core,global.ng.common,global.ng.platformBrowser));
}(this, (function (exports,i0,common,platformBrowser) { 'use strict';

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
                console.log(this.filters);
            };
        StoredHighlightsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'th-stored-highlights',
                        template: "<div class=\"storage-wrapper\">\n  <ul class=\"sotrage-filters\">\n    <li *ngFor=\"let filter of filters\" [ngStyle]=\"{'background-color': filter.color}\"></li>\n  </ul>\n  <ul class=\"sotrage-list\">\n    <li *ngFor=\"let item of store\" [ngStyle]=\"{'background-color': item.color}\">{{item.text}}</li>\n  </ul>\n</div>\n",
                        styles: [""]
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
    var SafeHtmlPipe = (function () {
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
            { type: i0.Pipe, args: [{
                        name: 'safeHtml'
                    },] },
        ];
        /** @nocollapse */
        SafeHtmlPipe.ctorParameters = function () {
            return [
                { type: platformBrowser.DomSanitizer }
            ];
        };
        return SafeHtmlPipe;
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

    exports.NgxTextHighlighterService = NgxTextHighlighterService;
    exports.NgxTextHighlighterComponent = NgxTextHighlighterComponent;
    exports.NgxTextHighlighterModule = NgxTextHighlighterModule;
    exports.ɵd = MarkerComponent;
    exports.ɵc = StoredHighlightsComponent;
    exports.ɵb = TextareaComponent;
    exports.ɵe = SafeHtmlPipe;
    exports.ɵa = EventsService;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuc2VydmljZS50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9jb21wb25lbnRzL3N0b3JlZC1oaWdobGlnaHRzL3N0b3JlZC1oaWdobGlnaHRzLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9waXBlcy9zYWZlLWh0bWwucGlwZS50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL25neC10ZXh0LWhpZ2hsaWdodGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neFRleHRIaWdobGlnaHRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRzU2VydmljZSB7XG4gIGV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuICAvLyBEaXNwYXRjaCBldmVudHMgYWNyb3NzIGNvbXBvbmVudHNcbiAgZGlzcGF0Y2goZXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLy8gTGlzdGVucyB0byBkaXNwYXRjaGVkIGV2ZW50c1xuICBsaXN0ZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx0aC1tYXJrZXIgW21hcmtlclN0eWxlXT1cIm1hcmtlclN0eWxlXCIgW2NvbG9yc109XCJjb2xvcnNcIj48L3RoLW1hcmtlcj5cbiAgICA8dGgtdGV4dGFyZWE+PC90aC10ZXh0YXJlYT5cbiAgICA8dGgtc3RvcmVkLWhpZ2hsaWdodHMgW2ZpbHRlcnNdPVwiY29sb3JzXCI+PC90aC1zdG9yZWQtaGlnaGxpZ2h0cz5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoKSB0ZXh0U2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8e30+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoJ21hcmtlclN0eWxlJykgbWFya2VyU3R5bGUgPSAnZml4ZWQnO1xuICBASW5wdXQoJ2NvbG9ycycpIGNvbG9ycyA9IFsnI2Y0NDMzNicsICcjZmZlYjNiJywgJyM0Y2FmNTAnXTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gTGlzdGVucyB0byBldmVudHMgZnJvbSBjaGlsZCBjb21wb25lbnRzXG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIC8vIENoZWNrIGV2ZW50IG9yaWdpbiAod2hpY2ggY29tcG9uZW50IGRpc3BhdGNoZWQgdGhpcyBldmVudClcbiAgICAgIHN3aXRjaCAoZXZlbnQub3JpZ2luKSB7XG4gICAgICAgIC8vIEV2ZW50cyBjb21pbmcgZnJvbSB0aGUgdGV4dGFyZWEgY29tcG9uZW50XG4gICAgICAgIGNhc2UgKCd0ZXh0YXJlYScpOlxuICAgICAgICAgIC8vIEVtaXQgZXZlbnQgdG8gdGhlIGxpYnJhcnkgY29tcG9uZW50IG91dHB1dFxuICAgICAgICAgIHRoaXMudGV4dFNlbGVjdGlvbi5lbWl0KHtzZWxlY3Rpb246IGV2ZW50LnNlbGVjdGlvbiwgbW91c2VFdmVudDogZXZlbnQubW91c2VFdmVudH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbmplY3QsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC10ZXh0YXJlYScsXG4gIHRlbXBsYXRlOiBgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYVwiXG4gICAgICAgIChtb3VzZXVwKT1cIm9uU2VsZWN0aW9uKCRldmVudClcIlxuICAgICAgICBbYXR0ci5jb250ZW50ZWRpdGFibGVdPVwidHJ1ZVwiXG4gICAgICAgIChibHVyKT1cIm9uVGV4dEFyZWFCbHVyKClcIlxuICAgICAgICBwbGFjZWhvbGRlcj1cIkVudGVyIHRleHQgaGVyZS4uLlwiXG4gICAgPlxuICAgIDwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC50ZXh0YXJlYXtoZWlnaHQ6MjUwcHg7b3ZlcmZsb3c6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiNmZmY7cGFkZGluZzoyMHB4O2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKTtib3JkZXItcmFkaXVzOjRweDtsaW5lLWhlaWdodDoyZW19LnRleHRhcmVhOmZvY3Vze291dGxpbmU6MH1bY29udGVudGVkaXRhYmxlPXRydWVdOmVtcHR5OmJlZm9yZXtjb250ZW50OmF0dHIocGxhY2Vob2xkZXIpO2Rpc3BsYXk6YmxvY2s7Y29sb3I6IzY3Njc2N31gXVxufSlcblxuZXhwb3J0IGNsYXNzIFRleHRhcmVhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgc2F2ZWRTZWxlY3Rpb246IFJhbmdlIHwgbnVsbDtcbiAgc2VsZWN0ZWRUZXh0OiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCAoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIHByaXZhdGUgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBMaXN0ZW4gdG8gZXZlbnRzXG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLy8gTWFya2VyIGV2ZW50c1xuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ21hcmtlcicgJiYgZXZlbnQudHlwZSA9PT0gJ2hpZ2hsaWdodCcpIHtcbiAgICAgICAgLy8gSGlnaGxpZ2h0IHRleHRcbiAgICAgICAgdGhpcy5tYXJrZXIoZXZlbnQuY29sb3IsIHRoaXMuc2VsZWN0ZWRUZXh0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlc3RvcmVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuc2F2ZWRTZWxlY3Rpb24pIHtcbiAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBzZWwuYWRkUmFuZ2UodGhpcy5zYXZlZFNlbGVjdGlvbik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9kb2N1bWVudC5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBtYXJrZXIoY29sb3I6IHN0cmluZywgdGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gV2UgaGF2ZSBhIHNlbGVjdGlvbj9cbiAgICBpZiAodGhpcy5yZXN0b3JlU2VsZWN0aW9uKCkpIHtcbiAgICAgIC8vIEV4ZWN1dGUgYmFja2dyb3VuZCBjb2xvclxuICAgICAgdGhpcy5fZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2hpbGl0ZUNvbG9yJywgZmFsc2UsIGNvbG9yKTtcbiAgICAgIC8vIFRyaWdnZXIgc3RvcmVkIGhpZ2hsaWdodHNcbiAgICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtvcmlnaW46ICd0ZXh0YXJlYScsIHR5cGU6ICdzdG9yZScsIGNvbG9yOiBjb2xvciwgdGV4dDogdGV4dH0pO1xuICAgIH1cbiAgfVxuICBvblRleHRBcmVhQmx1cigpIHtcbiAgICAvLyBCcm93c2VyIHN1cHBvcnRzIGdldFNlbGVjdGlvbigpP1xuICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAvLyBHZXQgc2VsZWN0aW9uXG4gICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAvLyBCcm93c2VyIHN1cHBvcnQgcmFuZ2U/XG4gICAgICBpZiAoc2VsZWN0aW9uLmdldFJhbmdlQXQgJiYgc2VsZWN0aW9uLnJhbmdlQ291bnQpIHtcbiAgICAgICAgLy8gR2V0IHJhbmdlIGFuZCBzZWxlY3RlZCB0ZXh0XG4gICAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRleHQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2RvY3VtZW50LmdldFNlbGVjdGlvbiAmJiB0aGlzLl9kb2N1bWVudC5jcmVhdGVSYW5nZSkge1xuICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBudWxsO1xuICAgIH1cblxuICB9XG5cbiAgLy8gR2V0IHNlbGVjdGlvbiBiZWZvcmUgYmx1ciAoZm9yIGZsb2F0aW5nIG1hcmtlcilcbiAgb25TZWxlY3Rpb24oJGV2ZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIGlmIChzZWxlY3Rpb24udHlwZSA9PT0gJ1JhbmdlJykge1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe29yaWdpbjogJ3RleHRhcmVhJywgdHlwZTogJ3NlbGVjdGlvbicsIHZhbHVlOiBzZWxlY3Rpb259KTtcbiAgICB9XG5cbiAgICAvLyBTZWxlY3Rpb24gaXMgbm90IGEgcmFuZ2UsIG1lYW5zIHRoZSB1c2VyIGp1c3QgcGxhY2VzIGNhcmV0IGluIGFub3RoZXIgcGxhY2UsIGxldCdzIGxldCB0aGUgZmxvYXRpbmcgbWFya2VyIGtub3dzIGFib3V0IGl0XG4gICAgaWYgKHNlbGVjdGlvbi50eXBlICE9PSAnUmFuZ2UnKSB7XG4gICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7b3JpZ2luOiAndGV4dGFyZWEnLCB0eXBlOiAnYmx1cid9KTtcbiAgICB9XG4gIH1cblxuXG59XG5cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1zdG9yZWQtaGlnaGxpZ2h0cycsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInN0b3JhZ2Utd3JhcHBlclwiPlxuICA8dWwgY2xhc3M9XCJzb3RyYWdlLWZpbHRlcnNcIj5cbiAgICA8bGkgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBmaWx0ZXJzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogZmlsdGVyLmNvbG9yfVwiPjwvbGk+XG4gIDwvdWw+XG4gIDx1bCBjbGFzcz1cInNvdHJhZ2UtbGlzdFwiPlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdG9yZVwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGl0ZW0uY29sb3J9XCI+e3tpdGVtLnRleHR9fTwvbGk+XG4gIDwvdWw+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCdzdG9yZScpIHN0b3JlID0gW107XG4gIEBJbnB1dCgnZmlsdGVycycpIGZpbHRlcnM7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ3N0b3JlJykge1xuICAgICAgICB0aGlzLnN0b3JlLnB1c2goe3RleHQ6IGV2ZW50LnRleHQsIGNvbG9yOiBldmVudC5jb2xvcn0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgY29uc29sZS5sb2codGhpcy5maWx0ZXJzKVxuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1tYXJrZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmaXhlZCBjb2xvcnNcIiAqbmdJZj1cIm1hcmtlclN0eWxlID09PSAnZml4ZWQnXCI+XG4gIDxkaXYgY2xhc3M9XCJjb2xvclwiICpuZ0Zvcj1cImxldCBjb2xvciBvZiBjb2xvcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvcn1cIiAoY2xpY2spPVwibWFyayhjb2xvcilcIj48L2Rpdj5cbjwvZGl2PlxuXG48ZGl2ICNmbG9hdGluZ01hcmtlciBjbGFzcz1cImZsb2F0aW5nIGNvbG9yc1wiICpuZ0lmPVwibWFya2VyU3R5bGUgPT09ICdmbG9hdCdcIiBbbmdTdHlsZV09XCJ7J2xlZnQnOiBwb3NpdGlvblgrJ3B4JywgJ3RvcCc6IHBvc2l0aW9uWSsncHgnLCAndmlzaWJpbGl0eSc6IHZpc2liaWxpdHl9XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbG9yXCIgKm5nRm9yPVwibGV0IGNvbG9yIG9mIGNvbG9yc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9yfVwiIChjbGljayk9XCJtYXJrKGNvbG9yKVwiPjwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmNvbG9ycy5maXhlZHt3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcH0uZml4ZWQ+LmNvbG9ye3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHg7bWFyZ2luOjAgMTBweCAxMHB4IDA7Y3Vyc29yOnBvaW50ZXI7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMTIpLDAgMXB4IDJweCByZ2JhKDAsMCwwLC4yNCk7dHJhbnNpdGlvbjouM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSl9LmZpeGVkPi5jb2xvcjpob3Zlcntib3JkZXItcmFkaXVzOjUwJTtib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMil9LmNvbG9ycy5mbG9hdGluZ3twb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDphdXRvO2JhY2tncm91bmQtY29sb3I6IzQwNDA0MDtib3JkZXItcmFkaXVzOjRweDtib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMik7dHJhbnNpdGlvbjp0b3AgLjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO2Rpc3BsYXk6ZmxleH0uZmxvYXRpbmc+LmNvbG9ye21hcmdpbjoxMHB4O2N1cnNvcjpwb2ludGVyO3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHg7dHJhbnNpdGlvbjp0b3AgLjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpLGJvcmRlci1yYWRpdXMgLjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO3otaW5kZXg6MTB9LmZsb2F0aW5nPi5jb2xvcjpob3Zlcntib3JkZXItcmFkaXVzOjUwJX0uZmxvYXRpbmcuY29sb3JzOmFmdGVye2NvbnRlbnQ6Jyc7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTtiYWNrZ3JvdW5kLWNvbG9yOiM0MDQwNDA7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtib3R0b206LTVweDtsZWZ0OmNhbGMoNTAlIC0gMTBweCk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTt6LWluZGV4OjF9YF1cbn0pXG5leHBvcnQgY2xhc3MgTWFya2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgcG9zaXRpb25YID0gMDtcbiAgcG9zaXRpb25ZID0gMDtcbiAgdmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICBASW5wdXQoJ21hcmtlclN0eWxlJykgbWFya2VyU3R5bGUgPSAnZml4ZWQnO1xuICBASW5wdXQoJ2NvbG9ycycpIGNvbG9ycztcbiAgQFZpZXdDaGlsZCgnZmxvYXRpbmdNYXJrZXInKSBmbG9hdGluZ01hcmtlcjogYW55O1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvLyBFdmVudCBmcm9tIHRleHRhcmVhIHJlZ2FyZGluZyB0ZXh0IHNlbGVjdGlvbiBhbmQgbWFya2VyIHN0eWxlIGlzIHNldCB0byBmbG9hdFxuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ3RleHRhcmVhJyAmJiBldmVudC50eXBlID09PSAnc2VsZWN0aW9uJyAmJiB0aGlzLm1hcmtlclN0eWxlID09PSAnZmxvYXQnKSB7XG4gICAgICAgIC8vIE91ciBtYWtlciB3aWR0aCBpcyBhdXRvIChUT0RPOiBjb2xvcnMgY2FuIGJlIGFkZGVkIGFzIGFuIGlucHV0KSwgbGV0J3MgZ2V0IGl0cyBjb21wdXRlZCB3aWR0aFxuICAgICAgICBjb25zdCBtYXJrZXJXaWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZmxvYXRpbmdNYXJrZXIubmF0aXZlRWxlbWVudCkud2lkdGg7XG4gICAgICAgIC8vIFNlbGVjdGlvbiB3aWR0aCBhbmQgaGVpZ2h0IGZyb20gcmFuZ2UgYm91bmRpbmcgcmVjdGFuZ2xlXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbldpZHRoID0gZXZlbnQudmFsdWUuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgY29uc3QgeENlbnRlciA9IChwYXJzZUludChtYXJrZXJXaWR0aCwgMCkgLSBzZWxlY3Rpb25XaWR0aCkgLyAyO1xuXG5cbiAgICAgICAgdGhpcy5wb3NpdGlvblggPSBldmVudC52YWx1ZS5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSB4Q2VudGVyO1xuICAgICAgICAvLyA2NHB4ID0gNGVtIChkb3VibGUgdGhlIGxpbmUgaGVpZ2h0KVxuICAgICAgICB0aGlzLnBvc2l0aW9uWSA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gNjQ7XG5cbiAgICAgICAgLy8gTGV0J3Mgc2hvdyBvdXIgZmxvYXRpbmcgbWFya2VyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgIH1cblxuICAgICAgLy8gRXZlbnQgZnJvbSB0ZXh0YXJlYSByZWdhcmRpbmcgbG9zaW5nIGZvY3VzIGFuZCBtYXJrZXIgc3R5bGUgaXMgc2V0IHRvIGZsb2F0XG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAndGV4dGFyZWEnICYmIGV2ZW50LnR5cGUgPT09ICdibHVyJyAmJiB0aGlzLm1hcmtlclN0eWxlID09PSAnZmxvYXQnKSB7XG4gICAgICAgIC8vIExldCdzIGhpZGUgb3VyIGZsb2F0aW5nIG1hcmtlclxuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG1hcmsoY29sb3IpIHtcbiAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7XG4gICAgICBvcmlnaW46ICdtYXJrZXInLFxuICAgICAgdHlwZTogJ2hpZ2hsaWdodCcsXG4gICAgICBjb2xvcjogY29sb3JcbiAgICB9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVWYWx1ZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdzYWZlSHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU2FmZUh0bWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICB0cmFuc2Zvcm0oaHRtbDogc3RyaW5nKTogU2FmZVZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRhcmVhQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0b3JlZC1oaWdobGlnaHRzL3N0b3JlZC1oaWdobGlnaHRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IFNhZmVIdG1sUGlwZSB9IGZyb20gJy4vcGlwZXMvc2FmZS1odG1sLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCxcbiAgICBUZXh0YXJlYUNvbXBvbmVudCxcbiAgICBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBTYWZlSHRtbFBpcGVcbiAgXSxcbiAgZXhwb3J0czogW05neFRleHRIaWdobGlnaHRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJPdXRwdXQiLCJJbnB1dCIsIkluamVjdCIsIkRPQ1VNRU5UIiwiVmlld0NoaWxkIiwiUGlwZSIsIkRvbVNhbml0aXplciIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7Ozt3Q0FKRDs7Ozs7OztBQ0FBO1FBUUU7eUJBRjJCLElB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