/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Inject, EventEmitter, Output } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { EventsService } from '../../services/events.service';
export class TextareaComponent {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQXFCLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzNGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMzQyxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFhOUQsTUFBTTs7Ozs7SUFNSixZQUF1QyxTQUFjLEVBQVUsTUFBcUI7UUFBN0MsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUFVLFdBQU0sR0FBTixNQUFNLENBQWU7b0JBRjdDLElBQUksWUFBWSxFQUFVO0tBRXdCOzs7O0lBRXpGLFFBQVE7O1FBRU4sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7WUFFdkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxRQUFRLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsQ0FBQyxDQUFDOztnQkFFNUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzthQUM3QztTQUNGLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsZ0JBQWdCO1FBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7O2dCQUN4QixNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ2xDLEdBQUcsQ0FBQyxlQUFlLEVBQUUsQ0FBQztnQkFDdEIsR0FBRyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ2xDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDYjtZQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUM7YUFDYjtTQUNGO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDTixNQUFNLENBQUMsS0FBSyxDQUFDO1NBQ2Q7S0FDRjs7Ozs7O0lBRUQsTUFBTSxDQUFDLEtBQWEsRUFBRSxJQUFZOztRQUVoQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7O1lBRTVCLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7O1lBRXhELElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7U0FDckY7S0FDRjs7OztJQUNELGNBQWM7O1FBRVosRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7O1lBRXhCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQzs7WUFFeEMsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLFVBQVUsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7Z0JBRWpELElBQUksQ0FBQyxjQUFjLEdBQUcsU0FBUyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUMsSUFBSSxDQUFDLFlBQVksR0FBRyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDMUM7U0FDRjtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDckUsSUFBSSxDQUFDLGNBQWMsR0FBRyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDOUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDO1NBQzVCO0tBRUY7Ozs7O0lBR0QsV0FBVyxDQUFDLE1BQU07O1FBQ2hCLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN4QyxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBQyxNQUFNLEVBQUUsVUFBVSxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBQyxDQUFDLENBQUM7U0FDakY7O1FBR0QsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEVBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUMxRDtLQUNGOzs7WUFwRkYsU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxhQUFhO2dCQUN2QixRQUFRLEVBQUU7Ozs7O0NBS1g7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsd01BQXdNLENBQUM7YUFDbk47Ozs7NENBUWMsTUFBTSxTQUFFLFFBQVE7WUFuQnRCLGFBQWE7OzttQkFpQm5CLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBJbmplY3QsIEV2ZW50RW1pdHRlciwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC10ZXh0YXJlYScsXG4gIHRlbXBsYXRlOiBgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYVwiXG4gICAgICAgIChtb3VzZXVwKT1cIm9uU2VsZWN0aW9uKCRldmVudClcIlxuICAgICAgICBbYXR0ci5jb250ZW50ZWRpdGFibGVdPVwidHJ1ZVwiXG4gICAgICAgIChibHVyKT1cIm9uVGV4dEFyZWFCbHVyKClcIj5cbiAgICA8L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AudGV4dGFyZWF7aGVpZ2h0OjI1MHB4O292ZXJmbG93OmF1dG87YmFja2dyb3VuZC1jb2xvcjojZjFmMWYxO3BhZGRpbmc6MjBweDtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTtib3JkZXItcmFkaXVzOjJweDtsaW5lLWhlaWdodDoyZW19LnRleHRhcmVhOmZvY3Vze291dGxpbmU6MH1gXVxufSlcblxuZXhwb3J0IGNsYXNzIFRleHRhcmVhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgc2F2ZWRTZWxlY3Rpb246IFJhbmdlIHwgbnVsbDtcbiAgc2VsZWN0ZWRUZXh0OiBzdHJpbmc7XG5cbiAgQE91dHB1dCgpIGJsdXI6IEV2ZW50RW1pdHRlcjxzdHJpbmc+ID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgY29uc3RydWN0b3IoQEluamVjdCAoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksIHByaXZhdGUgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICAvLyBMaXN0ZW4gdG8gZXZlbnRzXG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgLy8gTWFya2VyIGV2ZW50c1xuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ21hcmtlcicgJiYgZXZlbnQudHlwZSA9PT0gJ2hpZ2hsaWdodCcpIHtcbiAgICAgICAgLy8gSGlnaGxpZ2h0IHRleHRcbiAgICAgICAgdGhpcy5tYXJrZXIoZXZlbnQuY29sb3IsIHRoaXMuc2VsZWN0ZWRUZXh0KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHJlc3RvcmVTZWxlY3Rpb24oKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuc2F2ZWRTZWxlY3Rpb24pIHtcbiAgICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAgIGNvbnN0IHNlbCA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICAgICAgc2VsLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgICAgICBzZWwuYWRkUmFuZ2UodGhpcy5zYXZlZFNlbGVjdGlvbik7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBlbHNlIGlmICh0aGlzLl9kb2N1bWVudC5nZXRTZWxlY3Rpb24pIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBtYXJrZXIoY29sb3I6IHN0cmluZywgdGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgLy8gV2UgaGF2ZSBhIHNlbGVjdGlvbj9cbiAgICBpZiAodGhpcy5yZXN0b3JlU2VsZWN0aW9uKCkpIHtcbiAgICAgIC8vIEV4ZWN1dGUgYmFja2dyb3VuZCBjb2xvclxuICAgICAgdGhpcy5fZG9jdW1lbnQuZXhlY0NvbW1hbmQoJ2hpbGl0ZUNvbG9yJywgZmFsc2UsIGNvbG9yKTtcbiAgICAgIC8vIFRyaWdnZXIgc3RvcmVkIGhpZ2hsaWdodHNcbiAgICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtvcmlnaW46ICd0ZXh0YXJlYScsIHR5cGU6ICdzdG9yZScsIGNvbG9yOiBjb2xvciwgdGV4dDogdGV4dH0pO1xuICAgIH1cbiAgfVxuICBvblRleHRBcmVhQmx1cigpIHtcbiAgICAvLyBCcm93c2VyIHN1cHBvcnRzIGdldFNlbGVjdGlvbigpP1xuICAgIGlmICh3aW5kb3cuZ2V0U2VsZWN0aW9uKSB7XG4gICAgICAvLyBHZXQgc2VsZWN0aW9uXG4gICAgICBjb25zdCBzZWxlY3Rpb24gPSB3aW5kb3cuZ2V0U2VsZWN0aW9uKCk7XG4gICAgICAvLyBCcm93c2VyIHN1cHBvcnQgcmFuZ2U/XG4gICAgICBpZiAoc2VsZWN0aW9uLmdldFJhbmdlQXQgJiYgc2VsZWN0aW9uLnJhbmdlQ291bnQpIHtcbiAgICAgICAgLy8gR2V0IHJhbmdlIGFuZCBzZWxlY3RlZCB0ZXh0XG4gICAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBzZWxlY3Rpb24uZ2V0UmFuZ2VBdCgwKTtcbiAgICAgICAgdGhpcy5zZWxlY3RlZFRleHQgPSBzZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHRoaXMuX2RvY3VtZW50LmdldFNlbGVjdGlvbiAmJiB0aGlzLl9kb2N1bWVudC5jcmVhdGVSYW5nZSkge1xuICAgICAgdGhpcy5zYXZlZFNlbGVjdGlvbiA9IGRvY3VtZW50LmNyZWF0ZVJhbmdlKCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2F2ZWRTZWxlY3Rpb24gPSBudWxsO1xuICAgIH1cblxuICB9XG5cbiAgLy8gR2V0IHNlbGVjdGlvbiBiZWZvcmUgYmx1ciAoZm9yIGZsb2F0aW5nIG1hcmtlcilcbiAgb25TZWxlY3Rpb24oJGV2ZW50KSB7XG4gICAgY29uc3Qgc2VsZWN0aW9uID0gd2luZG93LmdldFNlbGVjdGlvbigpO1xuICAgIGlmIChzZWxlY3Rpb24udHlwZSA9PT0gJ1JhbmdlJykge1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe29yaWdpbjogJ3RleHRhcmVhJywgdHlwZTogJ3NlbGVjdGlvbicsIHZhbHVlOiBzZWxlY3Rpb259KTtcbiAgICB9XG5cbiAgICAvLyBTZWxlY3Rpb24gaXMgbm90IGEgcmFuZ2UsIG1lYW5zIHRoZSB1c2VyIGp1c3QgcGxhY2VzIGNhcmV0IGluIGFub3RoZXIgcGxhY2UsIGxldCdzIGxldCB0aGUgZmxvYXRpbmcgbWFya2VyIGtub3dzIGFib3V0IGl0XG4gICAgaWYgKHNlbGVjdGlvbi50eXBlICE9PSAnUmFuZ2UnKSB7XG4gICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7b3JpZ2luOiAndGV4dGFyZWEnLCB0eXBlOiAnYmx1cid9KTtcbiAgICB9XG4gIH1cblxuXG59XG5cblxuIl19