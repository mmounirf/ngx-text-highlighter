import { Injectable, Pipe, EventEmitter, Component, Input, ViewChild, Inject, Output, NgModule, defineInjectable } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';

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
        this.colors = ['#f44336', '#ffeb3b', '#4caf50'];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (this.colors.length < 1) {
            this.colors = ['#f44336', '#ffeb3b', '#4caf50'];
        }
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
    <th-marker [markerStyle]="markerStyle" [colors]="colors"></th-marker>
    <th-textarea></th-textarea>
    <th-stored-highlights [filters]="colors"></th-stored-highlights>
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
    markerStyle: [{ type: Input, args: ['markerStyle',] }],
    colors: [{ type: Input, args: ['colors',] }]
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
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.events.listen().unsubscribe();
    }
}
TextareaComponent.decorators = [
    { type: Component, args: [{
                selector: 'th-textarea',
                template: `    <div class="textarea"
        (mouseup)="onSelection($event)"
        [attr.contenteditable]="true"
        (blur)="onTextAreaBlur()"
        placeholder="Enter text here..."
    >
    </div>
`,
                styles: [`.textarea{height:250px;overflow:auto;background-color:#fff;padding:20px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);border-radius:4px;line-height:2em}.textarea:focus{outline:0}[contenteditable=true]:empty:before{content:attr(placeholder);display:block;color:#676767}`]
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
        this.selectedFilters = [];
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
    /**
     * @param {?} filter
     * @return {?}
     */
    setFilter(filter) {
        // Check first if filter exists, if yes it will remove the filter if not it will push it to the selectedFilters
        this.isSelected(filter) ? this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1) : this.selectedFilters.push(filter);
    }
    /**
     * @param {?} filter
     * @return {?}
     */
    isSelected(filter) {
        return this.selectedFilters.includes(filter);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.events.listen().unsubscribe();
    }
}
StoredHighlightsComponent.decorators = [
    { type: Component, args: [{
                selector: 'th-stored-highlights',
                template: `<div class="storage-wrapper">
  <ul class="storage-filters">
    <li *ngFor="let filter of filters" [ngStyle]="{'background-color': filter}" [ngClass]="isSelected(filter) ? 'selected' : ''" (click)="setFilter(filter)"></li>
  </ul>
  <div class="storage-list">
    <span *ngIf="(store | colorFilter:selectedFilters).length < 1 && store.length > 0">No items matches the selected filter</span>
    <span *ngIf="store.length < 1">You've no highlighted items</span>
    <p *ngFor="let item of store | colorFilter:selectedFilters" [ngStyle]="{'background-color': item.color}">{{item.text}}</p>
  </div>
</div>
`,
                styles: [`.storage-wrapper{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}ul.storage-filters{display:flex;margin:20px 0 0;background-color:#e1e1e1;padding:20px;border-radius:4px 4px 0 0}.storage-filters li{width:30px;height:30px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);list-style:none;margin-right:10px;position:relative}.storage-filters li.selected:after{position:absolute;content:'\\2713';font-size:25px;color:#fff;font-weight:bolder;text-align:center;width:30px;height:30px}div.storage-list{display:inline-block;padding:20px}.storage-list span{color:#676767}.storage-list p{padding:10px;margin:10px 0;float:left;clear:left;border-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:box-shadow .3s cubic-bezier(.25,.8,.25,1);cursor:pointer}.storage-list p:hover{box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)}`]
            },] },
];
/** @nocollapse */
StoredHighlightsComponent.ctorParameters = () => [
    { type: EventsService }
];
StoredHighlightsComponent.propDecorators = {
    store: [{ type: Input, args: ['store',] }],
    filters: [{ type: Input, args: ['filters',] }]
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
        this.positionX = 0;
        this.positionY = 0;
        this.visibility = 'hidden';
        this.markerStyle = 'fixed';
        this.colors = ['#f44336', '#ffeb3b', '#4caf50'];
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
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.events.listen().unsubscribe();
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
                styles: [`.colors.fixed{width:100%;display:flex;flex-wrap:wrap}.fixed>.color{width:30px;height:30px;margin:0 10px 10px 0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:.3s cubic-bezier(.25,.8,.25,1)}.fixed>.color:hover{border-radius:50%;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.colors.floating{position:absolute;width:auto;background-color:#404040;border-radius:4px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);transition:top .3s cubic-bezier(.25,.8,.25,1);display:flex}.floating>.color{margin:10px;cursor:pointer;width:30px;height:30px;transition:top .3s cubic-bezier(.25,.8,.25,1),border-radius .3s cubic-bezier(.25,.8,.25,1);z-index:10}.floating>.color:hover{border-radius:50%}.floating.colors:after{content:'';display:block;position:absolute;background-color:#404040;width:20px;height:20px;bottom:-5px;left:calc(50% - 10px);-webkit-transform:rotate(45deg);transform:rotate(45deg);z-index:1}`]
            },] },
];
/** @nocollapse */
MarkerComponent.ctorParameters = () => [
    { type: EventsService }
];
MarkerComponent.propDecorators = {
    markerStyle: [{ type: Input, args: ['markerStyle',] }],
    colors: [{ type: Input, args: ['colors',] }],
    floatingMarker: [{ type: ViewChild, args: ['floatingMarker',] }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
class ColorFilterPipe {
    /**
     * @param {?} items
     * @param {?} args
     * @return {?}
     */
    transform(items, args) {
        // If args are not defined or empty
        if (args.length === 0 || !args) {
            // Return all items
            return items;
        }
        else {
            // Return only items with color value existing in args (selected filters)
            return items.filter(item => this.isFilterExist(item.color, args));
        }
    }
    /**
     * @param {?} itemColor
     * @param {?} args
     * @return {?}
     */
    isFilterExist(itemColor, args) {
        return args.includes(itemColor);
    }
}
ColorFilterPipe.decorators = [
    { type: Pipe, args: [{
                name: 'colorFilter',
                pure: false
            },] },
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
                    ColorFilterPipe
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

export { NgxTextHighlighterService, NgxTextHighlighterComponent, NgxTextHighlighterModule, MarkerComponent as ɵd, StoredHighlightsComponent as ɵc, TextareaComponent as ɵb, ColorFilterPipe as ɵe, EventsService as ɵa };

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvc2VydmljZXMvZXZlbnRzLnNlcnZpY2UudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL3BpcGVzL2NvbG9yLWZpbHRlci5waXBlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBFdmVudHNTZXJ2aWNlIHtcbiAgZXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIC8vIERpc3BhdGNoIGV2ZW50cyBhY3Jvc3MgY29tcG9uZW50c1xuICBkaXNwYXRjaChldmVudCkge1xuICAgIHRoaXMuZXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvLyBMaXN0ZW5zIHRvIGRpc3BhdGNoZWQgZXZlbnRzXG4gIGxpc3RlbigpIHtcbiAgICByZXR1cm4gdGhpcy5ldmVudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRoLW1hcmtlciBbbWFya2VyU3R5bGVdPVwibWFya2VyU3R5bGVcIiBbY29sb3JzXT1cImNvbG9yc1wiPjwvdGgtbWFya2VyPlxuICAgIDx0aC10ZXh0YXJlYT48L3RoLXRleHRhcmVhPlxuICAgIDx0aC1zdG9yZWQtaGlnaGxpZ2h0cyBbZmlsdGVyc109XCJjb2xvcnNcIj48L3RoLXN0b3JlZC1oaWdobGlnaHRzPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQE91dHB1dCgpIHRleHRTZWxlY3Rpb246IEV2ZW50RW1pdHRlcjx7fT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgnbWFya2VyU3R5bGUnKSBtYXJrZXJTdHlsZSA9ICdmaXhlZCc7XG4gIEBJbnB1dCgnY29sb3JzJykgY29sb3JzID0gWycjZjQ0MzM2JywgJyNmZmViM2InLCAnIzRjYWY1MCddO1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmNvbG9ycy5sZW5ndGggPCAxKSB7XG4gICAgICB0aGlzLmNvbG9ycyA9IFsnI2Y0NDMzNicsICcjZmZlYjNiJywgJyM0Y2FmNTAnXTtcbiAgICB9XG4gICAgLy8gTGlzdGVucyB0byBldmVudHMgZnJvbSBjaGlsZCBjb21wb25lbnRzXG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIC8vIENoZWNrIGV2ZW50IG9yaWdpbiAod2hpY2ggY29tcG9uZW50IGRpc3BhdGNoZWQgdGhpcyBldmVudClcbiAgICAgIHN3aXRjaCAoZXZlbnQub3JpZ2luKSB7XG4gICAgICAgIC8vIEV2ZW50cyBjb21pbmcgZnJvbSB0aGUgdGV4dGFyZWEgY29tcG9uZW50XG4gICAgICAgIGNhc2UgKCd0ZXh0YXJlYScpOlxuICAgICAgICAgIC8vIEVtaXQgZXZlbnQgdG8gdGhlIGxpYnJhcnkgY29tcG9uZW50IG91dHB1dFxuICAgICAgICAgIHRoaXMudGV4dFNlbGVjdGlvbi5lbWl0KHtzZWxlY3Rpb246IGV2ZW50LnNlbGVjdGlvbiwgbW91c2VFdmVudDogZXZlbnQubW91c2VFdmVudH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbmplY3QsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLXRleHRhcmVhJyxcbiAgdGVtcGxhdGU6IGAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhXCJcbiAgICAgICAgKG1vdXNldXApPVwib25TZWxlY3Rpb24oJGV2ZW50KVwiXG4gICAgICAgIFthdHRyLmNvbnRlbnRlZGl0YWJsZV09XCJ0cnVlXCJcbiAgICAgICAgKGJsdXIpPVwib25UZXh0QXJlYUJsdXIoKVwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGV4dCBoZXJlLi4uXCJcbiAgICA+XG4gICAgPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnRleHRhcmVhe2hlaWdodDoyNTBweDtvdmVyZmxvdzphdXRvO2JhY2tncm91bmQtY29sb3I6I2ZmZjtwYWRkaW5nOjIwcHg7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpO2JvcmRlci1yYWRpdXM6NHB4O2xpbmUtaGVpZ2h0OjJlbX0udGV4dGFyZWE6Zm9jdXN7b3V0bGluZTowfVtjb250ZW50ZWRpdGFibGU9dHJ1ZV06ZW1wdHk6YmVmb3Jle2NvbnRlbnQ6YXR0cihwbGFjZWhvbGRlcik7ZGlzcGxheTpibG9jaztjb2xvcjojNjc2NzY3fWBdXG59KVxuXG5leHBvcnQgY2xhc3MgVGV4dGFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSAge1xuICBzYXZlZFNlbGVjdGlvbjogUmFuZ2UgfCBudWxsO1xuICBzZWxlY3RlZFRleHQ6IHN0cmluZztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0IChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIExpc3RlbiB0byBldmVudHNcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvLyBNYXJrZXIgZXZlbnRzXG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAnbWFya2VyJyAmJiBldmVudC50eXBlID09PSAnaGlnaGxpZ2h0Jykge1xuICAgICAgICAvLyBIaWdobGlnaHQgdGV4dFxuICAgICAgICB0aGlzLm1hcmtlcihldmVudC5jb2xvciwgdGhpcy5zZWxlY3RlZFRleHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzdG9yZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5zYXZlZFNlbGVjdGlvbikge1xuICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbC5hZGRSYW5nZSh0aGlzLnNhdmVkU2VsZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2RvY3VtZW50LmdldFNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtlcihjb2xvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBXZSBoYXZlIGEgc2VsZWN0aW9uP1xuICAgIGlmICh0aGlzLnJlc3RvcmVTZWxlY3Rpb24oKSkge1xuICAgICAgLy8gRXhlY3V0ZSBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICB0aGlzLl9kb2N1bWVudC5leGVjQ29tbWFuZCgnaGlsaXRlQ29sb3InLCBmYWxzZSwgY29sb3IpO1xuICAgICAgLy8gVHJpZ2dlciBzdG9yZWQgaGlnaGxpZ2h0c1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe29yaWdpbjogJ3RleHRhcmVhJywgdHlwZTogJ3N0b3JlJywgY29sb3I6IGNvbG9yLCB0ZXh0OiB0ZXh0fSk7XG4gICAgfVxuICB9XG4gIG9uVGV4dEFyZWFCbHVyKCkge1xuICAgIC8vIEJyb3dzZXIgc3VwcG9ydHMgZ2V0U2VsZWN0aW9uKCk/XG4gICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIC8vIEdldCBzZWxlY3Rpb25cbiAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIC8vIEJyb3dzZXIgc3VwcG9ydCByYW5nZT9cbiAgICAgIGlmIChzZWxlY3Rpb24uZ2V0UmFuZ2VBdCAmJiBzZWxlY3Rpb24ucmFuZ2VDb3VudCkge1xuICAgICAgICAvLyBHZXQgcmFuZ2UgYW5kIHNlbGVjdGVkIHRleHRcbiAgICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGV4dCA9IHNlbGVjdGlvbi50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fZG9jdW1lbnQuZ2V0U2VsZWN0aW9uICYmIHRoaXMuX2RvY3VtZW50LmNyZWF0ZVJhbmdlKSB7XG4gICAgICB0aGlzLnNhdmVkU2VsZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gIH1cblxuICAvLyBHZXQgc2VsZWN0aW9uIGJlZm9yZSBibHVyIChmb3IgZmxvYXRpbmcgbWFya2VyKVxuICBvblNlbGVjdGlvbigkZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbi50eXBlID09PSAnUmFuZ2UnKSB7XG4gICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7b3JpZ2luOiAndGV4dGFyZWEnLCB0eXBlOiAnc2VsZWN0aW9uJywgdmFsdWU6IHNlbGVjdGlvbn0pO1xuICAgIH1cblxuICAgIC8vIFNlbGVjdGlvbiBpcyBub3QgYSByYW5nZSwgbWVhbnMgdGhlIHVzZXIganVzdCBwbGFjZXMgY2FyZXQgaW4gYW5vdGhlciBwbGFjZSwgbGV0J3MgbGV0IHRoZSBmbG9hdGluZyBtYXJrZXIga25vd3MgYWJvdXQgaXRcbiAgICBpZiAoc2VsZWN0aW9uLnR5cGUgIT09ICdSYW5nZScpIHtcbiAgICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtvcmlnaW46ICd0ZXh0YXJlYScsIHR5cGU6ICdibHVyJ30pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtc3RvcmVkLWhpZ2hsaWdodHMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJzdG9yYWdlLXdyYXBwZXJcIj5cbiAgPHVsIGNsYXNzPVwic3RvcmFnZS1maWx0ZXJzXCI+XG4gICAgPGxpICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgZmlsdGVyc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGZpbHRlcn1cIiBbbmdDbGFzc109XCJpc1NlbGVjdGVkKGZpbHRlcikgPyAnc2VsZWN0ZWQnIDogJydcIiAoY2xpY2spPVwic2V0RmlsdGVyKGZpbHRlcilcIj48L2xpPlxuICA8L3VsPlxuICA8ZGl2IGNsYXNzPVwic3RvcmFnZS1saXN0XCI+XG4gICAgPHNwYW4gKm5nSWY9XCIoc3RvcmUgfCBjb2xvckZpbHRlcjpzZWxlY3RlZEZpbHRlcnMpLmxlbmd0aCA8IDEgJiYgc3RvcmUubGVuZ3RoID4gMFwiPk5vIGl0ZW1zIG1hdGNoZXMgdGhlIHNlbGVjdGVkIGZpbHRlcjwvc3Bhbj5cbiAgICA8c3BhbiAqbmdJZj1cInN0b3JlLmxlbmd0aCA8IDFcIj5Zb3UndmUgbm8gaGlnaGxpZ2h0ZWQgaXRlbXM8L3NwYW4+XG4gICAgPHAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RvcmUgfCBjb2xvckZpbHRlcjpzZWxlY3RlZEZpbHRlcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBpdGVtLmNvbG9yfVwiPnt7aXRlbS50ZXh0fX08L3A+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnN0b3JhZ2Utd3JhcHBlcntib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMil9dWwuc3RvcmFnZS1maWx0ZXJze2Rpc3BsYXk6ZmxleDttYXJnaW46MjBweCAwIDA7YmFja2dyb3VuZC1jb2xvcjojZTFlMWUxO3BhZGRpbmc6MjBweDtib3JkZXItcmFkaXVzOjRweCA0cHggMCAwfS5zdG9yYWdlLWZpbHRlcnMgbGl7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDtjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luLXJpZ2h0OjEwcHg7cG9zaXRpb246cmVsYXRpdmV9LnN0b3JhZ2UtZmlsdGVycyBsaS5zZWxlY3RlZDphZnRlcntwb3NpdGlvbjphYnNvbHV0ZTtjb250ZW50OidcXFxcMjcxMyc7Zm9udC1zaXplOjI1cHg7Y29sb3I6I2ZmZjtmb250LXdlaWdodDpib2xkZXI7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MzBweDtoZWlnaHQ6MzBweH1kaXYuc3RvcmFnZS1saXN0e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MjBweH0uc3RvcmFnZS1saXN0IHNwYW57Y29sb3I6IzY3Njc2N30uc3RvcmFnZS1saXN0IHB7cGFkZGluZzoxMHB4O21hcmdpbjoxMHB4IDA7ZmxvYXQ6bGVmdDtjbGVhcjpsZWZ0O2JvcmRlci1yYWRpdXM6NHB4O2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO3RyYW5zaXRpb246Ym94LXNoYWRvdyAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7Y3Vyc29yOnBvaW50ZXJ9LnN0b3JhZ2UtbGlzdCBwOmhvdmVye2JveC1zaGFkb3c6MCAxNHB4IDI4cHggcmdiYSgwLDAsMCwuMjUpLDAgMTBweCAxMHB4IHJnYmEoMCwwLDAsLjIyKX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ3N0b3JlJykgc3RvcmUgPSBbXTtcbiAgQElucHV0KCdmaWx0ZXJzJykgZmlsdGVycztcbiAgc2VsZWN0ZWRGaWx0ZXJzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ3N0b3JlJykge1xuICAgICAgICB0aGlzLnN0b3JlLnB1c2goe3RleHQ6IGV2ZW50LnRleHQsIGNvbG9yOiBldmVudC5jb2xvcn0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBzZXRGaWx0ZXIoZmlsdGVyKSB7XG4gICAgLy8gQ2hlY2sgZmlyc3QgaWYgZmlsdGVyIGV4aXN0cywgaWYgeWVzIGl0IHdpbGwgcmVtb3ZlIHRoZSBmaWx0ZXIgaWYgbm90IGl0IHdpbGwgcHVzaCBpdCB0byB0aGUgc2VsZWN0ZWRGaWx0ZXJzXG4gICAgdGhpcy5pc1NlbGVjdGVkKGZpbHRlcikgPyB0aGlzLnNlbGVjdGVkRmlsdGVycy5zcGxpY2UodGhpcy5zZWxlY3RlZEZpbHRlcnMuaW5kZXhPZihmaWx0ZXIpLCAxKSA6IHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoZmlsdGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLmluY2x1ZGVzKGZpbHRlcik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtbWFya2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZml4ZWQgY29sb3JzXCIgKm5nSWY9XCJtYXJrZXJTdHlsZSA9PT0gJ2ZpeGVkJ1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sb3JcIiAqbmdGb3I9XCJsZXQgY29sb3Igb2YgY29sb3JzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3J9XCIgKGNsaWNrKT1cIm1hcmsoY29sb3IpXCI+PC9kaXY+XG48L2Rpdj5cblxuPGRpdiAjZmxvYXRpbmdNYXJrZXIgY2xhc3M9XCJmbG9hdGluZyBjb2xvcnNcIiAqbmdJZj1cIm1hcmtlclN0eWxlID09PSAnZmxvYXQnXCIgW25nU3R5bGVdPVwieydsZWZ0JzogcG9zaXRpb25YKydweCcsICd0b3AnOiBwb3NpdGlvblkrJ3B4JywgJ3Zpc2liaWxpdHknOiB2aXNpYmlsaXR5fVwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2xvclwiICpuZ0Zvcj1cImxldCBjb2xvciBvZiBjb2xvcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvcn1cIiAoY2xpY2spPVwibWFyayhjb2xvcilcIj48L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5jb2xvcnMuZml4ZWR7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXB9LmZpeGVkPi5jb2xvcnt3aWR0aDozMHB4O2hlaWdodDozMHB4O21hcmdpbjowIDEwcHggMTBweCAwO2N1cnNvcjpwb2ludGVyO2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO3RyYW5zaXRpb246LjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpfS5maXhlZD4uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCU7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfS5jb2xvcnMuZmxvYXRpbmd7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiM0MDQwNDA7Ym9yZGVyLXJhZGl1czo0cHg7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpO3RyYW5zaXRpb246dG9wIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtkaXNwbGF5OmZsZXh9LmZsb2F0aW5nPi5jb2xvcnttYXJnaW46MTBweDtjdXJzb3I6cG9pbnRlcjt3aWR0aDozMHB4O2hlaWdodDozMHB4O3RyYW5zaXRpb246dG9wIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKSxib3JkZXItcmFkaXVzIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTt6LWluZGV4OjEwfS5mbG9hdGluZz4uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCV9LmZsb2F0aW5nLmNvbG9yczphZnRlcntjb250ZW50OicnO2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjojNDA0MDQwO3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7Ym90dG9tOi01cHg7bGVmdDpjYWxjKDUwJSAtIDEwcHgpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7ei1pbmRleDoxfWBdXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95ICB7XG4gIHBvc2l0aW9uWCA9IDA7XG4gIHBvc2l0aW9uWSA9IDA7XG4gIHZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgQElucHV0KCdtYXJrZXJTdHlsZScpIG1hcmtlclN0eWxlID0gJ2ZpeGVkJztcbiAgQElucHV0KCdjb2xvcnMnKSBjb2xvcnMgPSBbJyNmNDQzMzYnLCAnI2ZmZWIzYicsICcjNGNhZjUwJ107XG4gIEBWaWV3Q2hpbGQoJ2Zsb2F0aW5nTWFya2VyJykgZmxvYXRpbmdNYXJrZXI6IGFueTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLy8gRXZlbnQgZnJvbSB0ZXh0YXJlYSByZWdhcmRpbmcgdGV4dCBzZWxlY3Rpb24gYW5kIG1hcmtlciBzdHlsZSBpcyBzZXQgdG8gZmxvYXRcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ3NlbGVjdGlvbicgJiYgdGhpcy5tYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICAvLyBPdXIgbWFrZXIgd2lkdGggaXMgYXV0byAoVE9ETzogY29sb3JzIGNhbiBiZSBhZGRlZCBhcyBhbiBpbnB1dCksIGxldCdzIGdldCBpdHMgY29tcHV0ZWQgd2lkdGhcbiAgICAgICAgY29uc3QgbWFya2VyV2lkdGggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmZsb2F0aW5nTWFya2VyLm5hdGl2ZUVsZW1lbnQpLndpZHRoO1xuICAgICAgICAvLyBTZWxlY3Rpb24gd2lkdGggYW5kIGhlaWdodCBmcm9tIHJhbmdlIGJvdW5kaW5nIHJlY3RhbmdsZVxuICAgICAgICBjb25zdCBzZWxlY3Rpb25XaWR0aCA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGNvbnN0IHhDZW50ZXIgPSAocGFyc2VJbnQobWFya2VyV2lkdGgsIDApIC0gc2VsZWN0aW9uV2lkdGgpIC8gMjtcblxuXG4gICAgICAgIHRoaXMucG9zaXRpb25YID0gZXZlbnQudmFsdWUuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5sZWZ0IC0geENlbnRlcjtcbiAgICAgICAgLy8gNjRweCA9IDRlbSAoZG91YmxlIHRoZSBsaW5lIGhlaWdodClcbiAgICAgICAgdGhpcy5wb3NpdGlvblkgPSBldmVudC52YWx1ZS5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLnRvcCAtIDY0O1xuXG4gICAgICAgIC8vIExldCdzIHNob3cgb3VyIGZsb2F0aW5nIG1hcmtlclxuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSAndmlzaWJsZSc7XG4gICAgICB9XG5cbiAgICAgIC8vIEV2ZW50IGZyb20gdGV4dGFyZWEgcmVnYXJkaW5nIGxvc2luZyBmb2N1cyBhbmQgbWFya2VyIHN0eWxlIGlzIHNldCB0byBmbG9hdFxuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ3RleHRhcmVhJyAmJiBldmVudC50eXBlID09PSAnYmx1cicgJiYgdGhpcy5tYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICAvLyBMZXQncyBoaWRlIG91ciBmbG9hdGluZyBtYXJrZXJcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBtYXJrKGNvbG9yKSB7XG4gICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe1xuICAgICAgb3JpZ2luOiAnbWFya2VyJyxcbiAgICAgIHR5cGU6ICdoaWdobGlnaHQnLFxuICAgICAgY29sb3I6IGNvbG9yXG4gICAgfSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS51bnN1YnNjcmliZSgpO1xuICB9XG59XG4iLCJpbXBvcnQgeyBQaXBlLCBQaXBlVHJhbnNmb3JtIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBQaXBlKHtcbiAgbmFtZTogJ2NvbG9yRmlsdGVyJyxcbiAgcHVyZTogZmFsc2Vcbn0pXG5leHBvcnQgY2xhc3MgQ29sb3JGaWx0ZXJQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIC8vIEl0ZW1zIGFyZSBzb3RyZWQgc2VsZWN0aW9ucywgYXJncyBhcmUgc2VsZWN0ZWQgZmlsdGVyc1xuICB0cmFuc2Zvcm0oaXRlbXM6IGFueVtdLCBhcmdzOiBhbnlbXSkge1xuICAgIC8vIElmIGFyZ3MgYXJlIG5vdCBkZWZpbmVkIG9yIGVtcHR5XG4gICAgaWYgKGFyZ3MubGVuZ3RoID09PSAwIHx8ICFhcmdzKSB7XG4gICAgICAvLyBSZXR1cm4gYWxsIGl0ZW1zXG4gICAgICByZXR1cm4gaXRlbXM7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIFJldHVybiBvbmx5IGl0ZW1zIHdpdGggY29sb3IgdmFsdWUgZXhpc3RpbmcgaW4gYXJncyAoc2VsZWN0ZWQgZmlsdGVycylcbiAgICAgIHJldHVybiBpdGVtcy5maWx0ZXIoaXRlbSA9PiB0aGlzLmlzRmlsdGVyRXhpc3QoaXRlbS5jb2xvciwgYXJncykpO1xuICAgIH1cbiAgfVxuXG4gIC8vIENoZWNrIGlmIGl0ZW0gY29sb3IgaW5jbHVkZWQgaW4gdGhlIHNlbGVjdGVkIGZpbHRlcnMgKGFyZ3MpXG4gIGlzRmlsdGVyRXhpc3QoaXRlbUNvbG9yLCBhcmdzKSB7XG4gICAgcmV0dXJuIGFyZ3MuaW5jbHVkZXMoaXRlbUNvbG9yKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50IH0gZnJvbSAnLi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgVGV4dGFyZWFDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvdGV4dGFyZWEvdGV4dGFyZWEuY29tcG9uZW50JztcbmltcG9ydCB7IFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcmtlckNvbXBvbmVudCB9IGZyb20gJy4vY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQ29sb3JGaWx0ZXJQaXBlIH0gZnJvbSAnLi9waXBlcy9jb2xvci1maWx0ZXIucGlwZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50LFxuICAgIFRleHRhcmVhQ29tcG9uZW50LFxuICAgIFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQsXG4gICAgTWFya2VyQ29tcG9uZW50LFxuICAgIENvbG9yRmlsdGVyUGlwZVxuICBdLFxuICBleHBvcnRzOiBbTmd4VGV4dEhpZ2hsaWdodGVyQ29tcG9uZW50XVxufSlcbmV4cG9ydCBjbGFzcyBOZ3hUZXh0SGlnaGxpZ2h0ZXJNb2R1bGUgeyB9XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBO0lBT0UsaUJBQWlCOzs7WUFMbEIsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7O0FDSkQ7SUFRRTtxQkFGMkIsSUFBSSxZQUFZLEVBQUU7S0FFNUI7Ozs7O0lBRWpCLFFBQVEsQ0FBQyxLQUFLO1FBQ1osSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDeEI7Ozs7SUFHRCxNQUFNO1FBQ0osT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDO0tBQ25COzs7WUFmRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7Ozs7Ozs7QUNKRDs7OztJQWdCRSxZQUFzQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlOzZCQUhDLElBQUksWUFBWSxFQUFFOzJCQUMxQixPQUFPO3NCQUNqQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO0tBQ1o7Ozs7SUFFL0MsUUFBUTtRQUNOLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzFCLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQyxDQUFDO1NBQ2pEOztRQUVELElBQUksQ0FBQyxNQUFNLENB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