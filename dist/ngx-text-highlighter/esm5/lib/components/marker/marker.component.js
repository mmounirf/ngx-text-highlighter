/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { EventsService } from '../../services/events.service';
var MarkerComponent = /** @class */ (function () {
    function MarkerComponent(events) {
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
    MarkerComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.events.listen().subscribe(function (event) {
            // Event from textarea regarding text selection and marker style is set to float
            if (event.origin === 'textarea' && event.type === 'selection' && _this.markerStyle === 'float') {
                /** @type {?} */
                var markerWidth = window.getComputedStyle(_this.floatingMarker.nativeElement).width;
                /** @type {?} */
                var selectionWidth = event.value.getRangeAt(0).getBoundingClientRect().width;
                /** @type {?} */
                var xCenter = (parseInt(markerWidth, 0) - selectionWidth) / 2;
                _this.positionX = event.value.getRangeAt(0).getBoundingClientRect().left - xCenter;
                // 64px = 4em (double the line height)
                // 64px = 4em (double the line height)
                _this.positionY = event.value.getRangeAt(0).getBoundingClientRect().top - 64;
                // Let's show our floating marker
                // Let's show our floating marker
                _this.visibility = 'visible';
            }
            // Event from textarea regarding losing focus and marker style is set to float
            if (event.origin === 'textarea' && event.type === 'blur' && _this.markerStyle === 'float') {
                // Let's hide our floating marker
                // Let's hide our floating marker
                _this.visibility = 'hidden';
            }
        });
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
        { type: Component, args: [{
                    selector: 'th-marker',
                    template: "<div class=\"fixed colors\" *ngIf=\"markerStyle === 'fixed'\">\n  <div class=\"color\" *ngFor=\"let color of colors\" [ngStyle]=\"{'background-color': color}\" (click)=\"mark(color)\"></div>\n</div>\n\n<div #floatingMarker class=\"floating colors\" *ngIf=\"markerStyle === 'float'\" [ngStyle]=\"{'left': positionX+'px', 'top': positionY+'px', 'visibility': visibility}\">\n    <div class=\"color\" *ngFor=\"let color of colors\" [ngStyle]=\"{'background-color': color}\" (click)=\"mark(color)\"></div>\n</div>\n",
                    styles: [".colors.fixed{width:100%;display:flex;flex-wrap:wrap}.fixed>.color{width:30px;height:30px;margin:0 10px 10px 0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:.3s cubic-bezier(.25,.8,.25,1)}.fixed>.color:hover{border-radius:50%;box-shadow:0 10px 10px rgba(0,0,0,.25),0 5px 5px rgba(0,0,0,.22)}.colors.floating{position:absolute;width:auto;background-color:#404040;border-radius:2px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:top .3s cubic-bezier(.25,.8,.25,1);display:flex}.floating>.color{margin:10px;cursor:pointer;width:30px;height:30px;transition:top .3s cubic-bezier(.25,.8,.25,1),border-radius .3s cubic-bezier(.25,.8,.25,1);z-index:10}.floating>.color:hover{border-radius:50%}.floating.colors:after{content:'';display:block;position:absolute;background-color:#404040;width:20px;height:20px;bottom:-5px;left:calc(50% - 10px);-webkit-transform:rotate(45deg);transform:rotate(45deg);z-index:1}"]
                },] },
    ];
    /** @nocollapse */
    MarkerComponent.ctorParameters = function () { return [
        { type: EventsService }
    ]; };
    MarkerComponent.propDecorators = {
        markerStyle: [{ type: Input, args: ['markerStyle',] }],
        floatingMarker: [{ type: ViewChild, args: ['floatingMarker',] }]
    };
    return MarkerComponent;
}());
export { MarkerComponent };
if (false) {
    /** @type {?} */
    MarkerComponent.prototype.colors;
    /** @type {?} */
    MarkerComponent.prototype.positionX;
    /** @type {?} */
    MarkerComponent.prototype.positionY;
    /** @type {?} */
    MarkerComponent.prototype.visibility;
    /** @type {?} */
    MarkerComponent.prototype.markerStyle;
    /** @type {?} */
    MarkerComponent.prototype.floatingMarker;
    /** @type {?} */
    MarkerComponent.prototype.events;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7O0lBcUI1RCx5QkFBc0IsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTtzQkFObEMsQ0FBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLFNBQVMsQ0FBQzt5QkFDOUIsQ0FBQzt5QkFDRCxDQUFDOzBCQUNBLFFBQVE7MkJBQ2UsT0FBTztLQUVLOzs7O0lBRWhELGtDQUFROzs7SUFBUjtRQUFBLGlCQXlCQztRQXhCQyxJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxVQUFDLEtBQUs7O1lBRW5DLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLEtBQUksQ0FBQyxXQUFXLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQzs7Z0JBRTlGLElBQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7Z0JBRXJGLElBQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDOztnQkFDL0UsSUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFHaEUsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7O2dCQUVsRixBQURBLHNDQUFzQztnQkFDdEMsS0FBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUM7O2dCQUc1RSxBQURBLGlDQUFpQztnQkFDakMsS0FBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7YUFDN0I7O1lBR0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksS0FBSSxDQUFDLFdBQVcsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDOztnQkFFekYsQUFEQSxpQ0FBaUM7Z0JBQ2pDLEtBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsOEJBQUk7Ozs7SUFBSixVQUFLLEtBQUs7UUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNuQixNQUFNLEVBQUUsUUFBUTtZQUNoQixJQUFJLEVBQUUsV0FBVztZQUNqQixLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQztLQUNKOztnQkF0REYsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsaWdCQU9YO29CQUNDLE1BQU0sRUFBRSxDQUFDLDI4QkFBMjhCLENBQUM7aUJBQ3Q5Qjs7OztnQkFiUSxhQUFhOzs7OEJBbUJuQixLQUFLLFNBQUMsYUFBYTtpQ0FDbkIsU0FBUyxTQUFDLGdCQUFnQjs7MEJBckI3Qjs7U0FlYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBPbkluaXQsIElucHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLW1hcmtlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImZpeGVkIGNvbG9yc1wiICpuZ0lmPVwibWFya2VyU3R5bGUgPT09ICdmaXhlZCdcIj5cbiAgPGRpdiBjbGFzcz1cImNvbG9yXCIgKm5nRm9yPVwibGV0IGNvbG9yIG9mIGNvbG9yc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9yfVwiIChjbGljayk9XCJtYXJrKGNvbG9yKVwiPjwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgI2Zsb2F0aW5nTWFya2VyIGNsYXNzPVwiZmxvYXRpbmcgY29sb3JzXCIgKm5nSWY9XCJtYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0J1wiIFtuZ1N0eWxlXT1cInsnbGVmdCc6IHBvc2l0aW9uWCsncHgnLCAndG9wJzogcG9zaXRpb25ZKydweCcsICd2aXNpYmlsaXR5JzogdmlzaWJpbGl0eX1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sb3JcIiAqbmdGb3I9XCJsZXQgY29sb3Igb2YgY29sb3JzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3J9XCIgKGNsaWNrKT1cIm1hcmsoY29sb3IpXCI+PC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuY29sb3JzLmZpeGVke3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwfS5maXhlZD4uY29sb3J7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDttYXJnaW46MCAxMHB4IDEwcHggMDtjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTt0cmFuc2l0aW9uOi4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKX0uZml4ZWQ+LmNvbG9yOmhvdmVye2JvcmRlci1yYWRpdXM6NTAlO2JveC1zaGFkb3c6MCAxMHB4IDEwcHggcmdiYSgwLDAsMCwuMjUpLDAgNXB4IDVweCByZ2JhKDAsMCwwLC4yMil9LmNvbG9ycy5mbG9hdGluZ3twb3NpdGlvbjphYnNvbHV0ZTt3aWR0aDphdXRvO2JhY2tncm91bmQtY29sb3I6IzQwNDA0MDtib3JkZXItcmFkaXVzOjJweDtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTt0cmFuc2l0aW9uOnRvcCAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7ZGlzcGxheTpmbGV4fS5mbG9hdGluZz4uY29sb3J7bWFyZ2luOjEwcHg7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDt0cmFuc2l0aW9uOnRvcCAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSksYm9yZGVyLXJhZGl1cyAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7ei1pbmRleDoxMH0uZmxvYXRpbmc+LmNvbG9yOmhvdmVye2JvcmRlci1yYWRpdXM6NTAlfS5mbG9hdGluZy5jb2xvcnM6YWZ0ZXJ7Y29udGVudDonJztkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6IzQwNDA0MDt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O2JvdHRvbTotNXB4O2xlZnQ6Y2FsYyg1MCUgLSAxMHB4KTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3otaW5kZXg6MX1gXVxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQge1xuICBjb2xvcnMgPSBbJyNmNDQzMzYnLCAnI2ZmZWIzYicsICcjNGNhZjUwJ107XG4gIHBvc2l0aW9uWCA9IDA7XG4gIHBvc2l0aW9uWSA9IDA7XG4gIHZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgQElucHV0KCdtYXJrZXJTdHlsZScpIG1hcmtlclN0eWxlID0gJ2ZpeGVkJztcbiAgQFZpZXdDaGlsZCgnZmxvYXRpbmdNYXJrZXInKSBmbG9hdGluZ01hcmtlcjogYW55O1xuICBjb25zdHJ1Y3Rvcihwcm90ZWN0ZWQgZXZlbnRzOiBFdmVudHNTZXJ2aWNlKSB7IH1cblxuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmV2ZW50cy5saXN0ZW4oKS5zdWJzY3JpYmUoKGV2ZW50KSA9PiB7XG4gICAgICAvLyBFdmVudCBmcm9tIHRleHRhcmVhIHJlZ2FyZGluZyB0ZXh0IHNlbGVjdGlvbiBhbmQgbWFya2VyIHN0eWxlIGlzIHNldCB0byBmbG9hdFxuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ3RleHRhcmVhJyAmJiBldmVudC50eXBlID09PSAnc2VsZWN0aW9uJyAmJiB0aGlzLm1hcmtlclN0eWxlID09PSAnZmxvYXQnKSB7XG4gICAgICAgIC8vIE91ciBtYWtlciB3aWR0aCBpcyBhdXRvIChUT0RPOiBjb2xvcnMgY2FuIGJlIGFkZGVkIGFzIGFuIGlucHV0KSwgbGV0J3MgZ2V0IGl0cyBjb21wdXRlZCB3aWR0aFxuICAgICAgICBjb25zdCBtYXJrZXJXaWR0aCA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHRoaXMuZmxvYXRpbmdNYXJrZXIubmF0aXZlRWxlbWVudCkud2lkdGg7XG4gICAgICAgIC8vIFNlbGVjdGlvbiB3aWR0aCBhbmQgaGVpZ2h0IGZyb20gcmFuZ2UgYm91bmRpbmcgcmVjdGFuZ2xlXG4gICAgICAgIGNvbnN0IHNlbGVjdGlvbldpZHRoID0gZXZlbnQudmFsdWUuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aDtcbiAgICAgICAgY29uc3QgeENlbnRlciA9IChwYXJzZUludChtYXJrZXJXaWR0aCwgMCkgLSBzZWxlY3Rpb25XaWR0aCkgLyAyO1xuXG5cbiAgICAgICAgdGhpcy5wb3NpdGlvblggPSBldmVudC52YWx1ZS5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSB4Q2VudGVyO1xuICAgICAgICAvLyA2NHB4ID0gNGVtIChkb3VibGUgdGhlIGxpbmUgaGVpZ2h0KVxuICAgICAgICB0aGlzLnBvc2l0aW9uWSA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gNjQ7XG5cbiAgICAgICAgLy8gTGV0J3Mgc2hvdyBvdXIgZmxvYXRpbmcgbWFya2VyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgIH1cblxuICAgICAgLy8gRXZlbnQgZnJvbSB0ZXh0YXJlYSByZWdhcmRpbmcgbG9zaW5nIGZvY3VzIGFuZCBtYXJrZXIgc3R5bGUgaXMgc2V0IHRvIGZsb2F0XG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAndGV4dGFyZWEnICYmIGV2ZW50LnR5cGUgPT09ICdibHVyJyAmJiB0aGlzLm1hcmtlclN0eWxlID09PSAnZmxvYXQnKSB7XG4gICAgICAgIC8vIExldCdzIGhpZGUgb3VyIGZsb2F0aW5nIG1hcmtlclxuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG1hcmsoY29sb3IpIHtcbiAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7XG4gICAgICBvcmlnaW46ICdtYXJrZXInLFxuICAgICAgdHlwZTogJ2hpZ2hsaWdodCcsXG4gICAgICBjb2xvcjogY29sb3JcbiAgICB9KTtcbiAgfVxuXG59XG4iXX0=