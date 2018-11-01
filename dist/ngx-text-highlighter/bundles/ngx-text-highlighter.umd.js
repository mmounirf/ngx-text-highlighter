(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/platform-browser'), require('@angular/common')) :
    typeof define === 'function' && define.amd ? define('ngx-text-highlighter', ['exports', '@angular/core', '@angular/platform-browser', '@angular/common'], factory) :
    (factory((global['ngx-text-highlighter'] = {}),global.ng.core,global.ng.platformBrowser,global.ng.common));
}(this, (function (exports,i0,platformBrowser,common) { 'use strict';

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
            { type: i0.Component, args: [{
                        selector: 'th-container',
                        template: "\n    <th-marker></th-marker>\n    <th-textarea></th-textarea>\n    <th-stored-highlights></th-stored-highlights>\n  ",
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
                /** @type {?} */
                var length = position.ends - position.starts;
                return string.substring(0, position.starts) + replace + string.substring(position.ends);
            };
        TextareaComponent.decorators = [
            { type: i0.Component, args: [{
                        selector: 'th-textarea',
                        template: "<div\n  class=\"textarea\"\n  (mouseup)=\"handleSelection($event)\"\n  contenteditable=\"true\"\n  [innerHtml]=\"content | safeHtml\"\n  (input)=\"$event.target.innerHtml\"\n  (blur)=\"handleBlur($event)\"\n></div>\n",
                        styles: [".textarea{height:250px;overflow:auto;background-color:#f1f1f1;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);border-radius:2px;line-height:2em}.textarea:focus{outline:0}"]
                    },] },
        ];
        /** @nocollapse */
        TextareaComponent.ctorParameters = function () {
            return [
                { type: EventsService },
                { type: platformBrowser.DomSanitizer }
            ];
        };
        return TextareaComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
     */
    var StoredHighlightsComponent = (function () {
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
            { type: i0.Component, args: [{
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
    var MarkerComponent = (function () {
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
            { type: i0.Component, args: [{
                        selector: 'th-marker',
                        template: "<div class=\"colors\">\n  <div class=\"color\" *ngFor=\"let color of colors\" [ngStyle]=\"{'background-color': color}\" (click)=\"mark(color)\"></div>\n</div>\n",
                        styles: [".colors{width:100%;display:flex;flex-wrap:wrap}.color{width:50px;height:50px;margin:0 10px 10px 0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:.3s cubic-bezier(.25,.8,.25,1)}.color:hover{border-radius:50%;box-shadow:0 10px 10px rgba(0,0,0,.25),0 5px 5px rgba(0,0,0,.22)}"]
                    },] },
        ];
        /** @nocollapse */
        MarkerComponent.ctorParameters = function () {
            return [
                { type: EventsService }
            ];
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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuc2VydmljZS50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9jb21wb25lbnRzL3N0b3JlZC1oaWdobGlnaHRzL3N0b3JlZC1oaWdobGlnaHRzLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9waXBlcy9zYWZlLWh0bWwucGlwZS50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL25neC10ZXh0LWhpZ2hsaWdodGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neFRleHRIaWdobGlnaHRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRzU2VydmljZSB7XG4gIGV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuICAvLyBEaXNwYXRjaCBldmVudHMgYWNyb3NzIGNvbXBvbmVudHNcbiAgZGlzcGF0Y2goZXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLy8gTGlzdGVucyB0byBkaXNwYXRjaGVkIGV2ZW50c1xuICBsaXN0ZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx0aC1tYXJrZXI+PC90aC1tYXJrZXI+XG4gICAgPHRoLXRleHRhcmVhPjwvdGgtdGV4dGFyZWE+XG4gICAgPHRoLXN0b3JlZC1oaWdobGlnaHRzPjwvdGgtc3RvcmVkLWhpZ2hsaWdodHM+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAT3V0cHV0KCkgdGV4dFNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPHt9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gVE9ETyAvLyBJbXBsZW1lbnQgZmxvYXRpbmcgbWFya2VyXG4gIEBJbnB1dCgnbWFya2VyU3R5bGUnKSBtYXJrZXJTdHlsZSA9ICdmaXhlZCc7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIExpc3RlbnMgdG8gZXZlbnRzIGZyb20gY2hpbGQgY29tcG9uZW50c1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAvLyBDaGVjayBldmVudCBvcmlnaW4gKHdoaWNoIGNvbXBvbmVudCBkaXNwYXRjaGVkIHRoaXMgZXZlbnQpXG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9yaWdpbikge1xuICAgICAgICAvLyBFdmVudHMgY29taW5nIGZyb20gdGhlIHRleHRhcmVhIGNvbXBvbmVudFxuICAgICAgICBjYXNlICgndGV4dGFyZWEnKTpcbiAgICAgICAgICAvLyBFbWl0IGV2ZW50IHRvIHRoZSBsaWJyYXJ5IGNvbXBvbmVudCBvdXRwdXRcbiAgICAgICAgICB0aGlzLnRleHRTZWxlY3Rpb24uZW1pdCh7c2VsZWN0aW9uOiBldmVudC5zZWxlY3Rpb24sIG1vdXNlRXZlbnQ6IGV2ZW50Lm1vdXNlRXZlbnR9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC10ZXh0YXJlYScsXG4gIHRlbXBsYXRlOiBgPGRpdlxuICBjbGFzcz1cInRleHRhcmVhXCJcbiAgKG1vdXNldXApPVwiaGFuZGxlU2VsZWN0aW9uKCRldmVudClcIlxuICBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCJcbiAgW2lubmVySHRtbF09XCJjb250ZW50IHwgc2FmZUh0bWxcIlxuICAoaW5wdXQpPVwiJGV2ZW50LnRhcmdldC5pbm5lckh0bWxcIlxuICAoYmx1cik9XCJoYW5kbGVCbHVyKCRldmVudClcIlxuPjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC50ZXh0YXJlYXtoZWlnaHQ6MjUwcHg7b3ZlcmZsb3c6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiNmMWYxZjE7cGFkZGluZzoyMHB4O2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO2JvcmRlci1yYWRpdXM6MnB4O2xpbmUtaGVpZ2h0OjJlbX0udGV4dGFyZWE6Zm9jdXN7b3V0bGluZTowfWBdXG59KVxuXG5leHBvcnQgY2xhc3MgVGV4dGFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlLCBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7IH1cbiAgY29udGVudCA9ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBWaXZhbXVzIHNpdCBhbWV0IGZhY2lsaXNpcyBkdWksIGEgZmluaWJ1cyBkdWkuIERvbmVjIGRpZ25pc3NpbSwganVzdG8gYXQgcGxhY2VyYXQgbWF4aW11cywgdXJuYSB0dXJwaXMgdml2ZXJyYSB1cm5hLCBhdCBoZW5kcmVyaXQgZHVpIHNlbSBzZWQgcXVhbS4gRG9uZWMgdGluY2lkdW50IG1hZ25hIHF1aXMgdG9ydG9yIGRpZ25pc3NpbSwgYXQgY29uZGltZW50dW0gdHVycGlzIGxhY2luaWEuIEFlbmVhbiBpZCB0dXJwaXMgc2l0IGFtZXQgbGFjdXMgc2VtcGVyIHNvbGxpY2l0dWRpbi4gTnVsbGFtIGdyYXZpZGEgZXJhdCB2aXRhZSBwb3N1ZXJlIHNhZ2l0dGlzLiBWZXN0aWJ1bHVtIGFudGUgaXBzdW0gcHJpbWlzIGluIGZhdWNpYnVzIG9yY2kgbHVjdHVzIGV0IHVsdHJpY2VzIHBvc3VlcmUgY3ViaWxpYSBDdXJhZTsgQWxpcXVhbSBlcmF0IHZvbHV0cGF0LiBGdXNjZSBuZWMgc2FwaWVuIHNhZ2l0dGlzLCB0aW5jaWR1bnQgdG9ydG9yIHF1aXMsIHVsdHJpY2llcyBtYWduYS4gTnVsbGFtIG51bGxhIGVyYXQsIGxhb3JlZXQgbm9uIG5lcXVlIGV0LCBiaWJlbmR1bSBvcm5hcmUgbmlzbC4gQWxpcXVhbSBuaXNsIG1hc3NhLCBsb2JvcnRpcyBub24gbWV0dXMgcXVpcywgaGVuZHJlcml0IHJ1dHJ1bSBlbmltLiBOdWxsYW0gaW4gbG9yZW0gdXQgZGlhbSB2YXJpdXMgcnV0cnVtIGVnZXQgY29uc2VjdGV0dXIgZXN0LiBBbGlxdWFtIHF1aXMgdmVsaXQgaWFjdWxpcywgdmVoaWN1bGEgbGVjdHVzIGEsIGltcGVyZGlldCBhcmN1LiBJbiBzb2RhbGVzIGRvbG9yIGV1IGVyYXQgdGluY2lkdW50LCBldCBjdXJzdXMgZHVpIHZlc3RpYnVsdW0uIFZlc3RpYnVsdW0gYW50ZSBpcHN1bSBwcmltaXMgaW4gZmF1Y2lidXMgb3JjaSBsdWN0dXMgZXQgdWx0cmljZXMgcG9zdWVyZSBjdWJpbGlhIEN1cmFlOyBQaGFzZWxsdXMgc2VkIGNvbmd1ZSB0ZWxsdXMuIFF1aXNxdWUgcHVsdmluYXIgZmVsaXMgYWxpcXVhbSBudW5jIHVsdHJpY2VzIHVsbGFtY29ycGVyLiBQcm9pbiBlZ2V0IGxhY3VzIGF0IG1hc3NhIHVsbGFtY29ycGVyIHN1c2NpcGl0LiBTZWQgYmliZW5kdW0gcHVydXMgbG9yZW0sIGF0IG9ybmFyZSBlc3QgYWxpcXVldCBkaWN0dW0uIE51bGxhIGVsZWlmZW5kIGVyb3MgY29uZ3VlIG51bGxhIGx1Y3R1cyBhdWN0b3IuIERvbmVjIG1hbGVzdWFkYSBjb25zZWN0ZXR1ciB2ZXN0aWJ1bHVtLiBTdXNwZW5kaXNzZSB1dCBuZXF1ZSBhYyByaXN1cyBlbGVpZmVuZCB0ZW1wdXMgc2l0IGFtZXQgcXVpcyB0dXJwaXMuIFByYWVzZW50IHRpbmNpZHVudCBiaWJlbmR1bSBlZ2VzdGFzLiBJbnRlZ2VyIHBvcnRhIGFjY3Vtc2FuIG1ldHVzLCBuZWMgZmluaWJ1cyBqdXN0byBmZXJtZW50dW0gYWMuIE51bGxhIGZhY2lsaXNpLiBQZWxsZW50ZXNxdWUgZXJhdCBhdWd1ZSwgY29uZ3VlIG5lYyBlc3QgYWMsIGJpYmVuZHVtIGNvbmd1ZSBsaWJlcm8uIE1hZWNlbmFzIHZlbmVuYXRpcyB2ZWwgbGFjdXMgaW4gbW9sbGlzLiBVdCBzb2xsaWNpdHVkaW4gdmVsIGlwc3VtIHNpdCBhbWV0IGFsaXF1ZXQuIERvbmVjIHRpbmNpZHVudCB0ZW1wdXMgZXN0IGEgbWFsZXN1YWRhLic7XG4gIHNlbGVjdGlvbiA9ICcnO1xuICBwb3NpdGlvbjtcbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcblxuICAgICAgc3dpdGNoIChldmVudC5vcmlnaW4pIHtcblxuICAgICAgICBjYXNlICgnbWFya2VyJyk6XG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnJlcGxhY2VBdCh0aGlzLmNvbnRlbnQsIHRoaXMucG9zaXRpb24sIGA8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7ZXZlbnQuY29sb3J9O1wiPiR7dGhpcy5zZWxlY3Rpb259PC9zcGFuPmApO1xuICAgICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAoJ3RleHRhcmVhJyk6XG4gICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBldmVudC5zZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uID0ge3N0YXJ0czogZXZlbnQuc2VsZWN0aW9uLmFuY2hvck9mZnNldCwgZW5kczogZXZlbnQuc2VsZWN0aW9uLmZvY3VzT2Zmc2V0fTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG4gIGhhbmRsZVNlbGVjdGlvbigkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcblxuICAgIGNvbnN0IHNlbGVjdGlvbjogU2VsZWN0aW9uID0gJGV2ZW50LnZpZXcuZ2V0U2VsZWN0aW9uKCk7XG5cbiAgICBpZiAoc2VsZWN0aW9uLnR5cGUgPT09ICdSYW5nZScpIHtcbiAgICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtcbiAgICAgICAgICBvcmlnaW46ICd0ZXh0YXJlYScsXG4gICAgICAgICAgdHlwZTogJ3NlbGVjdGlvbicsXG4gICAgICAgICAgbW91c2VFdmVudDogJGV2ZW50LFxuICAgICAgICAgIHNlbGVjdGlvbjogc2VsZWN0aW9uLFxuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBoYW5kbGVCbHVyKCRldmVudCkge1xuICAgIHRoaXMuY29udGVudCA9ICRldmVudC50YXJnZXQuaW5uZXJIVE1MO1xuICB9XG5cbiAgcmVwbGFjZUF0KHN0cmluZywgcG9zaXRpb24sIHJlcGxhY2UpIHtcbiAgICBjb25zdCBsZW5ndGggPSBwb3NpdGlvbi5lbmRzIC0gcG9zaXRpb24uc3RhcnRzO1xuICAgIHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKDAsIHBvc2l0aW9uLnN0YXJ0cykgKyByZXBsYWNlICsgc3RyaW5nLnN1YnN0cmluZyhwb3NpdGlvbi5lbmRzKTtcbiAgfVxuXG59XG5cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtc3RvcmVkLWhpZ2hsaWdodHMnLFxuICB0ZW1wbGF0ZTogYDxwPlxuICBzdG9yZWQtaGlnaGxpZ2h0cyB3b3JrcyFcbjwvcD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1tYXJrZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb2xvcnNcIj5cbiAgPGRpdiBjbGFzcz1cImNvbG9yXCIgKm5nRm9yPVwibGV0IGNvbG9yIG9mIGNvbG9yc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9yfVwiIChjbGljayk9XCJtYXJrKGNvbG9yKVwiPjwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmNvbG9yc3t3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcH0uY29sb3J7d2lkdGg6NTBweDtoZWlnaHQ6NTBweDttYXJnaW46MCAxMHB4IDEwcHggMDtjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTt0cmFuc2l0aW9uOi4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKX0uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCU7Ym94LXNoYWRvdzowIDEwcHggMTBweCByZ2JhKDAsMCwwLC4yNSksMCA1cHggNXB4IHJnYmEoMCwwLDAsLjIyKX1gXVxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb2xvcnMgPSBbJyNmNDQzMzYnLCAnI2ZmZWIzYicsICcjNGNhZjUwJ107XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbWFyayhjb2xvcikge1xuICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtcbiAgICAgIG9yaWdpbjogJ21hcmtlcicsXG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVZhbHVlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3NhZmVIdG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBTYWZlSHRtbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIHRyYW5zZm9ybShodG1sOiBzdHJpbmcpOiBTYWZlVmFsdWUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dGFyZWFDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGV4dGFyZWEvdGV4dGFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2FmZUh0bWxQaXBlIH0gZnJvbSAnLi9waXBlcy9zYWZlLWh0bWwucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50LFxuICAgIFRleHRhcmVhQ29tcG9uZW50LFxuICAgIFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIFNhZmVIdG1sUGlwZVxuICBdLFxuICBleHBvcnRzOiBbTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOlsiSW5qZWN0YWJsZSIsIkV2ZW50RW1pdHRlciIsIkNvbXBvbmVudCIsIk91dHB1dCIsIklucHV0IiwiRG9tU2FuaXRpemVyIiwiUGlwZSIsIk5nTW9kdWxlIiwiQ29tbW9uTW9kdWxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUE7UUFPRTtTQUFpQjs7b0JBTGxCQSxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7Ozt3Q0FKRDs7Ozs7OztBQ0FBO1FBUUU7eUJBRjJCLElBQUlDLGVBQVksRUFBRTtTQUU1Qjs7Ozs7O1FBRWpCLGdDQUFROzs7O1lBQVIsVUFBUyxLQUFLO2dCQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3hCOzs7OztRQUdELDhCQUFNOzs7WUFBTjtnQkFDRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUM7YUFDbkI7O29CQWZGRCxhQUFVLFNBQUM7d0JBQ1YsVUFBVSxFQUFFLE1BQU07cUJBQ25COzs7Ozs0QkFKRDs7Ozs7OztBQ0FBO1FBZ0JFLHFDQUFzQixNQUFxQjtZQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO2lDQUhDLElBQUlDLGVBQVksRUFBRTs7K0JBRTFCLE9BQU87U0FDSzs7OztRQUVoRCw4Q0FBUTs7O1lBQVI7Z0JBQUEsaUJBZ0JDOztnQkFkQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7O29CQUVsQyxRQUFRLEtBQUssQ0FBQyxNQUFNOzt3QkFFbEIsTUFBTSxVQUFVOzs7NEJBRWQsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsRUFBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxDQUFDLFVBQVUsRUFBQyxDQUFDLENBQUM7NEJBQ3RGLE1BQU07d0JBRU47NEJBQ0EsTUFBTTtxQkFDUDtpQkFDRixDQUFDLENBQUM7YUFFSjs7OztRQUVELGlEQUFXOzs7WUFBWDtnQkFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3BDOztvQkFuQ0ZDLFlBQVMsU0FBQzt3QkFDVCxRQUFRLEVBQUUsY0FBYzt3QkFDeEIsUUFBUSxFQUFFLHVIQUlUO3dCQUNELE1BQU0sRUFBRSxFQUFFO3FCQUNYOzs7Ozt3QkFWUSxhQUFhOzs7O29DQVluQkMsU0FBTTtrQ0FFTkMsUUFBSyxTQUFDLGFBQWE7OzBDQWZ0Qjs7Ozs7OztBQ0FBO1FBbUJFLDJCQUFzQixNQUFxQixFQUFVLFNBQXVCO1lBQXRELFdBQU0sR0FBTixNQUFNLENBQWU7WUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFjOzJCQUNsRSwra0RBQStrRDs2QkFDN2tELEVBQUU7U0FGbUU7Ozs7UUFJakYsb0NBQVE7OztZQUFSO2dCQUFBLGlCQW9CQztnQkFuQkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLO29CQUVsQyxRQUFRLEtBQUssQ0FBQyxNQUFNO3dCQUVsQixNQUFNLFFBQVE7NEJBQ1osSUFBSSxLQUFJLENBQUMsU0FBUyxFQUFFO2dDQUNsQixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUksQ0FBQyxTQUFTLENBQUMsS0FBSSxDQUFDLE9BQU8sRUFBRSxLQUFJLENBQUMsUUFBUSxFQUFFLHFDQUFrQyxLQUFLLENBQUMsS0FBSyxZQUFNLEtBQUksQ0FBQyxTQUFTLFlBQVMsQ0FBQyxDQUFDOzZCQUN4STs0QkFDSCxNQUFNO3dCQUVOLE1BQU0sVUFBVTs0QkFDZCxLQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7NEJBQzVDLEtBQUksQ0FBQyxRQUFRLEdBQUcsRUFBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFDLENBQUM7NEJBQzVGLE1BQU07d0JBRU47NEJBQ0EsTUFBTTtxQkFDUDtpQkFDRixDQUFDLENBQUM7YUFDSjs7Ozs7UUFHRCwyQ0FBZTs7OztZQUFmLFVBQWdCLE1BQWtCOztnQkFFaEMsSUFBTSxTQUFTLEdBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztnQkFFeEQsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtvQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7d0JBQ2pCLE1BQU0sRUFBRSxVQUFVO3dCQUNsQixJQUFJLEVBQUUsV0FBVzt3QkFDakIsVUFBVSxFQUFFLE1BQU07d0JBQ2xCLFNBQVMsRUFBRSxTQUFTO3FCQUNyQixDQUFDLENBQUM7aUJBQ047YUFDRjs7Ozs7UUFFRCxzQ0FBVTs7OztZQUFWLFVBQVcsTUFBTTtnQkFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO2FBQ3hDOzs7Ozs7O1FBRUQscUNBQVM7Ozs7OztZQUFULFVBQVUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPOztnQkFDakMsSUFBTSxNQUFNLEdBQUcsUUFBUSxDQUFDLElBQUksR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDO2dCQUMvQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDekY7O29CQS9ERkYsWUFBUyxTQUFDO3dCQUNULFFBQVEsRUFBRSxhQUFhO3dCQUN2QixRQUFRLEVBQUUsME5BUVg7d0JBQ0MsTUFBTSxFQUFFLENBQUMsd01BQXdNLENBQUM7cUJBQ25OOzs7Ozt3QkFmUSxhQUFhO3dCQUNiRyw0QkFBWTs7O2dDQUZyQjs7Ozs7OztBQ0FBO1FBWUU7U0FBaUI7Ozs7UUFFakIsNENBQVE7OztZQUFSO2FBQ0M7O29CQWJGSCxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjt3QkFDaEMsUUFBUSxFQUFFLHlDQUdYO3dCQUNDLE1BQU0sRUFBRSxDQUFDLEVBQUUsQ0FBQztxQkFDYjs7Ozt3Q0FURDs7Ozs7OztBQ0FBO1FBYUUseUJBQXNCLE1BQXFCO1lBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7MEJBRGxDLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7U0FDTTs7OztRQUVoRCxrQ0FBUTs7O1lBQVI7YUFDQzs7Ozs7UUFFRCw4QkFBSTs7OztZQUFKLFVBQUssS0FBSztnQkFDUixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztvQkFDbkIsTUFBTSxFQUFFLFFBQVE7b0JBQ2hCLElBQUksRUFBRSxXQUFXO29CQUNqQixLQUFLLEVBQUUsS0FBSztpQkFDYixDQUFDLENBQUM7YUFDSjs7b0JBckJGQSxZQUFTLFNBQUM7d0JBQ1QsUUFBUSxFQUFFLFdBQVc7d0JBQ3JCLFFBQVEsRUFBRSxrS0FHWDt3QkFDQyxNQUFNLEVBQUUsQ0FBQyw0VEFBNFQsQ0FBQztxQkFDdlU7Ozs7O3dCQVRRLGFBQWE7Ozs4QkFEdEI7Ozs7Ozs7QUNBQTtRQVFFLHNCQUFvQixTQUF1QjtZQUF2QixjQUFTLEdBQVQsU0FBUyxDQUFjO1NBQUk7Ozs7O1FBRS9DLGdDQUFTOzs7O1lBQVQsVUFBVSxJQUFZO2dCQUNwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDckQ7O29CQVRGSSxPQUFJLFNBQUM7d0JBQ0osSUFBSSxFQUFFLFVBQVU7cUJBQ2pCOzs7Ozt3QkFKUUQsNEJBQVk7OzsyQkFEckI7Ozs7Ozs7QUNBQTs7OztvQkFTQ0UsV0FBUSxTQUFDO3dCQUNSLE9BQU8sRUFBRTs0QkFDUEMsbUJBQVk7eUJBQ2I7d0JBQ0QsWUFBWSxFQUFFOzRCQUNaLDJCQUEyQjs0QkFDM0IsaUJBQWlCOzRCQUNqQix5QkFBeUI7NEJBQ3pCLGVBQWU7NEJBQ2YsWUFBWTt5QkFDYjt3QkFDRCxPQUFPLEVBQUUsQ0FBQywyQkFBMkIsQ0FBQztxQkFDdkM7O3VDQXJCRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OyJ9