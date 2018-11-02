import { Injectable, EventEmitter, Pipe, Component, Input, ViewChild, Inject, Output, NgModule, defineInjectable } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

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
    <th-marker [markerStyle]="markerStyle"></th-marker>
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
     * @param {?} _document
     * @param {?} events
     */
    constructor(_document, events) {
        this._document = _document;
        this.events = events;
        this.blur = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // Listen to events
        this.events.listen().subscribe((event) => {
            // Marker events
            if (event.origin === 'marker' && event.type === 'highlight') {
                // Highlight text
                this.marker(event.color, this.selectedText);
            }
        });
    }
    /**
     * @return {?}
     */
    restoreSelection() {
        if (this.savedSelection) {
            if (window.getSelection) {
                /** @type {?} */
                const sel = window.getSelection();
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
    }
    /**
     * @param {?} color
     * @param {?} text
     * @return {?}
     */
    marker(color, text) {
        // We have a selection?
        if (this.restoreSelection()) {
            // Execute background color
            this._document.execCommand('hiliteColor', false, color);
            // Trigger stored highlights
            this.events.dispatch({ origin: 'textarea', type: 'store', color: color, text: text });
        }
    }
    /**
     * @return {?}
     */
    onTextAreaBlur() {
        // Browser supports getSelection()?
        if (window.getSelection) {
            /** @type {?} */
            const selection = window.getSelection();
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
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    onSelection($event) {
        /** @type {?} */
        const selection = window.getSelection();
        if (selection.type === 'Range') {
            this.events.dispatch({ origin: 'textarea', type: 'selection', value: selection });
        }
        // Selection is not a range, means the user just places caret in another place, let's let the floating marker knows about it
        if (selection.type !== 'Range') {
            this.events.dispatch({ origin: 'textarea', type: 'blur' });
        }
    }
}
TextareaComponent.decorators = [
    { type: Component, args: [{
                selector: 'th-textarea',
                template: `    <div class="textarea"
        (mouseup)="onSelection($event)"
        [attr.contenteditable]="true"
        (blur)="onTextAreaBlur()">
    </div>
`,
                styles: [`.textarea{height:250px;overflow:auto;background-color:#f1f1f1;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);border-radius:2px;line-height:2em}.textarea:focus{outline:0}`]
            },] },
];
/** @nocollapse */
TextareaComponent.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: EventsService }
];
TextareaComponent.propDecorators = {
    blur: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class StoredHighlightsComponent {
    /**
     * @param {?} events
     */
    constructor(events) {
        this.events = events;
        this.store = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.events.listen().subscribe((event) => {
            if (event.origin === 'textarea' && event.type === 'store') {
                this.store.push({ text: event.text, color: event.color });
            }
        });
    }
}
StoredHighlightsComponent.decorators = [
    { type: Component, args: [{
                selector: 'th-stored-highlights',
                template: `<ul>
<li *ngFor="let item of store" [ngStyle]="{'background-color': item.color}">{{item.text}}</li>
</ul>
`,
                styles: [``]
            },] },
];
/** @nocollapse */
StoredHighlightsComponent.ctorParameters = () => [
    { type: EventsService }
];
StoredHighlightsComponent.propDecorators = {
    store: [{ type: Input, args: ['store',] }]
};

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
        this.positionX = 0;
        this.positionY = 0;
        this.visibility = 'hidden';
        this.markerStyle = 'fixed';
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.events.listen().subscribe((event) => {
            // Event from textarea regarding text selection and marker style is set to float
            if (event.origin === 'textarea' && event.type === 'selection' && this.markerStyle === 'float') {
                /** @type {?} */
                const markerWidth = window.getComputedStyle(this.floatingMarker.nativeElement).width;
                /** @type {?} */
                const selectionWidth = event.value.getRangeAt(0).getBoundingClientRect().width;
                /** @type {?} */
                const xCenter = (parseInt(markerWidth, 0) - selectionWidth) / 2;
                this.positionX = event.value.getRangeAt(0).getBoundingClientRect().left - xCenter;
                // 64px = 4em (double the line height)
                this.positionY = event.value.getRangeAt(0).getBoundingClientRect().top - 64;
                // Let's show our floating marker
                this.visibility = 'visible';
            }
            // Event from textarea regarding losing focus and marker style is set to float
            if (event.origin === 'textarea' && event.type === 'blur' && this.markerStyle === 'float') {
                // Let's hide our floating marker
                this.visibility = 'hidden';
            }
        });
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
                template: `<div class="fixed colors" *ngIf="markerStyle === 'fixed'">
  <div class="color" *ngFor="let color of colors" [ngStyle]="{'background-color': color}" (click)="mark(color)"></div>
</div>

<div #floatingMarker class="floating colors" *ngIf="markerStyle === 'float'" [ngStyle]="{'left': positionX+'px', 'top': positionY+'px', 'visibility': visibility}">
    <div class="color" *ngFor="let color of colors" [ngStyle]="{'background-color': color}" (click)="mark(color)"></div>
</div>
`,
                styles: [`.colors.fixed{width:100%;display:flex;flex-wrap:wrap}.fixed>.color{width:30px;height:30px;margin:0 10px 10px 0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:.3s cubic-bezier(.25,.8,.25,1)}.fixed>.color:hover{border-radius:50%;box-shadow:0 10px 10px rgba(0,0,0,.25),0 5px 5px rgba(0,0,0,.22)}.colors.floating{position:absolute;width:auto;background-color:#404040;border-radius:2px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:top .3s cubic-bezier(.25,.8,.25,1);display:flex}.floating>.color{margin:10px;cursor:pointer;width:30px;height:30px;transition:top .3s cubic-bezier(.25,.8,.25,1),border-radius .3s cubic-bezier(.25,.8,.25,1);z-index:10}.floating>.color:hover{border-radius:50%}.floating.colors:after{content:'';display:block;position:absolute;background-color:#404040;width:20px;height:20px;bottom:-5px;left:calc(50% - 10px);-webkit-transform:rotate(45deg);transform:rotate(45deg);z-index:1}`]
            },] },
];
/** @nocollapse */
MarkerComponent.ctorParameters = () => [
    { type: EventsService }
];
MarkerComponent.propDecorators = {
    markerStyle: [{ type: Input, args: ['markerStyle',] }],
    floatingMarker: [{ type: ViewChild, args: ['floatingMarker',] }]
};

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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvc2VydmljZXMvZXZlbnRzLnNlcnZpY2UudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL3BpcGVzL3NhZmUtaHRtbC5waXBlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBFdmVudHNTZXJ2aWNlIHtcbiAgZXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIC8vIERpc3BhdGNoIGV2ZW50cyBhY3Jvc3MgY29tcG9uZW50c1xuICBkaXNwYXRjaChldmVudCkge1xuICAgIHRoaXMuZXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvLyBMaXN0ZW5zIHRvIGRpc3BhdGNoZWQgZXZlbnRzXG4gIGxpc3RlbigpIHtcbiAgICByZXR1cm4gdGhpcy5ldmVudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRoLW1hcmtlciBbbWFya2VyU3R5bGVdPVwibWFya2VyU3R5bGVcIj48L3RoLW1hcmtlcj5cbiAgICA8dGgtdGV4dGFyZWE+PC90aC10ZXh0YXJlYT5cbiAgICA8dGgtc3RvcmVkLWhpZ2hsaWdodHM+PC90aC1zdG9yZWQtaGlnaGxpZ2h0cz5cbiAgYCxcbiAgc3R5bGVzOiBbXVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBPdXRwdXQoKSB0ZXh0U2VsZWN0aW9uOiBFdmVudEVtaXR0ZXI8e30+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuICBASW5wdXQoJ21hcmtlclN0eWxlJykgbWFya2VyU3R5bGUgPSAnZml4ZWQnO1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBMaXN0ZW5zIHRvIGV2ZW50cyBmcm9tIGNoaWxkIGNvbXBvbmVudHNcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuICAgICAgLy8gQ2hlY2sgZXZlbnQgb3JpZ2luICh3aGljaCBjb21wb25lbnQgZGlzcGF0Y2hlZCB0aGlzIGV2ZW50KVxuICAgICAgc3dpdGNoIChldmVudC5vcmlnaW4pIHtcbiAgICAgICAgLy8gRXZlbnRzIGNvbWluZyBmcm9tIHRoZSB0ZXh0YXJlYSBjb21wb25lbnRcbiAgICAgICAgY2FzZSAoJ3RleHRhcmVhJyk6XG4gICAgICAgICAgLy8gRW1pdCBldmVudCB0byB0aGUgbGlicmFyeSBjb21wb25lbnQgb3V0cHV0XG4gICAgICAgICAgdGhpcy50ZXh0U2VsZWN0aW9uLmVtaXQoe3NlbGVjdGlvbjogZXZlbnQuc2VsZWN0aW9uLCBtb3VzZUV2ZW50OiBldmVudC5tb3VzZUV2ZW50fSk7XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEluamVjdCwgRXZlbnRFbWl0dGVyLCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLXRleHRhcmVhJyxcbiAgdGVtcGxhdGU6IGAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhXCJcbiAgICAgICAgKG1vdXNldXApPVwib25TZWxlY3Rpb24oJGV2ZW50KVwiXG4gICAgICAgIFthdHRyLmNvbnRlbnRlZGl0YWJsZV09XCJ0cnVlXCJcbiAgICAgICAgKGJsdXIpPVwib25UZXh0QXJlYUJsdXIoKVwiPlxuICAgIDwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC50ZXh0YXJlYXtoZWlnaHQ6MjUwcHg7b3ZlcmZsb3c6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiNmMWYxZjE7cGFkZGluZzoyMHB4O2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO2JvcmRlci1yYWRpdXM6MnB4O2xpbmUtaGVpZ2h0OjJlbX0udGV4dGFyZWE6Zm9jdXN7b3V0bGluZTowfWBdXG59KVxuXG5leHBvcnQgY2xhc3MgVGV4dGFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBzYXZlZFNlbGVjdGlvbjogUmFuZ2UgfCBudWxsO1xuICBzZWxlY3RlZFRleHQ6IHN0cmluZztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0IChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIExpc3RlbiB0byBldmVudHNcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvLyBNYXJrZXIgZXZlbnRzXG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAnbWFya2VyJyAmJiBldmVudC50eXBlID09PSAnaGlnaGxpZ2h0Jykge1xuICAgICAgICAvLyBIaWdobGlnaHQgdGV4dFxuICAgICAgICB0aGlzLm1hcmtlcihldmVudC5jb2xvciwgdGhpcy5zZWxlY3RlZFRleHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzdG9yZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5zYXZlZFNlbGVjdGlvbikge1xuICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbC5hZGRSYW5nZSh0aGlzLnNhdmVkU2VsZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2RvY3VtZW50LmdldFNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtlcihjb2xvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBXZSBoYXZlIGEgc2VsZWN0aW9uP1xuICAgIGlmICh0aGlzLnJlc3RvcmVTZWxlY3Rpb24oKSkge1xuICAgICAgLy8gRXhlY3V0ZSBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICB0aGlzLl9kb2N1bWVudC5leGVjQ29tbWFuZCgnaGlsaXRlQ29sb3InLCBmYWxzZSwgY29sb3IpO1xuICAgICAgLy8gVHJpZ2dlciBzdG9yZWQgaGlnaGxpZ2h0c1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe29yaWdpbjogJ3RleHRhcmVhJywgdHlwZTogJ3N0b3JlJywgY29sb3I6IGNvbG9yLCB0ZXh0OiB0ZXh0fSk7XG4gICAgfVxuICB9XG4gIG9uVGV4dEFyZWFCbHVyKCkge1xuICAgIC8vIEJyb3dzZXIgc3VwcG9ydHMgZ2V0U2VsZWN0aW9uKCk/XG4gICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIC8vIEdldCBzZWxlY3Rpb25cbiAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIC8vIEJyb3dzZXIgc3VwcG9ydCByYW5nZT9cbiAgICAgIGlmIChzZWxlY3Rpb24uZ2V0UmFuZ2VBdCAmJiBzZWxlY3Rpb24ucmFuZ2VDb3VudCkge1xuICAgICAgICAvLyBHZXQgcmFuZ2UgYW5kIHNlbGVjdGVkIHRleHRcbiAgICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGV4dCA9IHNlbGVjdGlvbi50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fZG9jdW1lbnQuZ2V0U2VsZWN0aW9uICYmIHRoaXMuX2RvY3VtZW50LmNyZWF0ZVJhbmdlKSB7XG4gICAgICB0aGlzLnNhdmVkU2VsZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gIH1cblxuICAvLyBHZXQgc2VsZWN0aW9uIGJlZm9yZSBibHVyIChmb3IgZmxvYXRpbmcgbWFya2VyKVxuICBvblNlbGVjdGlvbigkZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbi50eXBlID09PSAnUmFuZ2UnKSB7XG4gICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7b3JpZ2luOiAndGV4dGFyZWEnLCB0eXBlOiAnc2VsZWN0aW9uJywgdmFsdWU6IHNlbGVjdGlvbn0pO1xuICAgIH1cblxuICAgIC8vIFNlbGVjdGlvbiBpcyBub3QgYSByYW5nZSwgbWVhbnMgdGhlIHVzZXIganVzdCBwbGFjZXMgY2FyZXQgaW4gYW5vdGhlciBwbGFjZSwgbGV0J3MgbGV0IHRoZSBmbG9hdGluZyBtYXJrZXIga25vd3MgYWJvdXQgaXRcbiAgICBpZiAoc2VsZWN0aW9uLnR5cGUgIT09ICdSYW5nZScpIHtcbiAgICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtvcmlnaW46ICd0ZXh0YXJlYScsIHR5cGU6ICdibHVyJ30pO1xuICAgIH1cbiAgfVxuXG5cbn1cblxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLXN0b3JlZC1oaWdobGlnaHRzJyxcbiAgdGVtcGxhdGU6IGA8dWw+XG48bGkgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RvcmVcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBpdGVtLmNvbG9yfVwiPnt7aXRlbS50ZXh0fX08L2xpPlxuPC91bD5cbmAsXG4gIHN0eWxlczogW2BgXVxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgQElucHV0KCdzdG9yZScpIHN0b3JlID0gW107XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ3N0b3JlJykge1xuICAgICAgICB0aGlzLnN0b3JlLnB1c2goe3RleHQ6IGV2ZW50LnRleHQsIGNvbG9yOiBldmVudC5jb2xvcn0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1tYXJrZXInLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJmaXhlZCBjb2xvcnNcIiAqbmdJZj1cIm1hcmtlclN0eWxlID09PSAnZml4ZWQnXCI+XG4gIDxkaXYgY2xhc3M9XCJjb2xvclwiICpuZ0Zvcj1cImxldCBjb2xvciBvZiBjb2xvcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvcn1cIiAoY2xpY2spPVwibWFyayhjb2xvcilcIj48L2Rpdj5cbjwvZGl2PlxuXG48ZGl2ICNmbG9hdGluZ01hcmtlciBjbGFzcz1cImZsb2F0aW5nIGNvbG9yc1wiICpuZ0lmPVwibWFya2VyU3R5bGUgPT09ICdmbG9hdCdcIiBbbmdTdHlsZV09XCJ7J2xlZnQnOiBwb3NpdGlvblgrJ3B4JywgJ3RvcCc6IHBvc2l0aW9uWSsncHgnLCAndmlzaWJpbGl0eSc6IHZpc2liaWxpdHl9XCI+XG4gICAgPGRpdiBjbGFzcz1cImNvbG9yXCIgKm5nRm9yPVwibGV0IGNvbG9yIG9mIGNvbG9yc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9yfVwiIChjbGljayk9XCJtYXJrKGNvbG9yKVwiPjwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLmNvbG9ycy5maXhlZHt3aWR0aDoxMDAlO2Rpc3BsYXk6ZmxleDtmbGV4LXdyYXA6d3JhcH0uZml4ZWQ+LmNvbG9ye3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHg7bWFyZ2luOjAgMTBweCAxMHB4IDA7Y3Vyc29yOnBvaW50ZXI7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMTIpLDAgMXB4IDJweCByZ2JhKDAsMCwwLC4yNCk7dHJhbnNpdGlvbjouM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSl9LmZpeGVkPi5jb2xvcjpob3Zlcntib3JkZXItcmFkaXVzOjUwJTtib3gtc2hhZG93OjAgMTBweCAxMHB4IHJnYmEoMCwwLDAsLjI1KSwwIDVweCA1cHggcmdiYSgwLDAsMCwuMjIpfS5jb2xvcnMuZmxvYXRpbmd7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiM0MDQwNDA7Ym9yZGVyLXJhZGl1czoycHg7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMTIpLDAgMXB4IDJweCByZ2JhKDAsMCwwLC4yNCk7dHJhbnNpdGlvbjp0b3AgLjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO2Rpc3BsYXk6ZmxleH0uZmxvYXRpbmc+LmNvbG9ye21hcmdpbjoxMHB4O2N1cnNvcjpwb2ludGVyO3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHg7dHJhbnNpdGlvbjp0b3AgLjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpLGJvcmRlci1yYWRpdXMgLjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO3otaW5kZXg6MTB9LmZsb2F0aW5nPi5jb2xvcjpob3Zlcntib3JkZXItcmFkaXVzOjUwJX0uZmxvYXRpbmcuY29sb3JzOmFmdGVye2NvbnRlbnQ6Jyc7ZGlzcGxheTpibG9jaztwb3NpdGlvbjphYnNvbHV0ZTtiYWNrZ3JvdW5kLWNvbG9yOiM0MDQwNDA7d2lkdGg6MjBweDtoZWlnaHQ6MjBweDtib3R0b206LTVweDtsZWZ0OmNhbGMoNTAlIC0gMTBweCk7LXdlYmtpdC10cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTt0cmFuc2Zvcm06cm90YXRlKDQ1ZGVnKTt6LWluZGV4OjF9YF1cbn0pXG5leHBvcnQgY2xhc3MgTWFya2VyQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29sb3JzID0gWycjZjQ0MzM2JywgJyNmZmViM2InLCAnIzRjYWY1MCddO1xuICBwb3NpdGlvblggPSAwO1xuICBwb3NpdGlvblkgPSAwO1xuICB2aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gIEBJbnB1dCgnbWFya2VyU3R5bGUnKSBtYXJrZXJTdHlsZSA9ICdmaXhlZCc7XG4gIEBWaWV3Q2hpbGQoJ2Zsb2F0aW5nTWFya2VyJykgZmxvYXRpbmdNYXJrZXI6IGFueTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLy8gRXZlbnQgZnJvbSB0ZXh0YXJlYSByZWdhcmRpbmcgdGV4dCBzZWxlY3Rpb24gYW5kIG1hcmtlciBzdHlsZSBpcyBzZXQgdG8gZmxvYXRcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ3NlbGVjdGlvbicgJiYgdGhpcy5tYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICAvLyBPdXIgbWFrZXIgd2lkdGggaXMgYXV0byAoVE9ETzogY29sb3JzIGNhbiBiZSBhZGRlZCBhcyBhbiBpbnB1dCksIGxldCdzIGdldCBpdHMgY29tcHV0ZWQgd2lkdGhcbiAgICAgICAgY29uc3QgbWFya2VyV2lkdGggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmZsb2F0aW5nTWFya2VyLm5hdGl2ZUVsZW1lbnQpLndpZHRoO1xuICAgICAgICAvLyBTZWxlY3Rpb24gd2lkdGggYW5kIGhlaWdodCBmcm9tIHJhbmdlIGJvdW5kaW5nIHJlY3RhbmdsZVxuICAgICAgICBjb25zdCBzZWxlY3Rpb25XaWR0aCA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGNvbnN0IHhDZW50ZXIgPSAocGFyc2VJbnQobWFya2VyV2lkdGgsIDApIC0gc2VsZWN0aW9uV2lkdGgpIC8gMjtcblxuXG4gICAgICAgIHRoaXMucG9zaXRpb25YID0gZXZlbnQudmFsdWUuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0geENlbnRlcjtcbiAgICAgICAgLy8gNjRweCA9IDRlbSAoZG91YmxlIHRoZSBsaW5lIGhlaWdodClcbiAgICAgICAgdGhpcy5wb3NpdGlvblkgPSBldmVudC52YWx1ZS5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIDY0O1xuXG4gICAgICAgIC8vIExldCdzIHNob3cgb3VyIGZsb2F0aW5nIG1hcmtlclxuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICB9XG5cbiAgICAgIC8vIEV2ZW50IGZyb20gdGV4dGFyZWEgcmVnYXJkaW5nIGxvc2luZyBmb2N1cyBhbmQgbWFya2VyIHN0eWxlIGlzIHNldCB0byBmbG9hdFxuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ3RleHRhcmVhJyAmJiBldmVudC50eXBlID09PSAnYmx1cicgJiYgdGhpcy5tYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICAvLyBMZXQncyBoaWRlIG91ciBmbG9hdGluZyBtYXJrZXJcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBtYXJrKGNvbG9yKSB7XG4gICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe1xuICAgICAgb3JpZ2luOiAnbWFya2VyJyxcbiAgICAgIHR5cGU6ICdoaWdobGlnaHQnLFxuICAgICAgY29sb3I6IGNvbG9yXG4gICAgfSk7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyLCBTYWZlVmFsdWUgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQFBpcGUoe1xuICBuYW1lOiAnc2FmZUh0bWwnXG59KVxuZXhwb3J0IGNsYXNzIFNhZmVIdG1sUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHt9XG5cbiAgdHJhbnNmb3JtKGh0bWw6IHN0cmluZyk6IFNhZmVWYWx1ZSB7XG4gICAgcmV0dXJuIHRoaXMuc2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RIdG1sKGh0bWwpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOZ3hUZXh0SGlnaGxpZ2h0ZXJDb21wb25lbnQgfSBmcm9tICcuL25neC10ZXh0LWhpZ2hsaWdodGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUZXh0YXJlYUNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQnO1xuaW1wb3J0IHsgU3RvcmVkSGlnaGxpZ2h0c0NvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9zdG9yZWQtaGlnaGxpZ2h0cy9zdG9yZWQtaGlnaGxpZ2h0cy5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFya2VyQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL21hcmtlci9tYXJrZXIuY29tcG9uZW50JztcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBTYWZlSHRtbFBpcGUgfSBmcm9tICcuL3BpcGVzL3NhZmUtaHRtbC5waXBlJztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZVxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBOZ3hUZXh0SGlnaGxpZ2h0ZXJDb21wb25lbnQsXG4gICAgVGV4dGFyZWFDb21wb25lbnQsXG4gICAgU3RvcmVkSGlnaGxpZ2h0c0NvbXBvbmVudCxcbiAgICBNYXJrZXJDb21wb25lbnQsXG4gICAgU2FmZUh0bWxQaXBlXG4gIF0sXG4gIGV4cG9ydHM6IFtOZ3hUZXh0SGlnaGxpZ2h0ZXJDb21wb25lbnRdXG59KVxuZXhwb3J0IGNsYXNzIE5n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