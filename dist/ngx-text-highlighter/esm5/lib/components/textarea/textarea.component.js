/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventsService } from '../../services/events.service';
var TextareaComponent = /** @class */ (function () {
    function TextareaComponent(_document, events) {
        this._document = _document;
        this.events = events;
        this.blur = new EventEmitter();
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
        { type: Component, args: [{
                    selector: 'th-textarea',
                    template: "    <div class=\"textarea\"\n        (mouseup)=\"onSelection($event)\"\n        [attr.contenteditable]=\"true\"\n        (blur)=\"onTextAreaBlur()\">\n    </div>\n",
                    styles: [".textarea{height:250px;overflow:auto;background-color:#f1f1f1;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);border-radius:2px;line-height:2em}.textarea:focus{outline:0}"]
                },] },
    ];
    /** @nocollapse */
    TextareaComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: EventsService }
    ]; };
    TextareaComponent.propDecorators = {
        blur: [{ type: Output }]
    };
    return TextareaComponent;
}());
export { TextareaComponent };
if (false) {
    /** @type {?} */
    TextareaComponent.prototype.savedSelection;
    /** @type {?} */
    TextareaComponent.prototype.selectedText;
    /** @type {?} */
    TextareaComponent.prototype.blur;
    /** @type {?} */
    TextareaComponent.prototype._document;
    /** @type {?} */
    TextareaComponent.prototype.events;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0lBbUI1RCwyQkFBdUMsU0FBYyxFQUFVLE1BQXFCO1FBQTdDLGNBQVMsR0FBVCxTQUFTLENBQUs7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFlO29CQUY3QyxJQUFJLFlBQVksRUFBVTtLQUV3Qjs7OztJQUV6RixvQ0FBUTs7O0lBQVI7UUFBQSxpQkFTQzs7UUFQQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7O1lBRW5DLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssUUFBUSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLENBQUMsQ0FBQzs7Z0JBRTVELEFBREEsaUJBQWlCO2dCQUNqQixLQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsS0FBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQzdDO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7SUFFRCw0Q0FBZ0I7OztJQUFoQjtRQUNFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDOztnQkFDeEIsSUFBTSxHQUFHLEdBQUcsTUFBTSxDQUFD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LCBPbkluaXQsIFZpZXdDaGlsZCwgSW5qZWN0LCBFdmVudEVtaXR0ZXIsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtdGV4dGFyZWEnLFxuICB0ZW1wbGF0ZTogYCAgICA8ZGl2IGNsYXNzPVwidGV4dGFyZWFcIlxuICAgICAgICAobW91c2V1cCk9XCJvblNlbGVjdGlvbigkZXZlbnQpXCJcbiAgICAgICAgW2F0dHIuY29udGVudGVkaXRhYmxlXT1cInRydWVcIlxuICAgICAgICAoYmx1cik9XCJvblRleHRBcmVhQmx1cigpXCI+XG4gICAgPC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnRleHRhcmVhe2hlaWdodDoyNTBweDtvdmVyZmxvdzphdXRvO2JhY2tncm91bmQtY29sb3I6I2YxZjFmMTtwYWRkaW5nOjIwcHg7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMTIpLDAgMXB4IDJweCByZ2JhKDAsMCwwLC4yNCk7Ym9yZGVyLXJhZGl1czoycHg7bGluZS1oZWlnaHQ6MmVtfS50ZXh0YXJlYTpmb2N1c3tvdXRsaW5lOjB9YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIHNhdmVkU2VsZWN0aW9uOiBSYW5nZSB8IG51bGw7XG4gIHNlbGVjdGVkVGV4dDogc3RyaW5nO1xuXG4gIEBPdXRwdXQoKSBibHVyOiBFdmVudEVtaXR0ZXI8c3RyaW5nPiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIGNvbnN0cnVjdG9yKEBJbmplY3QgKERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LCBwcml2YXRlIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgLy8gTGlzdGVuIHRvIGV2ZW50c1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIC8vIE1hcmtlciBldmVudHNcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICdtYXJrZXInICYmIGV2ZW50LnR5cGUgPT09ICdoaWdobGlnaHQnKSB7XG4gICAgICAgIC8vIEhpZ2hsaWdodCB0ZXh0XG4gICAgICAgIHRoaXMubWFya2VyKGV2ZW50LmNvbG9yLCB0aGlzLnNlbGVjdGVkVGV4dCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICByZXN0b3JlU2VsZWN0aW9uKCk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLnNhdmVkU2VsZWN0aW9uKSB7XG4gICAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgICBjb25zdCBzZWwgPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAgIHNlbC5yZW1vdmVBbGxSYW5nZXMoKTtcbiAgICAgICAgc2VsLmFkZFJhbmdlKHRoaXMuc2F2ZWRTZWxlY3Rpb24pO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH0gZWxzZSBpZiAodGhpcy5fZG9jdW1lbnQuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgbWFya2VyKGNvbG9yOiBzdHJpbmcsIHRleHQ6IHN0cmluZyk6IHZvaWQge1xuICAgIC8vIFdlIGhhdmUgYSBzZWxlY3Rpb24/XG4gICAgaWYgKHRoaXMucmVzdG9yZVNlbGVjdGlvbigpKSB7XG4gICAgICAvLyBFeGVjdXRlIGJhY2tncm91bmQgY29sb3JcbiAgICAgIHRoaXMuX2RvY3VtZW50LmV4ZWNDb21tYW5kKCdoaWxpdGVDb2xvcicsIGZhbHNlLCBjb2xvcik7XG4gICAgICAvLyBUcmlnZ2VyIHN0b3JlZCBoaWdobGlnaHRzXG4gICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7b3JpZ2luOiAndGV4dGFyZWEnLCB0eXBlOiAnc3RvcmUnLCBjb2xvcjogY29sb3IsIHRleHQ6IHRleHR9KTtcbiAgICB9XG4gIH1cbiAgb25UZXh0QXJlYUJsdXIoKSB7XG4gICAgLy8gQnJvd3NlciBzdXBwb3J0cyBnZXRTZWxlY3Rpb24oKT9cbiAgICBpZiAod2luZG93LmdldFNlbGVjdGlvbikge1xuICAgICAgLy8gR2V0IHNlbGVjdGlvblxuICAgICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgICAgLy8gQnJvd3NlciBzdXBwb3J0IHJhbmdlP1xuICAgICAgaWYgKHNlbGVjdGlvbi5nZXRSYW5nZUF0ICYmIHNlbGVjdGlvbi5yYW5nZUNvdW50KSB7XG4gICAgICAgIC8vIEdldCByYW5nZSBhbmQgc2VsZWN0ZWQgdGV4dFxuICAgICAgICB0aGlzLnNhdmVkU2VsZWN0aW9uID0gc2VsZWN0aW9uLmdldFJhbmdlQXQoMCk7XG4gICAgICAgIHRoaXMuc2VsZWN0ZWRUZXh0ID0gc2VsZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh0aGlzLl9kb2N1bWVudC5nZXRTZWxlY3Rpb24gJiYgdGhpcy5fZG9jdW1lbnQuY3JlYXRlUmFuZ2UpIHtcbiAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBkb2N1bWVudC5jcmVhdGVSYW5nZSgpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnNhdmVkU2VsZWN0aW9uID0gbnVsbDtcbiAgICB9XG5cbiAgfVxuXG4gIC8vIEdldCBzZWxlY3Rpb24gYmVmb3JlIGJsdXIgKGZvciBmbG9hdGluZyBtYXJrZXIpXG4gIG9uU2VsZWN0aW9uKCRldmVudCkge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICBpZiAoc2VsZWN0aW9uLnR5cGUgPT09ICdSYW5nZScpIHtcbiAgICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtvcmlnaW46ICd0ZXh0YXJlYScsIHR5cGU6ICdzZWxlY3Rpb24nLCB2YWx1ZTogc2VsZWN0aW9ufSk7XG4gICAgfVxuXG4gICAgLy8gU2VsZWN0aW9uIGlzIG5vdCBhIHJhbmdlLCBtZWFucyB0aGUgdXNlciBqdXN0IHBsYWNlcyBjYXJldCBpbiBhbm90aGVyIHBsYWNlLCBsZXQncyBsZXQgdGhlIGZsb2F0aW5nIG1hcmtlciBrbm93cyBhYm91dCBpdFxuICAgIGlmIChzZWxlY3Rpb24udHlwZSAhPT0gJ1JhbmdlJykge1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe29yaWdpbjogJ3RleHRhcmVhJywgdHlwZTogJ2JsdXInfSk7XG4gICAgfVxuICB9XG5cblxufVxuXG5cbiJdfQ==