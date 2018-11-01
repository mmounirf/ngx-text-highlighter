import { Injectable, Pipe, EventEmitter, Component, Output, Input, NgModule, defineInjectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxTextHighlighterService {
    constructor() { }
}
NgxTextHighlighterService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
NgxTextHighlighterService.ctorParameters = () => [];
/** @nocollapse */ NgxTextHighlighterService.ngInjectableDef = defineInjectable({ factory: function NgxTextHighlighterService_Factory() { return new NgxTextHighlighterService(); }, token: NgxTextHighlighterService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class EventsService {
    constructor() {
        this.event = new EventEmitter();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    dispatch(event) {
        this.event.emit(event);
    }
    /**
     * @return {?}
     */
    listen() {
        return this.event;
    }
}
EventsService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] },
];
/** @nocollapse */
EventsService.ctorParameters = () => [];
/** @nocollapse */ EventsService.ngInjectableDef = defineInjectable({ factory: function EventsService_Factory() { return new EventsService(); }, token: EventsService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxTextHighlighterComponent {
    /**
     * @param {?} events
     */
    constructor(events) {
        this.events = events;
        this.textSelection = new EventEmitter();
        // TODO // Implement floating marker
        this.markerStyle = 'fixed';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Listens to events from child components
        this.events.listen().subscribe(event => {
            // Check event origin (which component dispatched this event)
            switch (event.origin) {
                // Events coming from the textarea component
                case ('textarea'):
                    // Emit event to the library component output
                    this.textSelection.emit({ selection: event.selection, mouseEvent: event.mouseEvent });
                    break;
                default:
                    break;
            }
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.events.listen().unsubscribe();
    }
}
NgxTextHighlighterComponent.decorators = [
    { type: Component, args: [{
                selector: 'th-container',
                template: `
    <th-marker></th-marker>
    <th-textarea></th-textarea>
    <th-stored-highlights></th-stored-highlights>
  `,
                styles: []
            },] },
];
/** @nocollapse */
NgxTextHighlighterComponent.ctorParameters = () => [
    { type: EventsService }
];
NgxTextHighlighterComponent.propDecorators = {
    textSelection: [{ type: Output }],
    markerStyle: [{ type: Input, args: ['markerStyle',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class TextareaComponent {
    /**
     * @param {?} events
     * @param {?} sanitizer
     */
    constructor(events, sanitizer) {
        this.events = events;
        this.sanitizer = sanitizer;
        this.content = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sit amet facilisis dui, a finibus dui. Donec dignissim, justo at placerat maximus, urna turpis viverra urna, at hendrerit dui sem sed quam. Donec tincidunt magna quis tortor dignissim, at condimentum turpis lacinia. Aenean id turpis sit amet lacus semper sollicitudin. Nullam gravida erat vitae posuere sagittis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam erat volutpat. Fusce nec sapien sagittis, tincidunt tortor quis, ultricies magna. Nullam nulla erat, laoreet non neque et, bibendum ornare nisl. Aliquam nisl massa, lobortis non metus quis, hendrerit rutrum enim. Nullam in lorem ut diam varius rutrum eget consectetur est. Aliquam quis velit iaculis, vehicula lectus a, imperdiet arcu. In sodales dolor eu erat tincidunt, et cursus dui vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Phasellus sed congue tellus. Quisque pulvinar felis aliquam nunc ultrices ullamcorper. Proin eget lacus at massa ullamcorper suscipit. Sed bibendum purus lorem, at ornare est aliquet dictum. Nulla eleifend eros congue nulla luctus auctor. Donec malesuada consectetur vestibulum. Suspendisse ut neque ac risus eleifend tempus sit amet quis turpis. Praesent tincidunt bibendum egestas. Integer porta accumsan metus, nec finibus justo fermentum ac. Nulla facilisi. Pellentesque erat augue, congue nec est ac, bibendum congue libero. Maecenas venenatis vel lacus in mollis. Ut sollicitudin vel ipsum sit amet aliquet. Donec tincidunt tempus est a malesuada.';
        this.selection = '';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.events.listen().subscribe(event => {
            switch (event.origin) {
                case ('marker'):
                    if (this.selection) {
                        this.content = this.replaceAt(this.content, this.position, `<span style="background-color: ${event.color};">${this.selection}</span>`);
                    }
                    break;
                case ('textarea'):
                    this.selection = event.selection.toString();
                    this.position = { starts: event.selection.anchorOffset, ends: event.selection.focusOffset };
                    break;
                default:
                    break;
            }
        });
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleSelection($event) {
        /** @type {?} */
        const selection = $event.view.getSelection();
        if (selection.type === 'Range') {
            this.events.dispatch({
                origin: 'textarea',
                type: 'selection',
                mouseEvent: $event,
                selection: selection,
            });
        }
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleBlur($event) {
        this.content = $event.target.innerHTML;
    }
    /**
     * @param {?} string
     * @param {?} position
     * @param {?} replace
     * @return {?}
     */
    replaceAt(string, position, replace) {
        return string.substring(0, position.starts) + replace + string.substring(position.ends);
    }
}
TextareaComponent.decorators = [
    { type: Component, args: [{
                selector: 'th-textarea',
                template: `<div
  class="textarea"
  (mouseup)="handleSelection($event)"
  contenteditable="true"
  [innerHtml]="content | safeHtml"
  (input)="$event.target.innerHtml"
  (blur)="handleBlur($event)"
></div>
`,
                styles: [`.textarea{height:250px;overflow:auto;background-color:#f1f1f1;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);border-radius:2px;line-height:2em}.textarea:focus{outline:0}`]
            },] },
];
/** @nocollapse */
TextareaComponent.ctorParameters = () => [
    { type: EventsService },
    { type: DomSanitizer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class StoredHighlightsComponent {
    constructor() { }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
}
StoredHighlightsComponent.decorators = [
    { type: Component, args: [{
                selector: 'th-stored-highlights',
                template: `<p>
  stored-highlights works!
</p>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
StoredHighlightsComponent.ctorParameters = () => [];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class MarkerComponent {
    /**
     * @param {?} events
     */
    constructor(events) {
        this.events = events;
        this.colors = ['#f44336', '#ffeb3b', '#4caf50'];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @param {?} color
     * @return {?}
     */
    mark(color) {
        this.events.dispatch({
            origin: 'marker',
            type: 'highlight',
            color: color
        });
    }
}
MarkerComponent.decorators = [
    { type: Component, args: [{
                selector: 'th-marker',
                template: `<div class="colors">
  <div class="color" *ngFor="let color of colors" [ngStyle]="{'background-color': color}" (click)="mark(color)"></div>
</div>
`,
                styles: [`.colors{width:100%;display:flex;flex-wrap:wrap}.color{width:50px;height:50px;margin:0 10px 10px 0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:.3s cubic-bezier(.25,.8,.25,1)}.color:hover{border-radius:50%;box-shadow:0 10px 10px rgba(0,0,0,.25),0 5px 5px rgba(0,0,0,.22)}`]
            },] },
];
/** @nocollapse */
MarkerComponent.ctorParameters = () => [
    { type: EventsService }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class SafeHtmlPipe {
    /**
     * @param {?} sanitizer
     */
    constructor(sanitizer) {
        this.sanitizer = sanitizer;
    }
    /**
     * @param {?} html
     * @return {?}
     */
    transform(html) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }
}
SafeHtmlPipe.decorators = [
    { type: Pipe, args: [{
                name: 'safeHtml'
            },] },
];
/** @nocollapse */
SafeHtmlPipe.ctorParameters = () => [
    { type: DomSanitizer }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class NgxTextHighlighterModule {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */

export { NgxTextHighlighterService, NgxTextHighlighterComponent, NgxTextHighlighterModule, MarkerComponent as ɵd, StoredHighlightsComponent as ɵc, TextareaComponent as ɵb, SafeHtmlPipe as ɵe, EventsService as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvc2VydmljZXMvZXZlbnRzLnNlcnZpY2UudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL3BpcGVzL3NhZmUtaHRtbC5waXBlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBFdmVudHNTZXJ2aWNlIHtcbiAgZXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIC8vIERpc3BhdGNoIGV2ZW50cyBhY3Jvc3MgY29tcG9uZW50c1xuICBkaXNwYXRjaChldmVudCkge1xuICAgIHRoaXMuZXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvLyBMaXN0ZW5zIHRvIGRpc3BhdGNoZWQgZXZlbnRzXG4gIGxpc3RlbigpIHtcbiAgICByZXR1cm4gdGhpcy5ldmVudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRoLW1hcmtlcj48L3RoLW1hcmtlcj5cbiAgICA8dGgtdGV4dGFyZWE+PC90aC10ZXh0YXJlYT5cbiAgICA8dGgtc3RvcmVkLWhpZ2hsaWdodHM+PC90aC1zdG9yZWQtaGlnaGxpZ2h0cz5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoKSB0ZXh0U2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8e30+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICAvLyBUT0RPIC8vIEltcGxlbWVudCBmbG9hdGluZyBtYXJrZXJcbiAgQElucHV0KCdtYXJrZXJTdHlsZScpIG1hcmtlclN0eWxlID0gJ2ZpeGVkJztcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gTGlzdGVucyB0byBldmVudHMgZnJvbSBjaGlsZCBjb21wb25lbnRzXG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIC8vIENoZWNrIGV2ZW50IG9yaWdpbiAod2hpY2ggY29tcG9uZW50IGRpc3BhdGNoZWQgdGhpcyBldmVudClcbiAgICAgIHN3aXRjaCAoZXZlbnQub3JpZ2luKSB7XG4gICAgICAgIC8vIEV2ZW50cyBjb21pbmcgZnJvbSB0aGUgdGV4dGFyZWEgY29tcG9uZW50XG4gICAgICAgIGNhc2UgKCd0ZXh0YXJlYScpOlxuICAgICAgICAgIC8vIEVtaXQgZXZlbnQgdG8gdGhlIGxpYnJhcnkgY29tcG9uZW50IG91dHB1dFxuICAgICAgICAgIHRoaXMudGV4dFNlbGVjdGlvbi5lbWl0KHtzZWxlY3Rpb246IGV2ZW50LnNlbGVjdGlvbiwgbW91c2VFdmVudDogZXZlbnQubW91c2VFdmVudH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLXRleHRhcmVhJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gIGNsYXNzPVwidGV4dGFyZWFcIlxuICAobW91c2V1cCk9XCJoYW5kbGVTZWxlY3Rpb24oJGV2ZW50KVwiXG4gIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIlxuICBbaW5uZXJIdG1sXT1cImNvbnRlbnQgfCBzYWZlSHRtbFwiXG4gIChpbnB1dCk9XCIkZXZlbnQudGFyZ2V0LmlubmVySHRtbFwiXG4gIChibHVyKT1cImhhbmRsZUJsdXIoJGV2ZW50KVwiXG4+PC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnRleHRhcmVhe2hlaWdodDoyNTBweDtvdmVyZmxvdzphdXRvO2JhY2tncm91bmQtY29sb3I6I2YxZjFmMTtwYWRkaW5nOjIwcHg7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMTIpLDAgMXB4IDJweCByZ2JhKDAsMCwwLC4yNCk7Ym9yZGVyLXJhZGl1czoycHg7bGluZS1oZWlnaHQ6MmVtfS50ZXh0YXJlYTpmb2N1c3tvdXRsaW5lOjB9YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHsgfVxuICBjb250ZW50ID0gJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIFZpdmFtdXMgc2l0IGFtZXQgZmFjaWxpc2lzIGR1aSwgYSBmaW5pYnVzIGR1aS4gRG9uZWMgZGlnbmlzc2ltLCBqdXN0byBhdCBwbGFjZXJhdCBtYXhpbXVzLCB1cm5hIHR1cnBpcyB2aXZlcnJhIHVybmEsIGF0IGhlbmRyZXJpdCBkdWkgc2VtIHNlZCBxdWFtLiBEb25lYyB0aW5jaWR1bnQgbWFnbmEgcXVpcyB0b3J0b3IgZGlnbmlzc2ltLCBhdCBjb25kaW1lbnR1bSB0dXJwaXMgbGFjaW5pYS4gQWVuZWFuIGlkIHR1cnBpcyBzaXQgYW1ldCBsYWN1cyBzZW1wZXIgc29sbGljaXR1ZGluLiBOdWxsYW0gZ3JhdmlkYSBlcmF0IHZpdGFlIHBvc3VlcmUgc2FnaXR0aXMuIFZlc3RpYnVsdW0gYW50ZSBpcHN1bSBwcmltaXMgaW4gZmF1Y2lidXMgb3JjaSBsdWN0dXMgZXQgdWx0cmljZXMgcG9zdWVyZSBjdWJpbGlhIEN1cmFlOyBBbGlxdWFtIGVyYXQgdm9sdXRwYXQuIEZ1c2NlIG5lYyBzYXBpZW4gc2FnaXR0aXMsIHRpbmNpZHVudCB0b3J0b3IgcXVpcywgdWx0cmljaWVzIG1hZ25hLiBOdWxsYW0gbnVsbGEgZXJhdCwgbGFvcmVldCBub24gbmVxdWUgZXQsIGJpYmVuZHVtIG9ybmFyZSBuaXNsLiBBbGlxdWFtIG5pc2wgbWFzc2EsIGxvYm9ydGlzIG5vbiBtZXR1cyBxdWlzLCBoZW5kcmVyaXQgcnV0cnVtIGVuaW0uIE51bGxhbSBpbiBsb3JlbSB1dCBkaWFtIHZhcml1cyBydXRydW0gZWdldCBjb25zZWN0ZXR1ciBlc3QuIEFsaXF1YW0gcXVpcyB2ZWxpdCBpYWN1bGlzLCB2ZWhpY3VsYSBsZWN0dXMgYSwgaW1wZXJkaWV0IGFyY3UuIEluIHNvZGFsZXMgZG9sb3IgZXUgZXJhdCB0aW5jaWR1bnQsIGV0IGN1cnN1cyBkdWkgdmVzdGlidWx1bS4gVmVzdGlidWx1bSBhbnRlIGlwc3VtIHByaW1pcyBpbiBmYXVjaWJ1cyBvcmNpIGx1Y3R1cyBldCB1bHRyaWNlcyBwb3N1ZXJlIGN1YmlsaWEgQ3VyYWU7IFBoYXNlbGx1cyBzZWQgY29uZ3VlIHRlbGx1cy4gUXVpc3F1ZSBwdWx2aW5hciBmZWxpcyBhbGlxdWFtIG51bmMgdWx0cmljZXMgdWxsYW1jb3JwZXIuIFByb2luIGVnZXQgbGFjdXMgYXQgbWFzc2EgdWxsYW1jb3JwZXIgc3VzY2lwaXQuIFNlZCBiaWJlbmR1bSBwdXJ1cyBsb3JlbSwgYXQgb3JuYXJlIGVzdCBhbGlxdWV0IGRpY3R1bS4gTnVsbGEgZWxlaWZlbmQgZXJvcyBjb25ndWUgbnVsbGEgbHVjdHVzIGF1Y3Rvci4gRG9uZWMgbWFsZXN1YWRhIGNvbnNlY3RldHVyIHZlc3RpYnVsdW0uIFN1c3BlbmRpc3NlIHV0IG5lcXVlIGFjIHJpc3VzIGVsZWlmZW5kIHRlbXB1cyBzaXQgYW1ldCBxdWlzIHR1cnBpcy4gUHJhZXNlbnQgdGluY2lkdW50IGJpYmVuZHVtIGVnZXN0YXMuIEludGVnZXIgcG9ydGEgYWNjdW1zYW4gbWV0dXMsIG5lYyBmaW5pYnVzIGp1c3RvIGZlcm1lbnR1bSBhYy4gTnVsbGEgZmFjaWxpc2kuIFBlbGxlbnRlc3F1ZSBlcmF0IGF1Z3VlLCBjb25ndWUgbmVjIGVzdCBhYywgYmliZW5kdW0gY29uZ3VlIGxpYmVyby4gTWFlY2VuYXMgdmVuZW5hdGlzIHZlbCBsYWN1cyBpbiBtb2xsaXMuIFV0IHNvbGxpY2l0dWRpbiB2ZWwgaXBzdW0gc2l0IGFtZXQgYWxpcXVldC4gRG9uZWMgdGluY2lkdW50IHRlbXB1cyBlc3QgYSBtYWxlc3VhZGEuJztcbiAgc2VsZWN0aW9uID0gJyc7XG4gIHBvc2l0aW9uO1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9yaWdpbikge1xuXG4gICAgICAgIGNhc2UgKCdtYXJrZXInKTpcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMucmVwbGFjZUF0KHRoaXMuY29udGVudCwgdGhpcy5wb3NpdGlvbiwgYDxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtldmVudC5jb2xvcn07XCI+JHt0aGlzLnNlbGVjdGlvbn08L3NwYW4+YCk7XG4gICAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICgndGV4dGFyZWEnKTpcbiAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IGV2ZW50LnNlbGVjdGlvbi50b1N0cmluZygpO1xuICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7c3RhcnRzOiBldmVudC5zZWxlY3Rpb24uYW5jaG9yT2Zmc2V0LCBlbmRzOiBldmVudC5zZWxlY3Rpb24uZm9jdXNPZmZzZXR9O1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cbiAgaGFuZGxlU2VsZWN0aW9uKCRldmVudDogTW91c2VFdmVudCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbjogU2VsZWN0aW9uID0gJGV2ZW50LnZpZXcuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbi50eXBlID09PSAnUmFuZ2UnKSB7XG4gICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7XG4gICAgICAgICAgb3JpZ2luOiAndGV4dGFyZWEnLFxuICAgICAgICAgIHR5cGU6ICdzZWxlY3Rpb24nLFxuICAgICAgICAgIG1vdXNlRXZlbnQ6ICRldmVudCxcbiAgICAgICAgICBzZWxlY3Rpb246IHNlbGVjdGlvbixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSAkZXZlbnQudGFyZ2V0LmlubmVySFRNTDtcbiAgfVxuXG4gIC8vIFJlcGxhY2Ugc3RyaW5nIGF0IHNwZWNpZmljIHBvc2l0aW9uIChuYXRpdmUgcmVwbGFjZSgpIG1ldGhvZCB3aWxsIGp1c3QgcmVwbGFjZSB0aGUgZmlyc3Qgb2NjdXJhbmNlKVxuICByZXBsYWNlQXQoc3RyaW5nLCBwb3NpdGlvbiwgcmVwbGFjZSkge1xuICAgIHJldHVybiBzdHJpbmcuc3Vic3RyaW5nKDAsIHBvc2l0aW9uLnN0YXJ0cykgKyByZXBsYWNlICsgc3RyaW5nLnN1YnN0cmluZyhwb3NpdGlvbi5lbmRzKTtcbiAgfVxuXG59XG5cblxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtc3RvcmVkLWhpZ2hsaWdodHMnLFxuICB0ZW1wbGF0ZTogYDxwPlxuICBzdG9yZWQtaGlnaGxpZ2h0cyB3b3JrcyFcbjwvcD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcblxuICBjb25zdHJ1Y3RvcigpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1tYXJrZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJjb2xvcnNcIj5cbiAgPGRpdiBjbGFzcz1cImNvbG9yXCIgKm5nRm9yPVwibGV0IGNvbG9yIG9mIGNvbG9yc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9yfVwiIChjbGljayk9XCJtYXJrKGNvbG9yKVwiPjwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmNvbG9yc3t3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcH0uY29sb3J7d2lkdGg6NTBweDtoZWlnaHQ6NTBweDttYXJnaW46MCAxMHB4IDEwcHggMDtjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTt0cmFuc2l0aW9uOi4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKX0uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCU7Ym94LXNoYWRvdzowIDEwcHggMTBweCByZ2JhKDAsMCwwLC4yNSksMCA1cHggNXB4IHJnYmEoMCwwLDAsLjIyKX1gXVxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb2xvcnMgPSBbJyNmNDQzMzYnLCAnI2ZmZWIzYicsICcjNGNhZjUwJ107XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICB9XG5cbiAgbWFyayhjb2xvcikge1xuICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtcbiAgICAgIG9yaWdpbjogJ21hcmtlcicsXG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IFBpcGUsIFBpcGVUcmFuc2Zvcm0gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERvbVNhbml0aXplciwgU2FmZVZhbHVlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ3NhZmVIdG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBTYWZlSHRtbFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7fVxuXG4gIHRyYW5zZm9ybShodG1sOiBzdHJpbmcpOiBTYWZlVmFsdWUge1xuICAgIHJldHVybiB0aGlzLnNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0SHRtbChodG1sKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dGFyZWFDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGV4dGFyZWEvdGV4dGFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgU2FmZUh0bWxQaXBlIH0gZnJvbSAnLi9waXBlcy9zYWZlLWh0bWwucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50LFxuICAgIFRleHRhcmVhQ29tcG9uZW50LFxuICAgIFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIFNhZmVIdG1sUGlwZVxuICBdLFxuICBleHBvcnRzOiBbTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQTtJQU9FLGlCQUFpQjs7O1lBTGxCLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7Ozs7OztBQ0pEO0lBUUU7cUJBRjJCLElBQUksWUFBWSxFQUFFO0tBRTVCOzs7OztJQUVqQixRQUFRLENBQUMsS0FBSztRQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hCOzs7O0lBR0QsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNuQjs7O1lBZkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7O0FDSkQ7Ozs7SUFnQkUsWUFBc0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTs2QkFIQyxJQUFJLFlBQVksRUFBRTs7MkJBRTFCLE9BQU87S0FDSzs7OztJQUVoRCxRQUFROztRQUVOLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLEtBQUs7O1lBRWxDLFFBQVEsS0FBSyxDQUFDLE1BQU07O2dCQUVsQixNQUFNLFVBQVU7O29CQUVkLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLEVBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxVQUFVLEVBQUMsQ0FBQyxDQUFDO29CQUN0RixNQUFNO2dCQUVOO29CQUNBLE1BQU07YUFDUDtTQUNGLENBQUMsQ0FBQztLQUVKOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7OztZQW5DRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRTs7OztHQUlUO2dCQUNELE1BQU0sRUFBRSxFQUFFO2FBQ1g7Ozs7WUFWUSxhQUFhOzs7NEJBWW5CLE1BQU07MEJBRU4sS0FBSyxTQUFDLGFBQWE7Ozs7Ozs7QUNmdEI7Ozs7O0lBbUJFLFlBQXNCLE1BQXFCLEVBQVUsU0FBdUI7UUFBdEQsV0FBTSxHQUFOLE1BQU0sQ0FBZTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWM7dUJBQ2xFLCtrREFBK2tEO3lCQUM3a0QsRUFBRTtLQUZtRTs7OztJQUlqRixRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsS0FBSztZQUVsQyxRQUFRLEtBQUssQ0FBQyxNQUFNO2dCQUVsQixNQUFNLFFBQVE7b0JBQ1osSUFBSSxJQUFJLENBQUMsU0FBUyxFQUFFO3dCQUNsQixJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLGtDQUFrQyxLQUFLLENBQUMsS0FBSyxNQUFNLElBQUksQ0FBQyxTQUFTLFNBQVMsQ0FBQyxDQUFDO3FCQUN4STtvQkFDSCxNQUFNO2dCQUVOLE1BQU0sVUFBVTtvQkFDZCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7b0JBQzVDLElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFDLENBQUM7b0JBQzVGLE1BQU07Z0JBRU47b0JBQ0EsTUFBTTthQUNQO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBR0QsZUFBZSxDQUFDLE1BQWtCOztRQUNoQyxNQUFNLFNBQVMsR0FBYyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3hELElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2pCLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixJQUFJLEVBQUUsV0FBVztnQkFDakIsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLFNBQVMsRUFBRSxTQUFTO2FBQ3JCLENBQUMsQ0FBQztTQUNOO0tBQ0Y7Ozs7O0lBRUQsVUFBVSxDQUFDLE1BQU07UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3hDOzs7Ozs7O0lBR0QsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsT0FBTztRQUNqQyxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekY7OztZQTdERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Q0FRWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyx3TUFBd00sQ0FBQzthQUNuTjs7OztZQWZRLGFBQWE7WUFDYixZQUFZOzs7Ozs7O0FDRnJCO0lBWUUsaUJBQWlCOzs7O0lBRWpCLFFBQVE7S0FDUDs7O1lBYkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7O0NBR1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFDO2FBQ2I7Ozs7Ozs7OztBQ1REOzs7O0lBYUUsWUFBc0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtzQkFEbEMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQztLQUNNOzs7O0lBRWhELFFBQVE7S0FDUDs7Ozs7SUFFRCxJQUFJLENBQUMsS0FBSztRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLElBQUksRUFBRSxXQUFXO1lBQ2pCLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO0tBQ0o7OztZQXJCRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7O0NBR1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsNFRBQTRULENBQUM7YUFDdlU7Ozs7WUFUUSxhQUFhOzs7Ozs7O0FDRHRCOzs7O0lBUUUsWUFBb0IsU0FBdUI7UUFBdkIsY0FBUyxHQUFULFNBQVMsQ0FBYztLQUFJOzs7OztJQUUvQyxTQUFTLENBQUMsSUFBWTtRQUNwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsdUJBQXVCLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDckQ7OztZQVRGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsVUFBVTthQUNqQjs7OztZQUpRLFlBQVk7Ozs7Ozs7QUNEckI7OztZQVNDLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUU7b0JBQ1AsWUFBWTtpQkFDYjtnQkFDRCxZQUFZLEVBQUU7b0JBQ1osMkJBQTJCO29CQUMzQixpQkFBaUI7b0JBQ2pCLHlCQUF5QjtvQkFDekIsZUFBZTtvQkFDZixZQUFZO2lCQUNiO2dCQUNELE9BQU8sRUFBRSxDQUFDLDJCQUEyQixDQUFDO2FBQ3ZDOzs7Ozs7Ozs7Ozs7Ozs7In0=