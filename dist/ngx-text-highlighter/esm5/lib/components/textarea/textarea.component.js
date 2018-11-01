/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { DomSanitizer } from '@angular/platform-browser';
var TextareaComponent = /** @class */ (function () {
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
        { type: Component, args: [{
                    selector: 'th-textarea',
                    template: "<div\n  class=\"textarea\"\n  (mouseup)=\"handleSelection($event)\"\n  contenteditable=\"true\"\n  [innerHtml]=\"content | safeHtml\"\n  (input)=\"$event.target.innerHtml\"\n  (blur)=\"handleBlur($event)\"\n></div>\n",
                    styles: [".textarea{height:250px;overflow:auto;background-color:#f1f1f1;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);border-radius:2px;line-height:2em}.textarea:focus{outline:0}"]
                },] },
    ];
    /** @nocollapse */
    TextareaComponent.ctorParameters = function () { return [
        { type: EventsService },
        { type: DomSanitizer }
    ]; };
    return TextareaComponent;
}());
export { TextareaComponent };
if (false) {
    /** @type {?} */
    TextareaComponent.prototype.content;
    /** @type {?} */
    TextareaComponent.prototype.selection;
    /** @type {?} */
    TextareaComponent.prototype.position;
    /** @type {?} */
    TextareaComponent.prototype.events;
    /** @type {?} */
    TextareaComponent.prototype.sanitizer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWlDLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7O0lBaUJ2RCwyQkFBc0IsTUFBcUIsRUFBVSxTQUF1QjtRQUF0RCxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYzt1QkFDbEUsK2tEQUEra0Q7eUJBQzdrRCxFQUFFO0tBRm1FOzs7O0lBSWpGLG9DQUFROzs7SUFBUjtRQUFBLGlCQW9CQztRQW5CQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUs7WUFFbEMsTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBRXJCLEtBQUssQ0FBQyxRQUFRLENBQUM7b0JBQ2IsRUFBRSxDQUFDLENBQUMsS0FBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7d0JBQ25CLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSSxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsT0FBTyxFQUFFLEtBQUksQ0FBQyxRQUFRLEVBQUUscUNBQWtDLEtBQUssQ0FBQyxLQUFLLFlBQU0sS0FBSSxDQUFDLFNBQVMsWUFBUyxDQUFDLENBQUM7cUJBQ3hJO29CQUNILEtBQUssQ0FBQztnQkFFTixLQUFLLENBQUMsVUFBVSxDQUFDO29CQUNmLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDNUMsS0FBSSxDQUFDLFFBQVEsR0FBRyxFQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUMsQ0FBQztvQkFDNUYsS0FBSyxDQUFDO2dCQUVOO29CQUNBLEtBQUssQ0FBQzthQUNQO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBR0QsMkNBQWU7Ozs7SUFBZixVQUFnQixNQUFrQjs7UUFFaEMsSUFBTSxTQUFTLEdBQWMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUV4RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7Z0JBQ2pCLE1BQU0sRUFBRSxVQUFVO2dCQUNsQixJQUFJLEVBQUUsV0FBVztnQkFDakIsVUFBVSxFQUFFLE1BQU07Z0JBQ2xCLFNBQVMsRUFBRSxTQUFTO2FBQ3JCLENBQUMsQ0FBQztTQUNOO0tBQ0Y7Ozs7O0lBRUQsc0NBQVU7Ozs7SUFBVixVQUFXLE1BQU07UUFDZixJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDO0tBQ3hDOzs7Ozs7O0lBRUQscUNBQVM7Ozs7OztJQUFULFVBQVUsTUFBTSxFQUFFLFFBQVEsRUFBRSxPQUFPOztRQUNqQyxJQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsSUFBSSxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUM7UUFDL0MsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekY7O2dCQS9ERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGFBQWE7b0JBQ3ZCLFFBQVEsRUFBRSwwTkFRWDtvQkFDQyxNQUFNLEVBQUUsQ0FBQyx3TUFBd00sQ0FBQztpQkFDbk47Ozs7Z0JBZlEsYUFBYTtnQkFDYixZQUFZOzs0QkFGckI7O1NBa0JhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBWaWV3Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtdGV4dGFyZWEnLFxuICB0ZW1wbGF0ZTogYDxkaXZcbiAgY2xhc3M9XCJ0ZXh0YXJlYVwiXG4gIChtb3VzZXVwKT1cImhhbmRsZVNlbGVjdGlvbigkZXZlbnQpXCJcbiAgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiXG4gIFtpbm5lckh0bWxdPVwiY29udGVudCB8IHNhZmVIdG1sXCJcbiAgKGlucHV0KT1cIiRldmVudC50YXJnZXQuaW5uZXJIdG1sXCJcbiAgKGJsdXIpPVwiaGFuZGxlQmx1cigkZXZlbnQpXCJcbj48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AudGV4dGFyZWF7aGVpZ2h0OjI1MHB4O292ZXJmbG93OmF1dG87YmFja2dyb3VuZC1jb2xvcjojZjFmMWYxO3BhZGRpbmc6MjBweDtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTtib3JkZXItcmFkaXVzOjJweDtsaW5lLWhlaWdodDoyZW19LnRleHRhcmVhOmZvY3Vze291dGxpbmU6MH1gXVxufSlcblxuZXhwb3J0IGNsYXNzIFRleHRhcmVhQ29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0IHtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSwgcHJpdmF0ZSBzYW5pdGl6ZXI6IERvbVNhbml0aXplcikgeyB9XG4gIGNvbnRlbnQgPSAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gVml2YW11cyBzaXQgYW1ldCBmYWNpbGlzaXMgZHVpLCBhIGZpbmlidXMgZHVpLiBEb25lYyBkaWduaXNzaW0sIGp1c3RvIGF0IHBsYWNlcmF0IG1heGltdXMsIHVybmEgdHVycGlzIHZpdmVycmEgdXJuYSwgYXQgaGVuZHJlcml0IGR1aSBzZW0gc2VkIHF1YW0uIERvbmVjIHRpbmNpZHVudCBtYWduYSBxdWlzIHRvcnRvciBkaWduaXNzaW0sIGF0IGNvbmRpbWVudHVtIHR1cnBpcyBsYWNpbmlhLiBBZW5lYW4gaWQgdHVycGlzIHNpdCBhbWV0IGxhY3VzIHNlbXBlciBzb2xsaWNpdHVkaW4uIE51bGxhbSBncmF2aWRhIGVyYXQgdml0YWUgcG9zdWVyZSBzYWdpdHRpcy4gVmVzdGlidWx1bSBhbnRlIGlwc3VtIHByaW1pcyBpbiBmYXVjaWJ1cyBvcmNpIGx1Y3R1cyBldCB1bHRyaWNlcyBwb3N1ZXJlIGN1YmlsaWEgQ3VyYWU7IEFsaXF1YW0gZXJhdCB2b2x1dHBhdC4gRnVzY2UgbmVjIHNhcGllbiBzYWdpdHRpcywgdGluY2lkdW50IHRvcnRvciBxdWlzLCB1bHRyaWNpZXMgbWFnbmEuIE51bGxhbSBudWxsYSBlcmF0LCBsYW9yZWV0IG5vbiBuZXF1ZSBldCwgYmliZW5kdW0gb3JuYXJlIG5pc2wuIEFsaXF1YW0gbmlzbCBtYXNzYSwgbG9ib3J0aXMgbm9uIG1ldHVzIHF1aXMsIGhlbmRyZXJpdCBydXRydW0gZW5pbS4gTnVsbGFtIGluIGxvcmVtIHV0IGRpYW0gdmFyaXVzIHJ1dHJ1bSBlZ2V0IGNvbnNlY3RldHVyIGVzdC4gQWxpcXVhbSBxdWlzIHZlbGl0IGlhY3VsaXMsIHZlaGljdWxhIGxlY3R1cyBhLCBpbXBlcmRpZXQgYXJjdS4gSW4gc29kYWxlcyBkb2xvciBldSBlcmF0IHRpbmNpZHVudCwgZXQgY3Vyc3VzIGR1aSB2ZXN0aWJ1bHVtLiBWZXN0aWJ1bHVtIGFudGUgaXBzdW0gcHJpbWlzIGluIGZhdWNpYnVzIG9yY2kgbHVjdHVzIGV0IHVsdHJpY2VzIHBvc3VlcmUgY3ViaWxpYSBDdXJhZTsgUGhhc2VsbHVzIHNlZCBjb25ndWUgdGVsbHVzLiBRdWlzcXVlIHB1bHZpbmFyIGZlbGlzIGFsaXF1YW0gbnVuYyB1bHRyaWNlcyB1bGxhbWNvcnBlci4gUHJvaW4gZWdldCBsYWN1cyBhdCBtYXNzYSB1bGxhbWNvcnBlciBzdXNjaXBpdC4gU2VkIGJpYmVuZHVtIHB1cnVzIGxvcmVtLCBhdCBvcm5hcmUgZXN0IGFsaXF1ZXQgZGljdHVtLiBOdWxsYSBlbGVpZmVuZCBlcm9zIGNvbmd1ZSBudWxsYSBsdWN0dXMgYXVjdG9yLiBEb25lYyBtYWxlc3VhZGEgY29uc2VjdGV0dXIgdmVzdGlidWx1bS4gU3VzcGVuZGlzc2UgdXQgbmVxdWUgYWMgcmlzdXMgZWxlaWZlbmQgdGVtcHVzIHNpdCBhbWV0IHF1aXMgdHVycGlzLiBQcmFlc2VudCB0aW5jaWR1bnQgYmliZW5kdW0gZWdlc3Rhcy4gSW50ZWdlciBwb3J0YSBhY2N1bXNhbiBtZXR1cywgbmVjIGZpbmlidXMganVzdG8gZmVybWVudHVtIGFjLiBOdWxsYSBmYWNpbGlzaS4gUGVsbGVudGVzcXVlIGVyYXQgYXVndWUsIGNvbmd1ZSBuZWMgZXN0IGFjLCBiaWJlbmR1bSBjb25ndWUgbGliZXJvLiBNYWVjZW5hcyB2ZW5lbmF0aXMgdmVsIGxhY3VzIGluIG1vbGxpcy4gVXQgc29sbGljaXR1ZGluIHZlbCBpcHN1bSBzaXQgYW1ldCBhbGlxdWV0LiBEb25lYyB0aW5jaWR1bnQgdGVtcHVzIGVzdCBhIG1hbGVzdWFkYS4nO1xuICBzZWxlY3Rpb24gPSAnJztcbiAgcG9zaXRpb247XG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZShldmVudCA9PiB7XG5cbiAgICAgIHN3aXRjaCAoZXZlbnQub3JpZ2luKSB7XG5cbiAgICAgICAgY2FzZSAoJ21hcmtlcicpOlxuICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGlvbikge1xuICAgICAgICAgICAgdGhpcy5jb250ZW50ID0gdGhpcy5yZXBsYWNlQXQodGhpcy5jb250ZW50LCB0aGlzLnBvc2l0aW9uLCBgPHNwYW4gc3R5bGU9XCJiYWNrZ3JvdW5kLWNvbG9yOiAke2V2ZW50LmNvbG9yfTtcIj4ke3RoaXMuc2VsZWN0aW9ufTwvc3Bhbj5gKTtcbiAgICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgKCd0ZXh0YXJlYScpOlxuICAgICAgICAgIHRoaXMuc2VsZWN0aW9uID0gZXZlbnQuc2VsZWN0aW9uLnRvU3RyaW5nKCk7XG4gICAgICAgICAgdGhpcy5wb3NpdGlvbiA9IHtzdGFydHM6IGV2ZW50LnNlbGVjdGlvbi5hbmNob3JPZmZzZXQsIGVuZHM6IGV2ZW50LnNlbGVjdGlvbi5mb2N1c09mZnNldH07XG4gICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cblxuICBoYW5kbGVTZWxlY3Rpb24oJGV2ZW50OiBNb3VzZUV2ZW50KSB7XG5cbiAgICBjb25zdCBzZWxlY3Rpb246IFNlbGVjdGlvbiA9ICRldmVudC52aWV3LmdldFNlbGVjdGlvbigpO1xuXG4gICAgaWYgKHNlbGVjdGlvbi50eXBlID09PSAnUmFuZ2UnKSB7XG4gICAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7XG4gICAgICAgICAgb3JpZ2luOiAndGV4dGFyZWEnLFxuICAgICAgICAgIHR5cGU6ICdzZWxlY3Rpb24nLFxuICAgICAgICAgIG1vdXNlRXZlbnQ6ICRldmVudCxcbiAgICAgICAgICBzZWxlY3Rpb246IHNlbGVjdGlvbixcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlQmx1cigkZXZlbnQpIHtcbiAgICB0aGlzLmNvbnRlbnQgPSAkZXZlbnQudGFyZ2V0LmlubmVySFRNTDtcbiAgfVxuXG4gIHJlcGxhY2VBdChzdHJpbmcsIHBvc2l0aW9uLCByZXBsYWNlKSB7XG4gICAgY29uc3QgbGVuZ3RoID0gcG9zaXRpb24uZW5kcyAtIHBvc2l0aW9uLnN0YXJ0cztcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZygwLCBwb3NpdGlvbi5zdGFydHMpICsgcmVwbGFjZSArIHN0cmluZy5zdWJzdHJpbmcocG9zaXRpb24uZW5kcyk7XG4gIH1cblxufVxuXG5cbiJdfQ==