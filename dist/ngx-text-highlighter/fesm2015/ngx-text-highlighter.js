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

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXRleHQtaGlnaGxpZ2h0ZXIuanMubWFwIiwic291cmNlcyI6WyJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5zZXJ2aWNlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvc2VydmljZXMvZXZlbnRzLnNlcnZpY2UudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9uZ3gtdGV4dC1oaWdobGlnaHRlci5jb21wb25lbnQudHMiLCJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyL2xpYi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL2NvbXBvbmVudHMvc3RvcmVkLWhpZ2hsaWdodHMvc3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50LnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvY29tcG9uZW50cy9tYXJrZXIvbWFya2VyLmNvbXBvbmVudC50cyIsIm5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvbGliL3BpcGVzL2NvbG9yLWZpbHRlci5waXBlLnRzIiwibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci9saWIvbmd4LXRleHQtaGlnaGxpZ2h0ZXIubW9kdWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyU2VydmljZSB7XG5cbiAgY29uc3RydWN0b3IoKSB7IH1cbn1cbiIsImltcG9ydCB7IEluamVjdGFibGUsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBFdmVudHNTZXJ2aWNlIHtcbiAgZXZlbnQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIGNvbnN0cnVjdG9yKCkgeyB9XG4gIC8vIERpc3BhdGNoIGV2ZW50cyBhY3Jvc3MgY29tcG9uZW50c1xuICBkaXNwYXRjaChldmVudCkge1xuICAgIHRoaXMuZXZlbnQuZW1pdChldmVudCk7XG4gIH1cblxuICAvLyBMaXN0ZW5zIHRvIGRpc3BhdGNoZWQgZXZlbnRzXG4gIGxpc3RlbigpIHtcbiAgICByZXR1cm4gdGhpcy5ldmVudDtcbiAgfVxufVxuIiwiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLWNvbnRhaW5lcicsXG4gIHRlbXBsYXRlOiBgXG4gICAgPHRoLW1hcmtlciBbbWFya2VyU3R5bGVdPVwibWFya2VyU3R5bGVcIiBbY29sb3JzXT1cImNvbG9yc1wiPjwvdGgtbWFya2VyPlxuICAgIDx0aC10ZXh0YXJlYT48L3RoLXRleHRhcmVhPlxuICAgIDx0aC1zdG9yZWQtaGlnaGxpZ2h0cyBbZmlsdGVyc109XCJjb2xvcnNcIj48L3RoLXN0b3JlZC1oaWdobGlnaHRzPlxuICBgLFxuICBzdHlsZXM6IFtdXG59KVxuZXhwb3J0IGNsYXNzIE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcbiAgQE91dHB1dCgpIHRleHRTZWxlY3Rpb246IEV2ZW50RW1pdHRlcjx7fT4gPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG4gIEBJbnB1dCgnbWFya2VyU3R5bGUnKSBtYXJrZXJTdHlsZSA9ICdmaXhlZCc7XG4gIEBJbnB1dCgnY29sb3JzJykgY29sb3JzID0gWycjZjQ0MzM2JywgJyNmZmViM2InLCAnIzRjYWY1MCddO1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7fVxuXG4gIG5nT25Jbml0KCkge1xuICAgIGlmICh0aGlzLmNvbG9ycy5sZW5ndGggPCAxKSB7XG4gICAgICB0aGlzLmNvbG9ycyA9IFsnI2Y0NDMzNicsICcjZmZlYjNiJywgJyM0Y2FmNTAnXTtcbiAgICB9XG4gICAgLy8gTGlzdGVucyB0byBldmVudHMgZnJvbSBjaGlsZCBjb21wb25lbnRzXG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcbiAgICAgIC8vIENoZWNrIGV2ZW50IG9yaWdpbiAod2hpY2ggY29tcG9uZW50IGRpc3BhdGNoZWQgdGhpcyBldmVudClcbiAgICAgIHN3aXRjaCAoZXZlbnQub3JpZ2luKSB7XG4gICAgICAgIC8vIEV2ZW50cyBjb21pbmcgZnJvbSB0aGUgdGV4dGFyZWEgY29tcG9uZW50XG4gICAgICAgIGNhc2UgKCd0ZXh0YXJlYScpOlxuICAgICAgICAgIC8vIEVtaXQgZXZlbnQgdG8gdGhlIGxpYnJhcnkgY29tcG9uZW50IG91dHB1dFxuICAgICAgICAgIHRoaXMudGV4dFNlbGVjdGlvbi5lbWl0KHtzZWxlY3Rpb246IGV2ZW50LnNlbGVjdGlvbiwgbW91c2VFdmVudDogZXZlbnQubW91c2VFdmVudH0pO1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcblxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG59XG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbmplY3QsIEV2ZW50RW1pdHRlciwgT3V0cHV0LCBPbkRlc3Ryb3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLXRleHRhcmVhJyxcbiAgdGVtcGxhdGU6IGAgICAgPGRpdiBjbGFzcz1cInRleHRhcmVhXCJcbiAgICAgICAgKG1vdXNldXApPVwib25TZWxlY3Rpb24oJGV2ZW50KVwiXG4gICAgICAgIFthdHRyLmNvbnRlbnRlZGl0YWJsZV09XCJ0cnVlXCJcbiAgICAgICAgKGJsdXIpPVwib25UZXh0QXJlYUJsdXIoKVwiXG4gICAgICAgIHBsYWNlaG9sZGVyPVwiRW50ZXIgdGV4dCBoZXJlLi4uXCJcbiAgICA+XG4gICAgPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnRleHRhcmVhe2hlaWdodDoyNTBweDtvdmVyZmxvdzphdXRvO2JhY2tncm91bmQtY29sb3I6I2ZmZjtwYWRkaW5nOjIwcHg7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpO2JvcmRlci1yYWRpdXM6NHB4O2xpbmUtaGVpZ2h0OjJlbX0udGV4dGFyZWE6Zm9jdXN7b3V0bGluZTowfVtjb250ZW50ZWRpdGFibGU9dHJ1ZV06ZW1wdHk6YmVmb3Jle2NvbnRlbnQ6YXR0cihwbGFjZWhvbGRlcik7ZGlzcGxheTpibG9jaztjb2xvcjojNjc2NzY3fWBdXG59KVxuXG5leHBvcnQgY2xhc3MgVGV4dGFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSAge1xuICBzYXZlZFNlbGVjdGlvbjogUmFuZ2UgfCBudWxsO1xuICBzZWxlY3RlZFRleHQ6IHN0cmluZztcblxuICBAT3V0cHV0KCkgYmx1cjogRXZlbnRFbWl0dGVyPHN0cmluZz4gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICBjb25zdHJ1Y3RvcihASW5qZWN0IChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSwgcHJpdmF0ZSBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIC8vIExpc3RlbiB0byBldmVudHNcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvLyBNYXJrZXIgZXZlbnRzXG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAnbWFya2VyJyAmJiBldmVudC50eXBlID09PSAnaGlnaGxpZ2h0Jykge1xuICAgICAgICAvLyBIaWdobGlnaHQgdGV4dFxuICAgICAgICB0aGlzLm1hcmtlcihldmVudC5jb2xvciwgdGhpcy5zZWxlY3RlZFRleHQpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcmVzdG9yZVNlbGVjdGlvbigpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5zYXZlZFNlbGVjdGlvbikge1xuICAgICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgY29uc3Qgc2VsID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgICBzZWwucmVtb3ZlQWxsUmFuZ2VzKCk7XG4gICAgICAgIHNlbC5hZGRSYW5nZSh0aGlzLnNhdmVkU2VsZWN0aW9uKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9IGVsc2UgaWYgKHRoaXMuX2RvY3VtZW50LmdldFNlbGVjdGlvbikge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIG1hcmtlcihjb2xvcjogc3RyaW5nLCB0ZXh0OiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBXZSBoYXZlIGEgc2VsZWN0aW9uP1xuICAgIGlmICh0aGlzLnJlc3RvcmVTZWxlY3Rpb24oKSkge1xuICAgICAgLy8gRXhlY3V0ZSBiYWNrZ3JvdW5kIGNvbG9yXG4gICAgICB0aGlzLl9kb2N1bWVudC5leGVjQ29tbWFuZCgnaGlsaXRlQ29sb3InLCBmYWxzZSwgY29sb3IpO1xuICAgICAgLy8gVHJpZ2dlciBzdG9yZWQgaGlnaGxpZ2h0c1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe29yaWdpbjogJ3RleHRhcmVhJywgdHlwZTogJ3N0b3JlJywgY29sb3I6IGNvbG9yLCB0ZXh0OiB0ZXh0fSk7XG4gICAgfVxuICB9XG4gIG9uVGV4dEFyZWFCbHVyKCkge1xuICAgIC8vIEJyb3dzZXIgc3VwcG9ydHMgZ2V0U2VsZWN0aW9uKCk/XG4gICAgaWYgKHdpbmRvdy5nZXRTZWxlY3Rpb24pIHtcbiAgICAgIC8vIEdldCBzZWxlY3Rpb25cbiAgICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgIC8vIEJyb3dzZXIgc3VwcG9ydCByYW5nZT9cbiAgICAgIGlmIChzZWxlY3Rpb24uZ2V0UmFuZ2VBdCAmJiBzZWxlY3Rpb24ucmFuZ2VDb3VudCkge1xuICAgICAgICAvLyBHZXQgcmFuZ2UgYW5kIHNlbGVjdGVkIHRleHRcbiAgICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IHNlbGVjdGlvbi5nZXRSYW5nZUF0KDApO1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGV4dCA9IHNlbGVjdGlvbi50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodGhpcy5fZG9jdW1lbnQuZ2V0U2VsZWN0aW9uICYmIHRoaXMuX2RvY3VtZW50LmNyZWF0ZVJhbmdlKSB7XG4gICAgICB0aGlzLnNhdmVkU2VsZWN0aW9uID0gZG9jdW1lbnQuY3JlYXRlUmFuZ2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IG51bGw7XG4gICAgfVxuXG4gIH1cblxuICAvLyBHZXQgc2VsZWN0aW9uIGJlZm9yZSBibHVyIChmb3IgZmxvYXRpbmcgbWFya2VyKVxuICBvblNlbGVjdGlvbigkZXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgaWYgKHNlbGVjdGlvbi50eXBlID09PSAnUmFuZ2UnKSB7XG4gICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7b3JpZ2luOiAndGV4dGFyZWEnLCB0eXBlOiAnc2VsZWN0aW9uJywgdmFsdWU6IHNlbGVjdGlvbn0pO1xuICAgIH1cblxuICAgIC8vIFNlbGVjdGlvbiBpcyBub3QgYSByYW5nZSwgbWVhbnMgdGhlIHVzZXIganVzdCBwbGFjZXMgY2FyZXQgaW4gYW5vdGhlciBwbGFjZSwgbGV0J3MgbGV0IHRoZSBmbG9hdGluZyBtYXJrZXIga25vd3MgYWJvdXQgaXRcbiAgICBpZiAoc2VsZWN0aW9uLnR5cGUgIT09ICdSYW5nZScpIHtcbiAgICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtvcmlnaW46ICd0ZXh0YXJlYScsIHR5cGU6ICdibHVyJ30pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuXG4iLCJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIE9uRGVzdHJveSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtc3RvcmVkLWhpZ2hsaWdodHMnLFxuICB0ZW1wbGF0ZTogYDxkaXYgY2xhc3M9XCJzdG9yYWdlLXdyYXBwZXJcIj5cbiAgPHVsIGNsYXNzPVwic3RvcmFnZS1maWx0ZXJzXCI+XG4gICAgPGxpICpuZ0Zvcj1cImxldCBmaWx0ZXIgb2YgZmlsdGVyc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGZpbHRlcn1cIiBbbmdDbGFzc109XCJpc1NlbGVjdGVkKGZpbHRlcikgPyAnc2VsZWN0ZWQnIDogJydcIiAoY2xpY2spPVwic2V0RmlsdGVyKGZpbHRlcilcIj48L2xpPlxuICA8L3VsPlxuICA8ZGl2IGNsYXNzPVwic3RvcmFnZS1saXN0XCI+XG4gICAgPHNwYW4gKm5nSWY9XCIoc3RvcmUgfCBjb2xvckZpbHRlcjpzZWxlY3RlZEZpbHRlcnMpLmxlbmd0aCA8IDEgJiYgc3RvcmUubGVuZ3RoID4gMFwiPk5vIGl0ZW1zIG1hdGNoZXMgdGhlIHNlbGVjdGVkIGZpbHRlcjwvc3Bhbj5cbiAgICA8c3BhbiAqbmdJZj1cInN0b3JlLmxlbmd0aCA8IDFcIj5Zb3UndmUgbm8gaGlnaGxpZ2h0ZWQgaXRlbXM8L3NwYW4+XG4gICAgPHAgKm5nRm9yPVwibGV0IGl0ZW0gb2Ygc3RvcmUgfCBjb2xvckZpbHRlcjpzZWxlY3RlZEZpbHRlcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBpdGVtLmNvbG9yfVwiPnt7aXRlbS50ZXh0fX08L3A+XG4gIDwvZGl2PlxuPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnN0b3JhZ2Utd3JhcHBlcntib3gtc2hhZG93OjAgMnB4IDFweCAtMXB4IHJnYmEoMCwwLDAsLjIpLDAgMXB4IDFweCAwIHJnYmEoMCwwLDAsLjE0KSwwIDFweCAzcHggMCByZ2JhKDAsMCwwLC4xMil9dWwuc3RvcmFnZS1maWx0ZXJze2Rpc3BsYXk6ZmxleDttYXJnaW46MjBweCAwIDA7YmFja2dyb3VuZC1jb2xvcjojZTFlMWUxO3BhZGRpbmc6MjBweDtib3JkZXItcmFkaXVzOjRweCA0cHggMCAwfS5zdG9yYWdlLWZpbHRlcnMgbGl7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDtjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTtsaXN0LXN0eWxlOm5vbmU7bWFyZ2luLXJpZ2h0OjEwcHg7cG9zaXRpb246cmVsYXRpdmV9LnN0b3JhZ2UtZmlsdGVycyBsaS5zZWxlY3RlZDphZnRlcntwb3NpdGlvbjphYnNvbHV0ZTtjb250ZW50OidcXFxcMjcxMyc7Zm9udC1zaXplOjI1cHg7Y29sb3I6I2ZmZjtmb250LXdlaWdodDpib2xkZXI7dGV4dC1hbGlnbjpjZW50ZXI7d2lkdGg6MzBweDtoZWlnaHQ6MzBweH1kaXYuc3RvcmFnZS1saXN0e2Rpc3BsYXk6aW5saW5lLWJsb2NrO3BhZGRpbmc6MjBweH0uc3RvcmFnZS1saXN0IHNwYW57Y29sb3I6IzY3Njc2N30uc3RvcmFnZS1saXN0IHB7cGFkZGluZzoxMHB4O21hcmdpbjoxMHB4IDA7ZmxvYXQ6bGVmdDtjbGVhcjpsZWZ0O2JvcmRlci1yYWRpdXM6NHB4O2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO3RyYW5zaXRpb246Ym94LXNoYWRvdyAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7Y3Vyc29yOnBvaW50ZXJ9LnN0b3JhZ2UtbGlzdCBwOmhvdmVye2JveC1zaGFkb3c6MCAxNHB4IDI4cHggcmdiYSgwLDAsMCwuMjUpLDAgMTBweCAxMHB4IHJnYmEoMCwwLDAsLjIyKX1gXVxufSlcbmV4cG9ydCBjbGFzcyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBPbkRlc3Ryb3kge1xuICBASW5wdXQoJ3N0b3JlJykgc3RvcmUgPSBbXTtcbiAgQElucHV0KCdmaWx0ZXJzJykgZmlsdGVycztcbiAgc2VsZWN0ZWRGaWx0ZXJzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ3N0b3JlJykge1xuICAgICAgICB0aGlzLnN0b3JlLnB1c2goe3RleHQ6IGV2ZW50LnRleHQsIGNvbG9yOiBldmVudC5jb2xvcn0pO1xuICAgICAgfVxuICAgIH0pO1xuXG4gIH1cblxuICBzZXRGaWx0ZXIoZmlsdGVyKSB7XG4gICAgLy8gQ2hlY2sgZmlyc3QgaWYgZmlsdGVyIGV4aXN0cywgaWYgeWVzIGl0IHdpbGwgcmVtb3ZlIHRoZSBmaWx0ZXIgaWYgbm90IGl0IHdpbGwgcHVzaCBpdCB0byB0aGUgc2VsZWN0ZWRGaWx0ZXJzXG4gICAgdGhpcy5pc1NlbGVjdGVkKGZpbHRlcikgPyB0aGlzLnNlbGVjdGVkRmlsdGVycy5zcGxpY2UodGhpcy5zZWxlY3RlZEZpbHRlcnMuaW5kZXhPZihmaWx0ZXIpLCAxKSA6IHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLnB1c2goZmlsdGVyKTtcbiAgfVxuXG4gIGlzU2VsZWN0ZWQoZmlsdGVyKSB7XG4gICAgcmV0dXJuIHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLmluY2x1ZGVzKGZpbHRlcik7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS51bnN1YnNjcmliZSgpO1xuICB9XG5cbn1cbiIsImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgVmlld0NoaWxkLCBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgU2ltcGxlQ2hhbmdlcyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtbWFya2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZml4ZWQgY29sb3JzXCIgKm5nSWY9XCJtYXJrZXJTdHlsZSA9PT0gJ2ZpeGVkJ1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sb3JcIiAqbmdGb3I9XCJsZXQgY29sb3Igb2YgY29sb3JzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3J9XCIgKGNsaWNrKT1cIm1hcmsoY29sb3IpXCI+PC9kaXY+XG48L2Rpdj5cblxuPGRpdiAjZmxvYXRpbmdNYXJrZXIgY2xhc3M9XCJmbG9hdGluZyBjb2xvcnNcIiAqbmdJZj1cIm1hcmtlclN0eWxlID09PSAnZmxvYXQnXCIgW25nU3R5bGVdPVwieydsZWZ0JzogcG9zaXRpb25YKydweCcsICd0b3AnOiBwb3NpdGlvblkrJ3B4JywgJ3Zpc2liaWxpdHknOiB2aXNpYmlsaXR5fVwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2xvclwiICpuZ0Zvcj1cImxldCBjb2xvciBvZiBjb2xvcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvcn1cIiAoY2xpY2spPVwibWFyayhjb2xvcilcIj48L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5jb2xvcnMuZml4ZWR7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXB9LmZpeGVkPi5jb2xvcnt3aWR0aDozMHB4O2hlaWdodDozMHB4O21hcmdpbjowIDEwcHggMTBweCAwO2N1cnNvcjpwb2ludGVyO2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO3RyYW5zaXRpb246LjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpfS5maXhlZD4uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCU7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfS5jb2xvcnMuZmxvYXRpbmd7cG9zaXRpb246YWJzb2x1dGU7d2lkdGg6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiM0MDQwNDA7Ym9yZGVyLXJhZGl1czo0cHg7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpO3RyYW5zaXRpb246dG9wIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtkaXNwbGF5OmZsZXh9LmZsb2F0aW5nPi5jb2xvcnttYXJnaW46MTBweDtjdXJzb3I6cG9pbnRlcjt3aWR0aDozMHB4O2hlaWdodDozMHB4O3RyYW5zaXRpb246dG9wIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKSxib3JkZXItcmFkaXVzIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTt6LWluZGV4OjEwfS5mbG9hdGluZz4uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCV9LmZsb2F0aW5nLmNvbG9yczphZnRlcntjb250ZW50OicnO2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjojNDA0MDQwO3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7Ym90dG9tOi01cHg7bGVmdDpjYWxjKDUwJSAtIDEwcHgpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7ei1pbmRleDoxfWBdXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95ICB7XG4gIHBvc2l0aW9uWCA9IDA7XG4gIHBvc2l0aW9uWSA9IDA7XG4gIHZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgQElucHV0KCdtYXJrZXJTdHlsZScpIG1hcmtlclN0eWxlID0gJ2ZpeGVkJztcbiAgQElucHV0KCdjb2xvcnMnKSBjb2xvcnMgPSBbJyNmNDQzMzYnLCAnI2ZmZWIzYicsICcjNGNhZjUwJ107XG4gIEBWaWV3Q2hpbGQoJ2Zsb2F0aW5nTWFya2VyJykgZmxvYXRpbmdNYXJrZXI6IGFueTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLy8gRXZlbnQgZnJvbSB0ZXh0YXJlYSByZWdhcmRpbmcgdGV4dCBzZWxlY3Rpb24gYW5kIG1hcmtlciBzdHlsZSBpcyBzZXQgdG8gZmxvYXRcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ3NlbGVjdGlvbicgJiYgdGhpcy5tYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0Jykge1xuICAgICAgICAvLyBPdXIgbWFrZXIgd2lkdGggaXMgYXV0byAoVE9ETzogY29sb3JzIGNhbiBiZSBhZGRlZCBhcyBhbiBpbnB1dCksIGxldCdzIGdldCBpdHMgY29tcHV0ZWQgd2lkdGhcbiAgICAgICAgY29uc3QgbWFya2VyV2lkdGggPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0aGlzLmZsb2F0aW5nTWFya2VyLm5hdGl2ZUVsZW1lbnQpLndpZHRoO1xuICAgICAgICAvLyBTZWxlY3Rpb24gd2lkdGggYW5kIGhlaWdodCBmcm9tIHJhbmdlIGJvdW5kaW5nIHJlY3RhbmdsZVxuICAgICAgICBjb25zdCBzZWxlY3Rpb25XaWR0aCA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGg7XG4gICAgICAgIGNvbnN0IHhDZW50ZXIgPSAocGFyc2VJbnQobWFya2VyV2lkdGgsIDApIC0gc2VsZWN0aW9uV2lkdGgpIC8gMjtcblxuICAgICAgICB0aGlzLnBvc2l0aW9uWCA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHhDZW50ZXI7XG4gICAgICAgIC8vIDY0cHggPSA0ZW0gKGRvdWJsZSB0aGUgbGluZSBoZWlnaHQpXG4gICAgICAgIHRoaXMucG9zaXRpb25ZID0gZXZlbnQudmFsdWUuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSA2NDtcblxuICAgICAgICAvLyBMZXQncyBzaG93IG91ciBmbG9hdGluZyBtYXJrZXJcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgfVxuXG4gICAgICAvLyBFdmVudCBmcm9tIHRleHRhcmVhIHJlZ2FyZGluZyBsb3NpbmcgZm9jdXMgYW5kIG1hcmtlciBzdHlsZSBpcyBzZXQgdG8gZmxvYXRcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ2JsdXInICYmIHRoaXMubWFya2VyU3R5bGUgPT09ICdmbG9hdCcpIHtcbiAgICAgICAgLy8gTGV0J3MgaGlkZSBvdXIgZmxvYXRpbmcgbWFya2VyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbWFyayhjb2xvcikge1xuICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtcbiAgICAgIG9yaWdpbjogJ21hcmtlcicsXG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIiwiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjb2xvckZpbHRlcicsXG4gIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIENvbG9yRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvLyBJdGVtcyBhcmUgc290cmVkIHNlbGVjdGlvbnMsIGFyZ3MgYXJlIHNlbGVjdGVkIGZpbHRlcnNcbiAgdHJhbnNmb3JtKGl0ZW1zOiBhbnlbXSwgYXJnczogYW55W10pIHtcbiAgICAvLyBJZiBhcmdzIGFyZSBub3QgZGVmaW5lZCBvciBlbXB0eVxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCB8fCAhYXJncykge1xuICAgICAgLy8gUmV0dXJuIGFsbCBpdGVtc1xuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZXR1cm4gb25seSBpdGVtcyB3aXRoIGNvbG9yIHZhbHVlIGV4aXN0aW5nIGluIGFyZ3MgKHNlbGVjdGVkIGZpbHRlcnMpXG4gICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKGl0ZW0gPT4gdGhpcy5pc0ZpbHRlckV4aXN0KGl0ZW0uY29sb3IsIGFyZ3MpKTtcbiAgICB9XG4gIH1cblxuICAvLyBDaGVjayBpZiBpdGVtIGNvbG9yIGluY2x1ZGVkIGluIHRoZSBzZWxlY3RlZCBmaWx0ZXJzIChhcmdzKVxuICBpc0ZpbHRlckV4aXN0KGl0ZW1Db2xvciwgYXJncykge1xuICAgIHJldHVybiBhcmdzLmluY2x1ZGVzKGl0ZW1Db2xvcik7XG4gIH1cblxufVxuIiwiaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCB9IGZyb20gJy4vbmd4LXRleHQtaGlnaGxpZ2h0ZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRleHRhcmVhQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3RleHRhcmVhL3RleHRhcmVhLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50IH0gZnJvbSAnLi9jb21wb25lbnRzL3N0b3JlZC1oaWdobGlnaHRzL3N0b3JlZC1oaWdobGlnaHRzLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJrZXJDb21wb25lbnQgfSBmcm9tICcuL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IENvbG9yRmlsdGVyUGlwZSB9IGZyb20gJy4vcGlwZXMvY29sb3ItZmlsdGVyLnBpcGUnO1xuXG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbXG4gICAgQ29tbW9uTW9kdWxlXG4gIF0sXG4gIGRlY2xhcmF0aW9uczogW1xuICAgIE5neFRleHRIaWdobGlnaHRlckNvbXBvbmVudCxcbiAgICBUZXh0YXJlYUNvbXBvbmVudCxcbiAgICBTdG9yZWRIaWdobGlnaHRzQ29tcG9uZW50LFxuICAgIE1hcmtlckNvbXBvbmVudCxcbiAgICBDb2xvckZpbHRlclBpcGVcbiAgXSxcbiAgZXhwb3J0czogW05neFRleHRIaWdobGlnaHRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VGV4dEhpZ2hsaWdodGVyTW9kdWxlIHsgfVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQTtJQU9FLGlCQUFpQjs7O1lBTGxCLFVBQVUsU0FBQztnQkFDVixVQUFVLEVBQUUsTUFBTTthQUNuQjs7Ozs7Ozs7OztBQ0pEO0lBUUU7cUJBRjJCLElBQUksWUFBWSxFQUFFO0tBRTVCOzs7OztJQUVqQixRQUFRLENBQUMsS0FBSztRQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hCOzs7O0lBR0QsTUFBTTtRQUNKLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQztLQUNuQjs7O1lBZkYsVUFBVSxTQUFDO2dCQUNWLFVBQVUsRUFBRSxNQUFNO2FBQ25COzs7Ozs7Ozs7O0FDSkQ7Ozs7SUFnQkUsWUFBc0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTs2QkFIQyxJQUFJLFlBQVksRUFBRTsyQkFDMUIsT0FBTztzQkFDakIsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQztLQUNaOzs7O0lBRS9DLFFBQVE7UUFDTixJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUMxQixJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQztTQUNqRDs7UUFFRCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLOztZQUVsQyxRQUFRLEtBQUssQ0FBQyxNQUFNOztnQkFFbEIsTUFBTSxVQUFVOztvQkFFZCxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxFQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLENBQUMsVUFBVSxFQUFDLENBQUMsQ0FBQztvQkFDdEYsTUFBTTtnQkFFTjtvQkFDQSxNQUFNO2FBQ1A7U0FDRixDQUFDLENBQUM7S0FFSjs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7WUF0Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxjQUFjO2dCQUN4QixRQUFRLEVBQUU7Ozs7R0FJVDtnQkFDRCxNQUFNLEVBQUUsRUFBRTthQUNYOzs7O1lBVlEsYUFBYTs7OzRCQVluQixNQUFNOzBCQUNOLEtBQUssU0FBQyxhQUFhO3FCQUNuQixLQUFLLFNBQUMsUUFBUTs7Ozs7OztBQ2ZqQjs7Ozs7SUF1QkUsWUFBdUMsU0FBYyxFQUFVLE1BQXFCO1FBQTdDLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO29CQUY3QyxJQUFJLFlBQVksRUFBVTtLQUV3Qjs7OztJQUV6RixRQUFROztRQUVOLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSzs7WUFFbkMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLFFBQVEsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsRUFBRTs7Z0JBRTNELElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7YUFDN0M7U0FDRixDQUFDLENBQUM7S0FDSjs7OztJQUVELGdCQUFnQjtRQUNkLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRTtZQUN2QixJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O2dCQUN2QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ2xDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2xDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7aUJBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRTtnQkFDdEMsT0FBTyxJQUFJLENBQUM7YUFDYjtTQUNGO2FBQU07WUFDTCxPQUFPLEtBQUssQ0FBQztTQUNkO0tBQ0Y7Ozs7OztJQUVELE1BQU0sQ0FBQyxLQUFhLEVBQUUsSUFBWTs7UUFFaEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBRTs7WUFFM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQzs7WUFFeEQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFDLENBQUMsQ0FBQztTQUNyRjtLQUNGOzs7O0lBQ0QsY0FBYzs7UUFFWixJQUFJLE1BQU0sQ0FBQyxZQUFZLEVBQUU7O1lBRXZCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7WUFFeEMsSUFBSSxTQUFTLENBQUMsVUFBVSxJQUFJLFNBQVMsQ0FBQyxVQUFVLEVBQUU7O2dCQUVoRCxJQUFJLENBQUMsY0FBYyxHQUFHLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxZQUFZLEdBQUcsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO2FBQzFDO1NBQ0Y7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFO1lBQ3BFLElBQUksQ0FBQyxjQUFjLEdBQUcsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzlDO2FBQU07WUFDTCxJQUFJLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQztTQUM1QjtLQUVGOzs7OztJQUdELFdBQVcsQ0FBQyxNQUFNOztRQUNoQixNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEMsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFDLENBQUMsQ0FBQztTQUNqRjs7UUFHRCxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1lBQzlCLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUMxRDtLQUNGOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7OztZQTFGRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7OztDQU9YO2dCQUNDLE1BQU0sRUFBRSxDQUFDLGlVQUFpVSxDQUFDO2FBQzVVOzs7OzRDQVFjLE1BQU0sU0FBRSxRQUFRO1lBckJ0QixhQUFhOzs7bUJBbUJuQixNQUFNOzs7Ozs7O0FDckJUOzs7O0lBc0JFLFlBQXNCLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7cUJBSG5CLEVBQUU7K0JBRU8sRUFBRTtLQUNhOzs7O0lBRWhELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUs7WUFDbkMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtnQkFDekQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDekQ7U0FDRixDQUFDLENBQUM7S0FFSjs7Ozs7SUFFRCxTQUFTLENBQUMsTUFBTTs7UUFFZCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3BJOzs7OztJQUVELFVBQVUsQ0FBQyxNQUFNO1FBQ2YsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUM5Qzs7OztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7WUF6Q0YsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7Ozs7OztDQVVYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLGc3QkFBZzdCLENBQUM7YUFDMzdCOzs7O1lBaEJRLGFBQWE7OztvQkFrQm5CLEtBQUssU0FBQyxPQUFPO3NCQUNiLEtBQUssU0FBQyxTQUFTOzs7Ozs7O0FDcEJsQjs7OztJQXNCRSxZQUFzQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO3lCQU4vQixDQUFDO3lCQUNELENBQUM7MEJBQ0EsUUFBUTsyQkFDZSxPQUFPO3NCQUNqQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO0tBRVg7Ozs7SUFFaEQsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSzs7WUFFbkMsSUFBSSxLQUFLLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxLQUFLLE9BQU8sRUFBRTs7Z0JBRTdGLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7Z0JBRXJGLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDOztnQkFDL0UsTUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLGNBQWMsSUFBSSxDQUFDLENBQUM7Z0JBRWhFLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDOztnQkFFbEYsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7O2dCQUc1RSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQzthQUM3Qjs7WUFHRCxJQUFJLEtBQUssQ0FBQyxNQUFNLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssT0FBTyxFQUFFOztnQkFFeEYsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7YUFDNUI7U0FDRixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxJQUFJLENBQUMsS0FBSztRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLElBQUksRUFBRSxXQUFXO1lBQ2pCLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7O1lBekRGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOzs7Ozs7O0NBT1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsNmdDQUE2Z0MsQ0FBQzthQUN4aEM7Ozs7WUFiUSxhQUFhOzs7MEJBa0JuQixLQUFLLFNBQUMsYUFBYTtxQkFDbkIsS0FBSyxTQUFDLFFBQVE7NkJBQ2QsU0FBUyxTQUFDLGdCQUFnQjs7Ozs7OztBQ3JCN0I7Ozs7OztJQVFFLFNBQVMsQ0FBQyxLQUFZLEVBQUUsSUFBVzs7UUFFakMsSUFBSSxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTs7WUFFOUIsT0FBTyxLQUFLLENBQUM7U0FDZDthQUFNOztZQUVMLE9BQU8sS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDbkU7S0FDRjs7Ozs7O0lBR0QsYUFBYSxDQUFDLFNBQVMsRUFBRSxJQUFJO1FBQzNCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztLQUNqQzs7O1lBcEJGLElBQUksU0FBQztnQkFDSixJQUFJLEVBQUUsYUFBYTtnQkFDbkIsSUFBSSxFQUFFLEtBQUs7YUFDWjs7Ozs7OztBQ0xEOzs7WUFRQyxRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFO29CQUNaLDJCQUEyQjtvQkFDM0IsaUJBQWlCO29CQUNqQix5QkFBeUI7b0JBQ3pCLGVBQWU7b0JBQ2YsZUFBZTtpQkFDaEI7Z0JBQ0QsT0FBTyxFQUFFLENBQUMsMkJBQTJCLENBQUM7YUFDdkM7Ozs7Ozs7Ozs7Ozs7OzsifQ==