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
                        template: "\n    <th-marker [markerStyle]=\"markerStyle\"></th-marker>\n    <th-textarea></th-textarea>\n    <th-stored-highlights></th-stored-highlights>\n  ",
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
            markerStyle: [{ type: i0.Input, args: ['markerStyle',] }]
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
                // Loses focus? Let the floating marker knows about it
                this.events.dispatch({ origin: 'textarea', type: 'blur' });
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
                // Selection is not a range, user clicked inside user area to hide floating marker
                if (selection.type !== 'Range') {
                    this.events.dispatch({ origin: 'textarea', type: 'blur' });
                }
            };
        TextareaComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'th-textarea',
                        template: "    <div class=\"textarea\"\n        (mouseup)=\"onSelection($event)\"\n        [attr.contenteditable]=\"true\"\n        (blur)=\"onTextAreaBlur()\">\n    </div>\n",
                        styles: [".textarea{height:250px;overflow:auto;background-color:#f1f1f1;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);border-radius:2px;line-height:2em}.textarea:focus{outline:0}"]
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
            };
        StoredHighlightsComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'th-stored-highlights',
                        template: "<ul>\n<li *ngFor=\"let item of store\" [ngStyle]=\"{'background-color': item.color}\">{{item.text}}</li>\n</ul>\n",
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
            store: [{ type: i0.Input, args: ['store',] }]
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
            this.colors = ['#f44336', '#ffeb3b', '#4caf50'];
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
                        // let get selection bounding rectangle
                        // let get selection bounding rectangle
                        _this.positionX = event.value.getRangeAt(0).getBoundingClientRect().left;
                        _this.positionY = event.value.getRangeAt(0).getBoundingClientRect().top;
                        console.log('selection');
                        // Let's show our floating marker
                        // Let's show our floating marker
                        _this.visibility = 'visible';
                    }
                    // Event from textarea regarding losing focus and marker style is set to float
                    if (event.origin === 'textarea' && event.type === 'blur' && _this.markerStyle === 'float') {
                        console.log('loses focus');
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
                        template: "<div class=\"fixed colors\" *ngIf=\"markerStyle === 'fixed'\">\n  <div class=\"color\" *ngFor=\"let color of colors\" [ngStyle]=\"{'background-color': color}\" (click)=\"mark(color)\"></div>\n</div>\n\n<div class=\"floating colors\" *ngIf=\"markerStyle === 'float'\" [ngStyle]=\"{'left': positionX+'px', 'top': positionY+'px', 'visibility': visibility}\">\n    <div class=\"color\" *ngFor=\"let color of colors\" [ngStyle]=\"{'background-color': color}\" (click)=\"mark(color)\"></div>\n</div>\n",
                        styles: [".colors.fixed{width:100%;display:flex;flex-wrap:wrap}.fixed>.color{width:30px;height:30px;margin:0 10px 10px 0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:.3s cubic-bezier(.25,.8,.25,1)}.fixed>.color:hover{border-radius:50%;box-shadow:0 10px 10px rgba(0,0,0,.25),0 5px 5px rgba(0,0,0,.22)}.colors.floating{position:absolute;width:auto;background-color:#404040;border-radius:2px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:top .3s cubic-bezier(.25,.8,.25,1);display:flex}.floating>.color{margin:10px;cursor:pointer;width:30px;height:30px;transition:top .3s cubic-bezier(.25,.8,.25,1),border-radius .3s cubic-bezier(.25,.8,.25,1)}.floating>.color:hover{border-radius:50%}"]
                    },] },
        ];
        /** @nocollapse */
        MarkerComponent.ctorParameters = function () {
            return [
                { type: EventsService }
            ];
        };
        MarkerComponent.propDecorators = {
            markerStyle: [{ type: i0.Input, args: ['markerStyle',] }]
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuc2VydmljZS50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9jb21wb25lbnRzL3N0b3JlZC1oaWdobGlnaHRzL3N0b3JlZC1oaWdobGlnaHRzLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9waXBlcy9zYWZlLWh0bWwucGlwZS50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL25neC10ZXh0LWhpZ2hsaWdodGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neFRleHRIaWdobGlnaHRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRzU2VydmljZSB7XG4gIGV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuICAvLyBEaXNwYXRjaCBldmVudHMgYWNyb3NzIGNvbXBvbmVudHNcbiAgZGlzcGF0Y2goZXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLy8gTGlzdGVucyB0byBkaXNwYXRjaGVkIGV2ZW50c1xuICBsaXN0ZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx0aC1tYXJrZXIgW21hcmtlclN0eWxlXT1cIm1hcmtlclN0eWxlXCI+PC90aC1tYXJrZXI+XG4gICAgPHRoLXRleHRhcmVhPjwvdGgtdGV4dGFyZWE+XG4gICAgPHRoLXN0b3JlZC1oaWdobGlnaHRzPjwvdGgtc3RvcmVkLWhpZ2hsaWdodHM+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAT3V0cHV0KCkgdGV4dFNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPHt9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgQElucHV0KCdtYXJrZXJTdHlsZScpIG1hcmtlclN0eWxlID0gJ2ZpeGVkJztcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gTGlzdGVucyB0byBldmVudHMgZnJvbSBjaGlsZCBjb21wb25lbnRzXG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIC8vIENoZWNrIGV2ZW50IG9yaWdpbiAod2hpY2ggY29tcG9uZW50IGRpc3BhdGNoZWQgdGhpcyBldmVudClcbiAgICAgIHN3aXRjaCAoZXZlbnQub3JpZ2luKSB7XG4gICAgICAgIC8vIEV2ZW50cyBjb21pbmcgZnJvbSB0aGUgdGV4dGFyZWEgY29tcG9uZW50XG4gICAgICAgIGNhc2UgKCd0ZXh0YXJlYScpOlxuICAgICAgICAgIC8vIEVtaXQgZXZlbnQgdG8gdGhlIGxpYnJhcnkgY29tcG9uZW50IG91dHB1dFxuICAgICAgICAgIHRoaXMudGV4dFNlbGVjdGlvbi5lbWl0KHtzZWxlY3Rpb246IGV2ZW50LnNlbGVjdGlvbiwgbW91c2VFdmVudDogZXZlbnQubW91c2VFdmVudH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbmplY3QsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC10ZXh0YXJlYScsXG4gIHRlbXBsYXRlOiBgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYVwiXG4gICAgICAgIChtb3VzZXVwKT1cIm9uU2VsZWN0aW9uKCRldmVudClcIlxuICAgICAgICBbYXR0ci5jb250ZW50ZWRpdGFibGVdPVwidHJ1ZVwiXG4gICAgICAgIChibHVyKT1cIm9uVGV4dEFyZWFCbHVyKClcIj5cbiAgICA8L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AudGV4dGFyZWF7aGVpZ2h0OjI1MHB4O292ZXJmbG93OmF1dG87YmFja2dyb3VuZC1jb2xvcjojZjFmMWYxO3BhZGRpbmc6MjBweDtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTtib3JkZXItcmFkaXVzOjJweDtsaW5lLWhlaWdodDoyZW19LnRleHRhcmVhOmZvY3Vze291dGxpbmU6MH1gXVxufSlcblxuZXhwb3J0IGNsYXNzIFRleHRhcmVhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgc2F2ZWRTZWxlY3Rpb246IFJhbmdlIHwgbnVsbDtcbiAgc2VsZWN0ZWRUZXh0OiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCAoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIHByaXZhdGUgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBMaXN0ZW4gdG8gZXZlbnRzXG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLy8gTWFya2VyIGV2ZW50c1xuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ21hcmtlcicgJiYgZXZlbnQudHlwZSA9PT0gJ2hpZ2hsaWdodCcpIHtcbiAgICAgICAgLy8gSGlnaGxpZ2h0IHRleHRcbiAgICAgICAgdGhpcy5tYXJrZXIoZXZlbnQuY29sb3IsIHRoaXMuc2VsZWN0ZWRUZXh0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlc3RvcmVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuc2F2ZWRTZWxlY3Rpb24pIHtcbiAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBzZWwuYWRkUmFuZ2UodGhpcy5zYXZlZFNlbGVjdGlvbik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9kb2N1bWVudC5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBtYXJrZXIoY29sb3I6IHN0cmluZywgdGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gV2UgaGF2ZSBhIHNlbGVjdGlvbj9cbiAgICBpZiAodGhpcy5yZXN0b3JlU2VsZWN0aW9uKCkpIHtcbiAgICAgIC8vIEV4ZWN1dGUgYmFja2dyb3VuZCBjb2xvclxuICAgICAgdGhpcy5fZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2hpbGl0ZUNvbG9yJywgZmFsc2UsIGNvbG9yKTtcbiAgICAgIC8vIFRyaWdnZXIgc3RvcmVkIGhpZ2hsaWdodHNcbiAgICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtvcmlnaW46ICd0ZXh0YXJlYScsIHR5cGU6ICdzdG9yZScsIGNvbG9yOiBjb2xvciwgdGV4dDogdGV4dH0pO1xuICAgIH1cbiAgfVxuICBvblRleHRBcmVhQmx1cigpIHtcbiAgICAvLyBMb3NlcyBmb2N1cz8gTGV0IHRoZSBmbG9hdGluZyBtYXJrZXIga25vd3MgYWJvdXQgaXRcbiAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7b3JpZ2luOiAndGV4dGFyZWEnLCB0eXBlOiAnYmx1cid9KTtcbiAgICAvLyBCcm93c2VyIHN1cHBvcnRzIGdldFNlbGVjdGlvbigpP1xuICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAvLyBHZXQgc2VsZWN0aW9uXG4gICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAvLyBCcm93c2VyIHN1cHBvcnQgcmFuZ2U/XG4gICAgICBpZiAoc2VsZWN0aW9uLmdldFJhbmdlQXQgJiYgc2VsZWN0aW9uLnJhbmdlQ291bnQpIHtcbiAgICAgICAgLy8gR2V0IHJhbmdlIGFuZCBzZWxlY3RlZCB0ZXh0XG4gICAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRleHQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2RvY3VtZW50LmdldFNlbGVjdGlvbiAmJiB0aGlzLl9kb2N1bWVudC5jcmVhdGVSYW5nZSkge1xuICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBudWxsO1xuICAgIH1cbiAgfVxuXG4gIC8vIEdldCBzZWxlY3Rpb24gYmVmb3JlIGJsdXIgKGZvciBmbG9hdGluZyBtYXJrZXIpXG4gIG9uU2VsZWN0aW9uKCRldmVudCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICBpZiAoc2VsZWN0aW9uLnR5cGUgPT09ICdSYW5nZScpIHtcbiAgICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtvcmlnaW46ICd0ZXh0YXJlYScsIHR5cGU6ICdzZWxlY3Rpb24nLCB2YWx1ZTogc2VsZWN0aW9ufSk7XG4gICAgfVxuXG4gICAgLy8gU2VsZWN0aW9uIGlzIG5vdCBhIHJhbmdlLCB1c2VyIGNsaWNrZWQgaW5zaWRlIHVzZXIgYXJlYSB0byBoaWRlIGZsb2F0aW5nIG1hcmtlclxuICAgIGlmIChzZWxlY3Rpb24udHlwZSAhPT0gJ1JhbmdlJykge1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe29yaWdpbjogJ3RleHRhcmVhJywgdHlwZTogJ2JsdXInfSk7XG4gICAgfVxuICB9XG5cblxufVxuXG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtc3RvcmVkLWhpZ2hsaWdodHMnLFxuICB0ZW1wbGF0ZTogYDx1bD5cbjxsaSAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdG9yZVwiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGl0ZW0uY29sb3J9XCI+e3tpdGVtLnRleHR9fTwvbGk+XG48L3VsPlxuYCxcbiAgc3R5bGVzOiBbYGBdXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBASW5wdXQoJ3N0b3JlJykgc3RvcmUgPSBbXTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ3RleHRhcmVhJyAmJiBldmVudC50eXBlID09PSAnc3RvcmUnKSB7XG4gICAgICAgIHRoaXMuc3RvcmUucHVzaCh7dGV4dDogZXZlbnQudGV4dCwgY29sb3I6IGV2ZW50LmNvbG9yfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1tYXJrZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmaXhlZCBjb2xvcnNcIiAqbmdJZj1cIm1hcmtlclN0eWxlID09PSAnZml4ZWQnXCI+XG4gIDxkaXYgY2xhc3M9XCJjb2xvclwiICpuZ0Zvcj1cImxldCBjb2xvciBvZiBjb2xvcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvcn1cIiAoY2xpY2spPVwibWFyayhjb2xvcilcIj48L2Rpdj5cbjwvZGl2PlxuXG48ZGl2IGNsYXNzPVwiZmxvYXRpbmcgY29sb3JzXCIgKm5nSWY9XCJtYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0J1wiIFtuZ1N0eWxlXT1cInsnbGVmdCc6IHBvc2l0aW9uWCsncHgnLCAndG9wJzogcG9zaXRpb25ZKydweCcsICd2aXNpYmlsaXR5JzogdmlzaWJpbGl0eX1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sb3JcIiAqbmdGb3I9XCJsZXQgY29sb3Igb2YgY29sb3JzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3J9XCIgKGNsaWNrKT1cIm1hcmsoY29sb3IpXCI+PC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuY29sb3JzLmZpeGVke3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwfS5maXhlZD4uY29sb3J7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDttYXJnaW46MCAxMHB4IDEwcHggMDtjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTt0cmFuc2l0aW9uOi4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKX0uZml4ZWQ+LmNvbG9yOmhvdmVye2JvcmRlci1yYWRpdXM6NTAlO2JveC1zaGFkb3c6MCAxMHB4IDEwcHggcmdiYSgwLDAsMCwuMjUpLDAgNXB4IDVweCByZ2JhKDAsMCwwLC4yMil9LmNvbG9ycy5mbG9hdGluZ3twb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDphdXRvO2JhY2tncm91bmQtY29sb3I6IzQwNDA0MDtib3JkZXItcmFkaXVzOjJweDtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTt0cmFuc2l0aW9uOnRvcCAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7ZGlzcGxheTpmbGV4fS5mbG9hdGluZz4uY29sb3J7bWFyZ2luOjEwcHg7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDt0cmFuc2l0aW9uOnRvcCAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSksYm9yZGVyLXJhZGl1cyAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSl9LmZsb2F0aW5nPi5jb2xvcjpob3Zlcntib3JkZXItcmFkaXVzOjUwJX1gXVxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb2xvcnMgPSBbJyNmNDQzMzYnLCAnI2ZmZWIzYicsICcjNGNhZjUwJ107XG4gIHBvc2l0aW9uWCA9IDA7XG4gIHBvc2l0aW9uWSA9IDA7XG4gIHZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgQElucHV0KCdtYXJrZXJTdHlsZScpIG1hcmtlclN0eWxlID0gJ2ZpeGVkJztcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLy8gRXZlbnQgZnJvbSB0ZXh0YXJlYSByZWdhcmRpbmcgdGV4dCBzZWxlY3Rpb24gYW5kIG1hcmtlciBzdHlsZSBpcyBzZXQgdG8gZmxvYXRcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ3NlbGVjdGlvbicgJiYgdGhpcy5tYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICAvLyBsZXQgZ2V0IHNlbGVjdGlvbiBib3VuZGluZyByZWN0YW5nbGVcbiAgICAgICAgdGhpcy5wb3NpdGlvblggPSBldmVudC52YWx1ZS5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQ7XG4gICAgICAgIHRoaXMucG9zaXRpb25ZID0gZXZlbnQudmFsdWUuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XG4gICAgICAgIGNvbnNvbGUubG9nKCdzZWxlY3Rpb24nKVxuICAgICAgICAvLyBMZXQncyBzaG93IG91ciBmbG9hdGluZyBtYXJrZXJcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgfVxuXG4gICAgICAvLyBFdmVudCBmcm9tIHRleHRhcmVhIHJlZ2FyZGluZyBsb3NpbmcgZm9jdXMgYW5kIG1hcmtlciBzdHlsZSBpcyBzZXQgdG8gZmxvYXRcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ2JsdXInICYmIHRoaXMubWFya2VyU3R5bGUgPT09ICdmbG9hdCcpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2xvc2VzIGZvY3VzJylcbiAgICAgICAgLy8gTGV0J3MgaGlkZSBvdXIgZmxvYXRpbmcgbWFya2VyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbWFyayhjb2xvcikge1xuICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtcbiAgICAgIG9yaWdpbjogJ21hcmtlcicsXG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVZhbHVlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3NhZmVIdG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBTYWZlSHRtbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIHRyYW5zZm9ybShodG1sOiBzdHJpbmcpOiBTYWZlVmFsdWUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dGFyZWFDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGV4dGFyZWEvdGV4dGFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2FmZUh0bWxQaXBlIH0gZnJvbSAnLi9waXBlcy9zYWZlLWh0bWwucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50LFxuICAgIFRleHRhcmVhQ29tcG9uZW50LFxuICAgIFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIFNhZmVIdG1sUGlwZVxuICBdLFxuICBleHBvcnRzOiBbTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIk91dHB1dCIsIklucHV0IiwiSW5qZWN0IiwiRE9DVU1FTlQiLCJQaXBlIiwiRG9tU2FuaXRpemVyIiwiTmdNb2R1bGUiLCJDb21tb25Nb2R1bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtRQU9FO1NBQWlCOztvQkFMbEJBLGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7O3dDQUpEOzs7Ozs7O0FDQUE7UUFRRTt5QkFGMkIsSUFBSUMsZUFBWSxFQUFFO1NBRTVCOzs7Ozs7UUFFakIsZ0NBQVE7Ozs7WUFBUixVQUFTLEtBQUs7Z0JBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDeEI7Ozs7O1FBR0QsOEJBQU07OztZQUFOO2dCQUNFLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQzthQUNuQjs7b0JBZkZELGFBQVUsU0FBQzt3QkFDVixVQUFVLEVBQUUsTUFBTTtxQkFDbkI7Ozs7OzRCQUpEOzs7Ozs7O0FDQUE7UUFlRSxxQ0FBc0IsTUFBcUI7WUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtpQ0FGQyxJQUFJQyxlQUFZLEVBQUU7K0JBQzFCLE9BQU87U0FD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