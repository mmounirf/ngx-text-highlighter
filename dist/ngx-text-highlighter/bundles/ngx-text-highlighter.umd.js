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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIudW1kLmpzLm1hcCIsInNvdXJjZXMiOlsibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuc2VydmljZS50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9jb21wb25lbnRzL3N0b3JlZC1oaWdobGlnaHRzL3N0b3JlZC1oaWdobGlnaHRzLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9waXBlcy9zYWZlLWh0bWwucGlwZS50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL25neC10ZXh0LWhpZ2hsaWdodGVyLm1vZHVsZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKHtcbiAgcHJvdmlkZWRJbjogJ3Jvb3QnXG59KVxuZXhwb3J0IGNsYXNzIE5neFRleHRIaWdobGlnaHRlclNlcnZpY2Uge1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG59XG4iLCJpbXBvcnQgeyBJbmplY3RhYmxlLCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgRXZlbnRzU2VydmljZSB7XG4gIGV2ZW50OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuICAvLyBEaXNwYXRjaCBldmVudHMgYWNyb3NzIGNvbXBvbmVudHNcbiAgZGlzcGF0Y2goZXZlbnQpIHtcbiAgICB0aGlzLmV2ZW50LmVtaXQoZXZlbnQpO1xuICB9XG5cbiAgLy8gTGlzdGVucyB0byBkaXNwYXRjaGVkIGV2ZW50c1xuICBsaXN0ZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuZXZlbnQ7XG4gIH1cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1jb250YWluZXInLFxuICB0ZW1wbGF0ZTogYFxuICAgIDx0aC1tYXJrZXI+PC90aC1tYXJrZXI+XG4gICAgPHRoLXRleHRhcmVhPjwvdGgtdGV4dGFyZWE+XG4gICAgPHRoLXN0b3JlZC1oaWdobGlnaHRzPjwvdGgtc3RvcmVkLWhpZ2hsaWdodHM+XG4gIGAsXG4gIHN0eWxlczogW11cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBAT3V0cHV0KCkgdGV4dFNlbGVjdGlvbjogRXZlbnRFbWl0dGVyPHt9PiA9IG5ldyBFdmVudEVtaXR0ZXIoKTtcbiAgLy8gVE9ETyAvLyBJbXBsZW1lbnQgZmxvYXRpbmcgbWFya2VyXG4gIEBJbnB1dCgnbWFya2VyU3R5bGUnKSBtYXJrZXJTdHlsZSA9ICdmaXhlZCc7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIExpc3RlbnMgdG8gZXZlbnRzIGZyb20gY2hpbGQgY29tcG9uZW50c1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZShldmVudCA9PiB7XG4gICAgICAvLyBDaGVjayBldmVudCBvcmlnaW4gKHdoaWNoIGNvbXBvbmVudCBkaXNwYXRjaGVkIHRoaXMgZXZlbnQpXG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9yaWdpbikge1xuICAgICAgICAvLyBFdmVudHMgY29taW5nIGZyb20gdGhlIHRleHRhcmVhIGNvbXBvbmVudFxuICAgICAgICBjYXNlICgndGV4dGFyZWEnKTpcbiAgICAgICAgICAvLyBFbWl0IGV2ZW50IHRvIHRoZSBsaWJyYXJ5IGNvbXBvbmVudCBvdXRwdXRcbiAgICAgICAgICB0aGlzLnRleHRTZWxlY3Rpb24uZW1pdCh7c2VsZWN0aW9uOiBldmVudC5zZWxlY3Rpb24sIG1vdXNlRXZlbnQ6IGV2ZW50Lm1vdXNlRXZlbnR9KTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC10ZXh0YXJlYScsXG4gIHRlbXBsYXRlOiBgPGRpdlxuICBjbGFzcz1cInRleHRhcmVhXCJcbiAgKG1vdXNldXApPVwiaGFuZGxlU2VsZWN0aW9uKCRldmVudClcIlxuICBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCJcbiAgW2lubmVySHRtbF09XCJjb250ZW50IHwgc2FmZUh0bWxcIlxuICAoaW5wdXQpPVwiJGV2ZW50LnRhcmdldC5pbm5lckh0bWxcIlxuICAoYmx1cik9XCJoYW5kbGVCbHVyKCRldmVudClcIlxuPjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC50ZXh0YXJlYXtoZWlnaHQ6MjUwcHg7b3ZlcmZsb3c6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiNmMWYxZjE7cGFkZGluZzoyMHB4O2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO2JvcmRlci1yYWRpdXM6MnB4O2xpbmUtaGVpZ2h0OjJlbX0udGV4dGFyZWE6Zm9jdXN7b3V0bGluZTowfWBdXG59KVxuXG5leHBvcnQgY2xhc3MgVGV4dGFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlLCBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7IH1cbiAgY29udGVudCA9ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBWaXZhbXVzIHNpdCBhbWV0IGZhY2lsaXNpcyBkdWksIGEgZmluaWJ1cyBkdWkuIERvbmVjIGRpZ25pc3NpbSwganVzdG8gYXQgcGxhY2VyYXQgbWF4aW11cywgdXJuYSB0dXJwaXMgdml2ZXJyYSB1cm5hLCBhdCBoZW5kcmVyaXQgZHVpIHNlbSBzZWQgcXVhbS4gRG9uZWMgdGluY2lkdW50IG1hZ25hIHF1aXMgdG9ydG9yIGRpZ25pc3NpbSwgYXQgY29uZGltZW50dW0gdHVycGlzIGxhY2luaWEuIEFlbmVhbiBpZCB0dXJwaXMgc2l0IGFtZXQgbGFjdXMgc2VtcGVyIHNvbGxpY2l0dWRpbi4gTnVsbGFtIGdyYXZpZGEgZXJhdCB2aXRhZSBwb3N1ZXJlIHNhZ2l0dGlzLiBWZXN0aWJ1bHVtIGFudGUgaXBzdW0gcHJpbWlzIGluIGZhdWNpYnVzIG9yY2kgbHVjdHVzIGV0IHVsdHJpY2VzIHBvc3VlcmUgY3ViaWxpYSBDdXJhZTsgQWxpcXVhbSBlcmF0IHZvbHV0cGF0LiBGdXNjZSBuZWMgc2FwaWVuIHNhZ2l0dGlzLCB0aW5jaWR1bnQgdG9ydG9yIHF1aXMsIHVsdHJpY2llcyBtYWduYS4gTnVsbGFtIG51bGxhIGVyYXQsIGxhb3JlZXQgbm9uIG5lcXVlIGV0LCBiaWJlbmR1bSBvcm5hcmUgbmlzbC4gQWxpcXVhbSBuaXNsIG1hc3NhLCBsb2JvcnRpcyBub24gbWV0dXMgcXVpcywgaGVuZHJlcml0IHJ1dHJ1bSBlbmltLiBOdWxsYW0gaW4gbG9yZW0gdXQgZGlhbSB2YXJpdXMgcnV0cnVtIGVnZXQgY29uc2VjdGV0dXIgZXN0LiBBbGlxdWFtIHF1aXMgdmVsaXQgaWFjdWxpcywgdmVoaWN1bGEgbGVjdHVzIGEsIGltcGVyZGlldCBhcmN1LiBJbiBzb2RhbGVzIGRvbG9yIGV1IGVyYXQgdGluY2lkdW50LCBldCBjdXJzdXMgZHVpIHZlc3RpYnVsdW0uIFZlc3RpYnVsdW0gYW50ZSBpcHN1bSBwcmltaXMgaW4gZmF1Y2lidXMgb3JjaSBsdWN0dXMgZXQgdWx0cmljZXMgcG9zdWVyZSBjdWJpbGlhIEN1cmFlOyBQaGFzZWxsdXMgc2VkIGNvbmd1ZSB0ZWxsdXMuIFF1aXNxdWUgcHVsdmluYXIgZmVsaXMgYWxpcXVhbSBudW5jIHVsdHJpY2VzIHVsbGFtY29ycGVyLiBQcm9pbiBlZ2V0IGxhY3VzIGF0IG1hc3NhIHVsbGFtY29ycGVyIHN1c2NpcGl0LiBTZWQgYmliZW5kdW0gcHVydXMgbG9yZW0sIGF0IG9ybmFyZSBlc3QgYWxpcXVldCBkaWN0dW0uIE51bGxhIGVsZWlmZW5kIGVyb3MgY29uZ3VlIG51bGxhIGx1Y3R1cyBhdWN0b3IuIERvbmVjIG1hbGVzdWFkYSBjb25zZWN0ZXR1ciB2ZXN0aWJ1bHVtLiBTdXNwZW5kaXNzZSB1dCBuZXF1ZSBhYyByaXN1cyBlbGVpZmVuZCB0ZW1wdXMgc2l0IGFtZXQgcXVpcyB0dXJwaXMuIFByYWVzZW50IHRpbmNpZHVudCBiaWJlbmR1bSBlZ2VzdGFzLiBJbnRlZ2VyIHBvcnRhIGFjY3Vtc2FuIG1ldHVzLCBuZWMgZmluaWJ1cyBqdXN0byBmZXJtZW50dW0gYWMuIE51bGxhIGZhY2lsaXNpLiBQZWxsZW50ZXNxdWUgZXJhdCBhdWd1ZSwgY29uZ3VlIG5lYyBlc3QgYWMsIGJpYmVuZHVtIGNvbmd1ZSBsaWJlcm8uIE1hZWNlbmFzIHZlbmVuYXRpcyB2ZWwgbGFjdXMgaW4gbW9sbGlzLiBVdCBzb2xsaWNpdHVkaW4gdmVsIGlwc3VtIHNpdCBhbWV0IGFsaXF1ZXQuIERvbmVjIHRpbmNpZHVudCB0ZW1wdXMgZXN0IGEgbWFsZXN1YWRhLic7XG4gIHNlbGVjdGlvbiA9ICcnO1xuICBwb3NpdGlvbjtcbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcblxuICAgICAgc3dpdGNoIChldmVudC5vcmlnaW4pIHtcblxuICAgICAgICBjYXNlICgnbWFya2VyJyk6XG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnJlcGxhY2VBdCh0aGlzLmNvbnRlbnQsIHRoaXMucG9zaXRpb24sIGA8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7ZXZlbnQuY29sb3J9O1wiPiR7dGhpcy5zZWxlY3Rpb259PC9zcGFuPmApO1xuICAgICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAoJ3RleHRhcmVhJyk6XG4gICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBldmVudC5zZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uID0ge3N0YXJ0czogZXZlbnQuc2VsZWN0aW9uLmFuY2hvck9mZnNldCwgZW5kczogZXZlbnQuc2VsZWN0aW9uLmZvY3VzT2Zmc2V0fTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG4gIGhhbmRsZVNlbGVjdGlvbigkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3Rpb246IFNlbGVjdGlvbiA9ICRldmVudC52aWV3LmdldFNlbGVjdGlvbigpO1xuICAgIGlmIChzZWxlY3Rpb24udHlwZSA9PT0gJ1JhbmdlJykge1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe1xuICAgICAgICAgIG9yaWdpbjogJ3RleHRhcmVhJyxcbiAgICAgICAgICB0eXBlOiAnc2VsZWN0aW9uJyxcbiAgICAgICAgICBtb3VzZUV2ZW50OiAkZXZlbnQsXG4gICAgICAgICAgc2VsZWN0aW9uOiBzZWxlY3Rpb24sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5jb250ZW50ID0gJGV2ZW50LnRhcmdldC5pbm5lckhUTUw7XG4gIH1cblxuICAvLyBSZXBsYWNlIHN0cmluZyBhdCBzcGVjaWZpYyBwb3NpdGlvbiAobmF0aXZlIHJlcGxhY2UoKSBtZXRob2Qgd2lsbCBqdXN0IHJlcGxhY2UgdGhlIGZpcnN0IG9jY3VyYW5jZSlcbiAgcmVwbGFjZUF0KHN0cmluZywgcG9zaXRpb24sIHJlcGxhY2UpIHtcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZygwLCBwb3NpdGlvbi5zdGFydHMpICsgcmVwbGFjZSArIHN0cmluZy5zdWJzdHJpbmcocG9zaXRpb24uZW5kcyk7XG4gIH1cblxufVxuXG5cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLXN0b3JlZC1oaWdobGlnaHRzJyxcbiAgdGVtcGxhdGU6IGA8cD5cbiAgc3RvcmVkLWhpZ2hsaWdodHMgd29ya3MhXG48L3A+XG5gLFxuICBzdHlsZXM6IFtgYF1cbn0pXG5leHBvcnQgY2xhc3MgU3RvcmVkSGlnaGxpZ2h0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtbWFya2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiY29sb3JzXCI+XG4gIDxkaXYgY2xhc3M9XCJjb2xvclwiICpuZ0Zvcj1cImxldCBjb2xvciBvZiBjb2xvcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvcn1cIiAoY2xpY2spPVwibWFyayhjb2xvcilcIj48L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5jb2xvcnN7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXB9LmNvbG9ye3dpZHRoOjUwcHg7aGVpZ2h0OjUwcHg7bWFyZ2luOjAgMTBweCAxMHB4IDA7Y3Vyc29yOnBvaW50ZXI7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMTIpLDAgMXB4IDJweCByZ2JhKDAsMCwwLC4yNCk7dHJhbnNpdGlvbjouM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSl9LmNvbG9yOmhvdmVye2JvcmRlci1yYWRpdXM6NTAlO2JveC1zaGFkb3c6MCAxMHB4IDEwcHggcmdiYSgwLDAsMCwuMjUpLDAgNXB4IDVweCByZ2JhKDAsMCwwLC4yMil9YF1cbn0pXG5leHBvcnQgY2xhc3MgTWFya2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29sb3JzID0gWycjZjQ0MzM2JywgJyNmZmViM2InLCAnIzRjYWY1MCddO1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgfVxuXG4gIG1hcmsoY29sb3IpIHtcbiAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7XG4gICAgICBvcmlnaW46ICdtYXJrZXInLFxuICAgICAgdHlwZTogJ2hpZ2hsaWdodCcsXG4gICAgICBjb2xvcjogY29sb3JcbiAgICB9KTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVWYWx1ZSB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdzYWZlSHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU2FmZUh0bWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikge31cblxuICB0cmFuc2Zvcm0oaHRtbDogc3RyaW5nKTogU2FmZVZhbHVlIHtcbiAgICByZXR1cm4gdGhpcy5zYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdEh0bWwoaHRtbCk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRhcmVhQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0b3JlZC1oaWdobGlnaHRzL3N0b3JlZC1oaWdobGlnaHRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IFNhZmVIdG1sUGlwZSB9IGZyb20gJy4vcGlwZXMvc2FmZS1odG1sLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCxcbiAgICBUZXh0YXJlYUNvbXBvbmVudCxcbiAgICBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBTYWZlSHRtbFBpcGVcbiAgXSxcbiAgZXhwb3J0czogW05neFRleHRIaWdobGlnaHRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbIkluamVjdGFibGUiLCJFdmVudEVtaXR0ZXIiLCJDb21wb25lbnQiLCJPdXRwdXQiLCJJbnB1dCIsIkRvbVNhbml0aXplciIsIlBpcGUiLCJOZ01vZHVsZSIsIkNvbW1vbk1vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBO1FBT0U7U0FBaUI7O29CQUxsQkEsYUFBVSxTQUFDO3dCQUNWLFVBQVUsRUFBRSxNQUFNO3FCQUNuQjs7Ozs7d0NBSkQ7Ozs7Ozs7QUNBQTtRQVFFO3lCQUYyQixJQUFJQyxlQUFZLEVBQUU7U0FFNUI7Ozs7OztRQUVqQixnQ0FBUTs7OztZQUFSLFVBQVMsS0FBSztnQkFDWixJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FB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