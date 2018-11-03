/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { EventsService } from '../../services/events.service';
var MarkerComponent = /** @class */ (function () {
    function MarkerComponent(events) {
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
    /**
     * @return {?}
     */
    MarkerComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.events.listen().unsubscribe();
    };
    MarkerComponent.decorators = [
        { type: Component, args: [{
                    selector: 'th-marker',
                    template: "<div class=\"fixed colors\" *ngIf=\"markerStyle === 'fixed'\">\n  <div class=\"color\" *ngFor=\"let color of colors\" [ngStyle]=\"{'background-color': color}\" (click)=\"mark(color)\"></div>\n</div>\n\n<div #floatingMarker class=\"floating colors\" *ngIf=\"markerStyle === 'float'\" [ngStyle]=\"{'left': positionX+'px', 'top': positionY+'px', 'visibility': visibility}\">\n    <div class=\"color\" *ngFor=\"let color of colors\" [ngStyle]=\"{'background-color': color}\" (click)=\"mark(color)\"></div>\n</div>\n",
                    styles: [".colors.fixed{width:100%;display:flex;flex-wrap:wrap}.fixed>.color{width:30px;height:30px;margin:0 10px 10px 0;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:.3s cubic-bezier(.25,.8,.25,1)}.fixed>.color:hover{border-radius:50%;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}.colors.floating{position:absolute;width:auto;background-color:#404040;border-radius:4px;box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12);transition:top .3s cubic-bezier(.25,.8,.25,1);display:flex}.floating>.color{margin:10px;cursor:pointer;width:30px;height:30px;transition:top .3s cubic-bezier(.25,.8,.25,1),border-radius .3s cubic-bezier(.25,.8,.25,1);z-index:10}.floating>.color:hover{border-radius:50%}.floating.colors:after{content:'';display:block;position:absolute;background-color:#404040;width:20px;height:20px;bottom:-5px;left:calc(50% - 10px);-webkit-transform:rotate(45deg);transform:rotate(45deg);z-index:1}"]
                },] },
    ];
    /** @nocollapse */
    MarkerComponent.ctorParameters = function () { return [
        { type: EventsService }
    ]; };
    MarkerComponent.propDecorators = {
        markerStyle: [{ type: Input, args: ['markerStyle',] }],
        colors: [{ type: Input, args: ['colors',] }],
        floatingMarker: [{ type: ViewChild, args: ['floatingMarker',] }]
    };
    return MarkerComponent;
}());
export { MarkerComponent };
if (false) {
    /** @type {?} */
    MarkerComponent.prototype.positionX;
    /** @type {?} */
    MarkerComponent.prototype.positionY;
    /** @type {?} */
    MarkerComponent.prototype.visibility;
    /** @type {?} */
    MarkerComponent.prototype.markerStyle;
    /** @type {?} */
    MarkerComponent.prototype.colors;
    /** @type {?} */
    MarkerComponent.prototype.floatingMarker;
    /** @type {?} */
    MarkerComponent.prototype.events;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFNBQVMsRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDOztJQXFCNUQseUJBQXNCLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7eUJBTi9CLENBQUM7eUJBQ0QsQ0FBQzswQkFDQSxRQUFROzJCQUNlLE9BQU87c0JBQ2pCLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7S0FFWDs7OztJQUVoRCxrQ0FBUTs7O0lBQVI7UUFBQSxpQkF5QkM7UUF4QkMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsVUFBQyxLQUFLOztZQUVuQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLFdBQVcsSUFBSSxLQUFJLENBQUMsV0FBVyxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7O2dCQUU5RixJQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsS0FBSSxDQUFDLGNBQWMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxLQUFLLENBQUM7O2dCQUVyRixJQUFNLGNBQWMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLEtBQUssQ0FBQzs7Z0JBQy9FLElBQU0sT0FBTyxHQUFHLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDLENBQUMsR0FBRyxjQUFjLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBR2hFLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDOztnQkFFbEYsQUFEQSxzQ0FBc0M7Z0JBQ3RDLEtBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDOztnQkFHNUUsQUFEQSxpQ0FBaUM7Z0JBQ2pDLEtBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO2FBQzdCOztZQUdELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLEtBQUksQ0FBQyxXQUFXLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQzs7Z0JBRXpGLEFBREEsaUNBQWlDO2dCQUNqQyxLQUFJLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQzthQUM1QjtTQUNGLENBQUMsQ0FBQztLQUNKOzs7OztJQUVELDhCQUFJOzs7O0lBQUosVUFBSyxLQUFLO1FBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDbkIsTUFBTSxFQUFFLFFBQVE7WUFDaEIsSUFBSSxFQUFFLFdBQVc7WUFDakIsS0FBSyxFQUFFLEtBQUs7U0FDYixDQUFDLENBQUM7S0FDSjs7OztJQUVELHFDQUFXOzs7SUFBWDtRQUNFLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7O2dCQTFERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLFdBQVc7b0JBQ3JCLFFBQVEsRUFBRSxpZ0JBT1g7b0JBQ0MsTUFBTSxFQUFFLENBQUMsNmdDQUE2Z0MsQ0FBQztpQkFDeGhDOzs7O2dCQWJRLGFBQWE7Ozs4QkFrQm5CLEtBQUssU0FBQyxhQUFhO3lCQUNuQixLQUFLLFNBQUMsUUFBUTtpQ0FDZCxTQUFTLFNBQUMsZ0JBQWdCOzswQkFyQjdCOztTQWVhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLW1hcmtlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImZpeGVkIGNvbG9yc1wiICpuZ0lmPVwibWFya2VyU3R5bGUgPT09ICdmaXhlZCdcIj5cbiAgPGRpdiBjbGFzcz1cImNvbG9yXCIgKm5nRm9yPVwibGV0IGNvbG9yIG9mIGNvbG9yc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9yfVwiIChjbGljayk9XCJtYXJrKGNvbG9yKVwiPjwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgI2Zsb2F0aW5nTWFya2VyIGNsYXNzPVwiZmxvYXRpbmcgY29sb3JzXCIgKm5nSWY9XCJtYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0J1wiIFtuZ1N0eWxlXT1cInsnbGVmdCc6IHBvc2l0aW9uWCsncHgnLCAndG9wJzogcG9zaXRpb25ZKydweCcsICd2aXNpYmlsaXR5JzogdmlzaWJpbGl0eX1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sb3JcIiAqbmdGb3I9XCJsZXQgY29sb3Igb2YgY29sb3JzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3J9XCIgKGNsaWNrKT1cIm1hcmsoY29sb3IpXCI+PC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuY29sb3JzLmZpeGVke3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwfS5maXhlZD4uY29sb3J7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDttYXJnaW46MCAxMHB4IDEwcHggMDtjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTt0cmFuc2l0aW9uOi4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKX0uZml4ZWQ+LmNvbG9yOmhvdmVye2JvcmRlci1yYWRpdXM6NTAlO2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKX0uY29sb3JzLmZsb2F0aW5ne3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOmF1dG87YmFja2dyb3VuZC1jb2xvcjojNDA0MDQwO2JvcmRlci1yYWRpdXM6NHB4O2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKTt0cmFuc2l0aW9uOnRvcCAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7ZGlzcGxheTpmbGV4fS5mbG9hdGluZz4uY29sb3J7bWFyZ2luOjEwcHg7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDt0cmFuc2l0aW9uOnRvcCAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSksYm9yZGVyLXJhZGl1cyAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7ei1pbmRleDoxMH0uZmxvYXRpbmc+LmNvbG9yOmhvdmVye2JvcmRlci1yYWRpdXM6NTAlfS5mbG9hdGluZy5jb2xvcnM6YWZ0ZXJ7Y29udGVudDonJztkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6IzQwNDA0MDt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O2JvdHRvbTotNXB4O2xlZnQ6Y2FsYyg1MCUgLSAxMHB4KTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3otaW5kZXg6MX1gXVxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSAge1xuICBwb3NpdGlvblggPSAwO1xuICBwb3NpdGlvblkgPSAwO1xuICB2aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gIEBJbnB1dCgnbWFya2VyU3R5bGUnKSBtYXJrZXJTdHlsZSA9ICdmaXhlZCc7XG4gIEBJbnB1dCgnY29sb3JzJykgY29sb3JzID0gWycjZjQ0MzM2JywgJyNmZmViM2InLCAnIzRjYWY1MCddO1xuICBAVmlld0NoaWxkKCdmbG9hdGluZ01hcmtlcicpIGZsb2F0aW5nTWFya2VyOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIC8vIEV2ZW50IGZyb20gdGV4dGFyZWEgcmVnYXJkaW5nIHRleHQgc2VsZWN0aW9uIGFuZCBtYXJrZXIgc3R5bGUgaXMgc2V0IHRvIGZsb2F0XG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAndGV4dGFyZWEnICYmIGV2ZW50LnR5cGUgPT09ICdzZWxlY3Rpb24nICYmIHRoaXMubWFya2VyU3R5bGUgPT09ICdmbG9hdCcpIHtcbiAgICAgICAgLy8gT3VyIG1ha2VyIHdpZHRoIGlzIGF1dG8gKFRPRE86IGNvbG9ycyBjYW4gYmUgYWRkZWQgYXMgYW4gaW5wdXQpLCBsZXQncyBnZXQgaXRzIGNvbXB1dGVkIHdpZHRoXG4gICAgICAgIGNvbnN0IG1hcmtlcldpZHRoID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5mbG9hdGluZ01hcmtlci5uYXRpdmVFbGVtZW50KS53aWR0aDtcbiAgICAgICAgLy8gU2VsZWN0aW9uIHdpZHRoIGFuZCBoZWlnaHQgZnJvbSByYW5nZSBib3VuZGluZyByZWN0YW5nbGVcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uV2lkdGggPSBldmVudC52YWx1ZS5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCB4Q2VudGVyID0gKHBhcnNlSW50KG1hcmtlcldpZHRoLCAwKSAtIHNlbGVjdGlvbldpZHRoKSAvIDI7XG5cblxuICAgICAgICB0aGlzLnBvc2l0aW9uWCA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHhDZW50ZXI7XG4gICAgICAgIC8vIDY0cHggPSA0ZW0gKGRvdWJsZSB0aGUgbGluZSBoZWlnaHQpXG4gICAgICAgIHRoaXMucG9zaXRpb25ZID0gZXZlbnQudmFsdWUuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSA2NDtcblxuICAgICAgICAvLyBMZXQncyBzaG93IG91ciBmbG9hdGluZyBtYXJrZXJcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgfVxuXG4gICAgICAvLyBFdmVudCBmcm9tIHRleHRhcmVhIHJlZ2FyZGluZyBsb3NpbmcgZm9jdXMgYW5kIG1hcmtlciBzdHlsZSBpcyBzZXQgdG8gZmxvYXRcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ2JsdXInICYmIHRoaXMubWFya2VyU3R5bGUgPT09ICdmbG9hdCcpIHtcbiAgICAgICAgLy8gTGV0J3MgaGlkZSBvdXIgZmxvYXRpbmcgbWFya2VyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbWFyayhjb2xvcikge1xuICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtcbiAgICAgIG9yaWdpbjogJ21hcmtlcicsXG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuIl19