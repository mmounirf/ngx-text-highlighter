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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dGFyZWEuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy90ZXh0YXJlYS90ZXh0YXJlYS5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQWlDLE1BQU0sZUFBZSxDQUFDO0FBQ3pFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFnQnpELE1BQU07Ozs7O0lBQ0osWUFBc0IsTUFBcUIsRUFBVSxTQUF1QjtRQUF0RCxXQUFNLEdBQU4sTUFBTSxDQUFlO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBYzt1QkFDbEUsK2tEQUEra0Q7eUJBQzdrRCxFQUFFO0tBRm1FOzs7O0lBSWpGLFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUVyQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztnQkFFckIsS0FBSyxDQUFDLFFBQVEsQ0FBQztvQkFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzt3QkFDbkIsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxrQ0FBa0MsS0FBSyxDQUFDLEtBQUssTUFBTSxJQUFJLENBQUMsU0FBUyxTQUFTLENBQUMsQ0FBQztxQkFDeEk7b0JBQ0gsS0FBSyxDQUFDO2dCQUVOLEtBQUssQ0FBQyxVQUFVLENBQUM7b0JBQ2YsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO29CQUM1QyxJQUFJLENBQUMsUUFBUSxHQUFHLEVBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQVcsRUFBQyxDQUFDO29CQUM1RixLQUFLLENBQUM7Z0JBRU47b0JBQ0EsS0FBSyxDQUFDO2FBQ1A7U0FDRixDQUFDLENBQUM7S0FDSjs7Ozs7SUFHRCxlQUFlLENBQUMsTUFBa0I7O1FBQ2hDLE1BQU0sU0FBUyxHQUFjLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDeEQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUNqQixNQUFNLEVBQUUsVUFBVTtnQkFDbEIsSUFBSSxFQUFFLFdBQVc7Z0JBQ2pCLFVBQVUsRUFBRSxNQUFNO2dCQUNsQixTQUFTLEVBQUUsU0FBUzthQUNyQixDQUFDLENBQUM7U0FDTjtLQUNGOzs7OztJQUVELFVBQVUsQ0FBQyxNQUFNO1FBQ2YsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQztLQUN4Qzs7Ozs7OztJQUdELFNBQVMsQ0FBQyxNQUFNLEVBQUUsUUFBUSxFQUFFLE9BQU87UUFDakMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekY7OztZQTdERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7Q0FRWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyx3TUFBd00sQ0FBQzthQUNuTjs7OztZQWZRLGFBQWE7WUFDYixZQUFZIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIFZpZXdDaGlsZCwgRWxlbWVudFJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcbmltcG9ydCB7IERvbVNhbml0aXplciB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC10ZXh0YXJlYScsXG4gIHRlbXBsYXRlOiBgPGRpdlxuICBjbGFzcz1cInRleHRhcmVhXCJcbiAgKG1vdXNldXApPVwiaGFuZGxlU2VsZWN0aW9uKCRldmVudClcIlxuICBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCJcbiAgW2lubmVySHRtbF09XCJjb250ZW50IHwgc2FmZUh0bWxcIlxuICAoaW5wdXQpPVwiJGV2ZW50LnRhcmdldC5pbm5lckh0bWxcIlxuICAoYmx1cik9XCJoYW5kbGVCbHVyKCRldmVudClcIlxuPjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC50ZXh0YXJlYXtoZWlnaHQ6MjUwcHg7b3ZlcmZsb3c6YXV0bztiYWNrZ3JvdW5kLWNvbG9yOiNmMWYxZjE7cGFkZGluZzoyMHB4O2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO2JvcmRlci1yYWRpdXM6MnB4O2xpbmUtaGVpZ2h0OjJlbX0udGV4dGFyZWE6Zm9jdXN7b3V0bGluZTowfWBdXG59KVxuXG5leHBvcnQgY2xhc3MgVGV4dGFyZWFDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlLCBwcml2YXRlIHNhbml0aXplcjogRG9tU2FuaXRpemVyKSB7IH1cbiAgY29udGVudCA9ICdMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBWaXZhbXVzIHNpdCBhbWV0IGZhY2lsaXNpcyBkdWksIGEgZmluaWJ1cyBkdWkuIERvbmVjIGRpZ25pc3NpbSwganVzdG8gYXQgcGxhY2VyYXQgbWF4aW11cywgdXJuYSB0dXJwaXMgdml2ZXJyYSB1cm5hLCBhdCBoZW5kcmVyaXQgZHVpIHNlbSBzZWQgcXVhbS4gRG9uZWMgdGluY2lkdW50IG1hZ25hIHF1aXMgdG9ydG9yIGRpZ25pc3NpbSwgYXQgY29uZGltZW50dW0gdHVycGlzIGxhY2luaWEuIEFlbmVhbiBpZCB0dXJwaXMgc2l0IGFtZXQgbGFjdXMgc2VtcGVyIHNvbGxpY2l0dWRpbi4gTnVsbGFtIGdyYXZpZGEgZXJhdCB2aXRhZSBwb3N1ZXJlIHNhZ2l0dGlzLiBWZXN0aWJ1bHVtIGFudGUgaXBzdW0gcHJpbWlzIGluIGZhdWNpYnVzIG9yY2kgbHVjdHVzIGV0IHVsdHJpY2VzIHBvc3VlcmUgY3ViaWxpYSBDdXJhZTsgQWxpcXVhbSBlcmF0IHZvbHV0cGF0LiBGdXNjZSBuZWMgc2FwaWVuIHNhZ2l0dGlzLCB0aW5jaWR1bnQgdG9ydG9yIHF1aXMsIHVsdHJpY2llcyBtYWduYS4gTnVsbGFtIG51bGxhIGVyYXQsIGxhb3JlZXQgbm9uIG5lcXVlIGV0LCBiaWJlbmR1bSBvcm5hcmUgbmlzbC4gQWxpcXVhbSBuaXNsIG1hc3NhLCBsb2JvcnRpcyBub24gbWV0dXMgcXVpcywgaGVuZHJlcml0IHJ1dHJ1bSBlbmltLiBOdWxsYW0gaW4gbG9yZW0gdXQgZGlhbSB2YXJpdXMgcnV0cnVtIGVnZXQgY29uc2VjdGV0dXIgZXN0LiBBbGlxdWFtIHF1aXMgdmVsaXQgaWFjdWxpcywgdmVoaWN1bGEgbGVjdHVzIGEsIGltcGVyZGlldCBhcmN1LiBJbiBzb2RhbGVzIGRvbG9yIGV1IGVyYXQgdGluY2lkdW50LCBldCBjdXJzdXMgZHVpIHZlc3RpYnVsdW0uIFZlc3RpYnVsdW0gYW50ZSBpcHN1bSBwcmltaXMgaW4gZmF1Y2lidXMgb3JjaSBsdWN0dXMgZXQgdWx0cmljZXMgcG9zdWVyZSBjdWJpbGlhIEN1cmFlOyBQaGFzZWxsdXMgc2VkIGNvbmd1ZSB0ZWxsdXMuIFF1aXNxdWUgcHVsdmluYXIgZmVsaXMgYWxpcXVhbSBudW5jIHVsdHJpY2VzIHVsbGFtY29ycGVyLiBQcm9pbiBlZ2V0IGxhY3VzIGF0IG1hc3NhIHVsbGFtY29ycGVyIHN1c2NpcGl0LiBTZWQgYmliZW5kdW0gcHVydXMgbG9yZW0sIGF0IG9ybmFyZSBlc3QgYWxpcXVldCBkaWN0dW0uIE51bGxhIGVsZWlmZW5kIGVyb3MgY29uZ3VlIG51bGxhIGx1Y3R1cyBhdWN0b3IuIERvbmVjIG1hbGVzdWFkYSBjb25zZWN0ZXR1ciB2ZXN0aWJ1bHVtLiBTdXNwZW5kaXNzZSB1dCBuZXF1ZSBhYyByaXN1cyBlbGVpZmVuZCB0ZW1wdXMgc2l0IGFtZXQgcXVpcyB0dXJwaXMuIFByYWVzZW50IHRpbmNpZHVudCBiaWJlbmR1bSBlZ2VzdGFzLiBJbnRlZ2VyIHBvcnRhIGFjY3Vtc2FuIG1ldHVzLCBuZWMgZmluaWJ1cyBqdXN0byBmZXJtZW50dW0gYWMuIE51bGxhIGZhY2lsaXNpLiBQZWxsZW50ZXNxdWUgZXJhdCBhdWd1ZSwgY29uZ3VlIG5lYyBlc3QgYWMsIGJpYmVuZHVtIGNvbmd1ZSBsaWJlcm8uIE1hZWNlbmFzIHZlbmVuYXRpcyB2ZWwgbGFjdXMgaW4gbW9sbGlzLiBVdCBzb2xsaWNpdHVkaW4gdmVsIGlwc3VtIHNpdCBhbWV0IGFsaXF1ZXQuIERvbmVjIHRpbmNpZHVudCB0ZW1wdXMgZXN0IGEgbWFsZXN1YWRhLic7XG4gIHNlbGVjdGlvbiA9ICcnO1xuICBwb3NpdGlvbjtcbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKGV2ZW50ID0+IHtcblxuICAgICAgc3dpdGNoIChldmVudC5vcmlnaW4pIHtcblxuICAgICAgICBjYXNlICgnbWFya2VyJyk6XG4gICAgICAgICAgaWYgKHRoaXMuc2VsZWN0aW9uKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRlbnQgPSB0aGlzLnJlcGxhY2VBdCh0aGlzLmNvbnRlbnQsIHRoaXMucG9zaXRpb24sIGA8c3BhbiBzdHlsZT1cImJhY2tncm91bmQtY29sb3I6ICR7ZXZlbnQuY29sb3J9O1wiPiR7dGhpcy5zZWxlY3Rpb259PC9zcGFuPmApO1xuICAgICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgY2FzZSAoJ3RleHRhcmVhJyk6XG4gICAgICAgICAgdGhpcy5zZWxlY3Rpb24gPSBldmVudC5zZWxlY3Rpb24udG9TdHJpbmcoKTtcbiAgICAgICAgICB0aGlzLnBvc2l0aW9uID0ge3N0YXJ0czogZXZlbnQuc2VsZWN0aW9uLmFuY2hvck9mZnNldCwgZW5kczogZXZlbnQuc2VsZWN0aW9uLmZvY3VzT2Zmc2V0fTtcbiAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuXG4gIGhhbmRsZVNlbGVjdGlvbigkZXZlbnQ6IE1vdXNlRXZlbnQpIHtcbiAgICBjb25zdCBzZWxlY3Rpb246IFNlbGVjdGlvbiA9ICRldmVudC52aWV3LmdldFNlbGVjdGlvbigpO1xuICAgIGlmIChzZWxlY3Rpb24udHlwZSA9PT0gJ1JhbmdlJykge1xuICAgICAgdGhpcy5ldmVudHMuZGlzcGF0Y2goe1xuICAgICAgICAgIG9yaWdpbjogJ3RleHRhcmVhJyxcbiAgICAgICAgICB0eXBlOiAnc2VsZWN0aW9uJyxcbiAgICAgICAgICBtb3VzZUV2ZW50OiAkZXZlbnQsXG4gICAgICAgICAgc2VsZWN0aW9uOiBzZWxlY3Rpb24sXG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGhhbmRsZUJsdXIoJGV2ZW50KSB7XG4gICAgdGhpcy5jb250ZW50ID0gJGV2ZW50LnRhcmdldC5pbm5lckhUTUw7XG4gIH1cblxuICAvLyBSZXBsYWNlIHN0cmluZyBhdCBzcGVjaWZpYyBwb3NpdGlvbiAobmF0aXZlIHJlcGxhY2UoKSBtZXRob2Qgd2lsbCBqdXN0IHJlcGxhY2UgdGhlIGZpcnN0IG9jY3VyYW5jZSlcbiAgcmVwbGFjZUF0KHN0cmluZywgcG9zaXRpb24sIHJlcGxhY2UpIHtcbiAgICByZXR1cm4gc3RyaW5nLnN1YnN0cmluZygwLCBwb3NpdGlvbi5zdGFydHMpICsgcmVwbGFjZSArIHN0cmluZy5zdWJzdHJpbmcocG9zaXRpb24uZW5kcyk7XG4gIH1cblxufVxuXG5cbiJdfQ==