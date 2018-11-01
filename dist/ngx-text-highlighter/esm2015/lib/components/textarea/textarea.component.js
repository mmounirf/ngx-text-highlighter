/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component } from '@angular/core';
import { EventsService } from '../../services/events.service';
import { DomSanitizer } from '@angular/platform-browser';
export class TextareaComponent {
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
        /** @type {?} */
        const length = position.ends - position.starts;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWlDLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFnQnpELE1BQU07Ozs7O0lBQ0osWUFBc0IsTUFBcUIsRUFBVSxTQUF1QjtRQUF0RCxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYzt1QkFDbEUsK2tEQUEra0Q7eUJBQzdrRCxFQUFFO0tBRm1FOzs7O0lBSWpGLFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUVyQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFFckIsS0FBSyxDQUFDLFFBQVEsQ0FBQztvQkFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxrQ0FBa0MsS0FBSyxDQUFDLEtBQUssTUFBTSxJQUFJLENBQUMsU0FBUyxTQUFTLENBQUMsQ0FBQztxQkFDeEk7b0JBQ0gsS0FBSyxDQUFDO2dCQUVOLEtBQUssQ0FBQyxVQUFVLENBQUM7b0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBQyxDQUFDO29CQUM1RixLQUFLLENBQUM7Z0JBRU47b0JBQ0EsS0FBSyxDQUFDO2FBQ1A7U0FDRixDQUFDLENBQUM7S0FDSjs7Ozs7SUFHRCxlQUFlLENBQUMsTUFBa0I7O1FBRWhDLE1BQU0sU0FBUyxHQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFeEQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUNqQixNQUFNLEVBQUUsVUFBVTtnQkFDbEIsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixTQUFTLEVBQUUsU0FBUzthQUNyQixDQUFDLENBQUM7U0FDTjtLQUNGOzs7OztJQUVELFVBQVUsQ0FBQyxNQUFNO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUN4Qzs7Ozs7OztJQUVELFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU87O1FBQ2pDLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQztRQUMvQyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN6Rjs7O1lBL0RGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFOzs7Ozs7OztDQVFYO2dCQUNDLE1BQU0sRUFBRSxDQUFDLHdNQUF3TSxDQUFDO2FBQ25OOzs7O1lBZlEsYUFBYTtZQUNiLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgVmlld0NoaWxkLCBFbGVtZW50UmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuaW1wb3J0IHsgRG9tU2FuaXRpemVyIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLXRleHRhcmVhJyxcbiAgdGVtcGxhdGU6IGA8ZGl2XG4gIGNsYXNzPVwidGV4dGFyZWFcIlxuICAobW91c2V1cCk9XCJoYW5kbGVTZWxlY3Rpb24oJGV2ZW50KVwiXG4gIGNvbnRlbnRlZGl0YWJsZT1cInRydWVcIlxuICBbaW5uZXJIdG1sXT1cImNvbnRlbnQgfCBzYWZlSHRtbFwiXG4gIChpbnB1dCk9XCIkZXZlbnQudGFyZ2V0LmlubmVySHRtbFwiXG4gIChibHVyKT1cImhhbmRsZUJsdXIoJGV2ZW50KVwiXG4+PC9kaXY+XG5gLFxuICBzdHlsZXM6IFtgLnRleHRhcmVhe2hlaWdodDoyNTBweDtvdmVyZmxvdzphdXRvO2JhY2tncm91bmQtY29sb3I6I2YxZjFmMTtwYWRkaW5nOjIwcHg7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMTIpLDAgMXB4IDJweCByZ2JhKDAsMCwwLC4yNCk7Ym9yZGVyLXJhZGl1czoycHg7bGluZS1oZWlnaHQ6MmVtfS50ZXh0YXJlYTpmb2N1c3tvdXRsaW5lOjB9YF1cbn0pXG5cbmV4cG9ydCBjbGFzcyBUZXh0YXJlYUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UsIHByaXZhdGUgc2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHsgfVxuICBjb250ZW50ID0gJ0xvcmVtIGlwc3VtIGRvbG9yIHNpdCBhbWV0LCBjb25zZWN0ZXR1ciBhZGlwaXNjaW5nIGVsaXQuIFZpdmFtdXMgc2l0IGFtZXQgZmFjaWxpc2lzIGR1aSwgYSBmaW5pYnVzIGR1aS4gRG9uZWMgZGlnbmlzc2ltLCBqdXN0byBhdCBwbGFjZXJhdCBtYXhpbXVzLCB1cm5hIHR1cnBpcyB2aXZlcnJhIHVybmEsIGF0IGhlbmRyZXJpdCBkdWkgc2VtIHNlZCBxdWFtLiBEb25lYyB0aW5jaWR1bnQgbWFnbmEgcXVpcyB0b3J0b3IgZGlnbmlzc2ltLCBhdCBjb25kaW1lbnR1bSB0dXJwaXMgbGFjaW5pYS4gQWVuZWFuIGlkIHR1cnBpcyBzaXQgYW1ldCBsYWN1cyBzZW1wZXIgc29sbGljaXR1ZGluLiBOdWxsYW0gZ3JhdmlkYSBlcmF0IHZpdGFlIHBvc3VlcmUgc2FnaXR0aXMuIFZlc3RpYnVsdW0gYW50ZSBpcHN1bSBwcmltaXMgaW4gZmF1Y2lidXMgb3JjaSBsdWN0dXMgZXQgdWx0cmljZXMgcG9zdWVyZSBjdWJpbGlhIEN1cmFlOyBBbGlxdWFtIGVyYXQgdm9sdXRwYXQuIEZ1c2NlIG5lYyBzYXBpZW4gc2FnaXR0aXMsIHRpbmNpZHVudCB0b3J0b3IgcXVpcywgdWx0cmljaWVzIG1hZ25hLiBOdWxsYW0gbnVsbGEgZXJhdCwgbGFvcmVldCBub24gbmVxdWUgZXQsIGJpYmVuZHVtIG9ybmFyZSBuaXNsLiBBbGlxdWFtIG5pc2wgbWFzc2EsIGxvYm9ydGlzIG5vbiBtZXR1cyBxdWlzLCBoZW5kcmVyaXQgcnV0cnVtIGVuaW0uIE51bGxhbSBpbiBsb3JlbSB1dCBkaWFtIHZhcml1cyBydXRydW0gZWdldCBjb25zZWN0ZXR1ciBlc3QuIEFsaXF1YW0gcXVpcyB2ZWxpdCBpYWN1bGlzLCB2ZWhpY3VsYSBsZWN0dXMgYSwgaW1wZXJkaWV0IGFyY3UuIEluIHNvZGFsZXMgZG9sb3IgZXUgZXJhdCB0aW5jaWR1bnQsIGV0IGN1cnN1cyBkdWkgdmVzdGlidWx1bS4gVmVzdGlidWx1bSBhbnRlIGlwc3VtIHByaW1pcyBpbiBmYXVjaWJ1cyBvcmNpIGx1Y3R1cyBldCB1bHRyaWNlcyBwb3N1ZXJlIGN1YmlsaWEgQ3VyYWU7IFBoYXNlbGx1cyBzZWQgY29uZ3VlIHRlbGx1cy4gUXVpc3F1ZSBwdWx2aW5hciBmZWxpcyBhbGlxdWFtIG51bmMgdWx0cmljZXMgdWxsYW1jb3JwZXIuIFByb2luIGVnZXQgbGFjdXMgYXQgbWFzc2EgdWxsYW1jb3JwZXIgc3VzY2lwaXQuIFNlZCBiaWJlbmR1bSBwdXJ1cyBsb3JlbSwgYXQgb3JuYXJlIGVzdCBhbGlxdWV0IGRpY3R1bS4gTnVsbGEgZWxlaWZlbmQgZXJvcyBjb25ndWUgbnVsbGEgbHVjdHVzIGF1Y3Rvci4gRG9uZWMgbWFsZXN1YWRhIGNvbnNlY3RldHVyIHZlc3RpYnVsdW0uIFN1c3BlbmRpc3NlIHV0IG5lcXVlIGFjIHJpc3VzIGVsZWlmZW5kIHRlbXB1cyBzaXQgYW1ldCBxdWlzIHR1cnBpcy4gUHJhZXNlbnQgdGluY2lkdW50IGJpYmVuZHVtIGVnZXN0YXMuIEludGVnZXIgcG9ydGEgYWNjdW1zYW4gbWV0dXMsIG5lYyBmaW5pYnVzIGp1c3RvIGZlcm1lbnR1bSBhYy4gTnVsbGEgZmFjaWxpc2kuIFBlbGxlbnRlc3F1ZSBlcmF0IGF1Z3VlLCBjb25ndWUgbmVjIGVzdCBhYywgYmliZW5kdW0gY29uZ3VlIGxpYmVyby4gTWFlY2VuYXMgdmVuZW5hdGlzIHZlbCBsYWN1cyBpbiBtb2xsaXMuIFV0IHNvbGxpY2l0dWRpbiB2ZWwgaXBzdW0gc2l0IGFtZXQgYWxpcXVldC4gRG9uZWMgdGluY2lkdW50IHRlbXB1cyBlc3QgYSBtYWxlc3VhZGEuJztcbiAgc2VsZWN0aW9uID0gJyc7XG4gIHBvc2l0aW9uO1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoZXZlbnQgPT4ge1xuXG4gICAgICBzd2l0Y2ggKGV2ZW50Lm9yaWdpbikge1xuXG4gICAgICAgIGNhc2UgKCdtYXJrZXInKTpcbiAgICAgICAgICBpZiAodGhpcy5zZWxlY3Rpb24pIHtcbiAgICAgICAgICAgIHRoaXMuY29udGVudCA9IHRoaXMucmVwbGFjZUF0KHRoaXMuY29udGVudCwgdGhpcy5wb3NpdGlvbiwgYDxzcGFuIHN0eWxlPVwiYmFja2dyb3VuZC1jb2xvcjogJHtldmVudC5jb2xvcn07XCI+JHt0aGlzLnNlbGVjdGlvbn08L3NwYW4+YCk7XG4gICAgICAgICAgfVxuICAgICAgICBicmVhaztcblxuICAgICAgICBjYXNlICgndGV4dGFyZWEnKTpcbiAgICAgICAgICB0aGlzLnNlbGVjdGlvbiA9IGV2ZW50LnNlbGVjdGlvbi50b1N0cmluZygpO1xuICAgICAgICAgIHRoaXMucG9zaXRpb24gPSB7c3RhcnRzOiBldmVudC5zZWxlY3Rpb24uYW5jaG9yT2Zmc2V0LCBlbmRzOiBldmVudC5zZWxlY3Rpb24uZm9jdXNPZmZzZXR9O1xuICAgICAgICBicmVhaztcblxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG5cbiAgaGFuZGxlU2VsZWN0aW9uKCRldmVudDogTW91c2VFdmVudCkge1xuXG4gICAgY29uc3Qgc2VsZWN0aW9uOiBTZWxlY3Rpb24gPSAkZXZlbnQudmlldy5nZXRTZWxlY3Rpb24oKTtcblxuICAgIGlmIChzZWxlY3Rpb24udHlwZSA9PT0gJ1JhbmdlJykge1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe1xuICAgICAgICAgIG9yaWdpbjogJ3RleHRhcmVhJyxcbiAgICAgICAgICB0eXBlOiAnc2VsZWN0aW9uJyxcbiAgICAgICAgICBtb3VzZUV2ZW50OiAkZXZlbnQsXG4gICAgICAgICAgc2VsZWN0aW9uOiBzZWxlY3Rpb24sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5jb250ZW50ID0gJGV2ZW50LnRhcmdldC5pbm5lckhUTUw7XG4gIH1cblxuICByZXBsYWNlQXQoc3RyaW5nLCBwb3NpdGlvbiwgcmVwbGFjZSkge1xuICAgIGNvbnN0IGxlbmd0aCA9IHBvc2l0aW9uLmVuZHMgLSBwb3NpdGlvbi5zdGFydHM7XG4gICAgcmV0dXJuIHN0cmluZy5zdWJzdHJpbmcoMCwgcG9zaXRpb24uc3RhcnRzKSArIHJlcGxhY2UgKyBzdHJpbmcuc3Vic3RyaW5nKHBvc2l0aW9uLmVuZHMpO1xuICB9XG5cbn1cblxuXG4iXX0=