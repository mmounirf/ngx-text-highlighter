/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input, ViewChild } from '@angular/core';
import { EventsService } from '../../services/events.service';
export class MarkerComponent {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNwRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFjOUQsTUFBTTs7OztJQU9KLFlBQXNCLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7c0JBTmxDLENBQUMsU0FBUyxFQUFFLFNBQVMsRUFBRSxTQUFTLENBQUM7eUJBQzlCLENBQUM7eUJBQ0QsQ0FBQzswQkFDQSxRQUFROzJCQUNlLE9BQU87S0FFSzs7OztJQUVoRCxRQUFRO1FBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTs7WUFFdkMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDOztnQkFFOUYsTUFBTSxXQUFXLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsYUFBYSxDQUFDLENBQUMsS0FBSyxDQUFDOztnQkFFckYsTUFBTSxjQUFjLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxLQUFLLENBQUM7O2dCQUMvRSxNQUFNLE9BQU8sR0FBRyxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLEdBQUcsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUdoRSxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQzs7Z0JBRWxGLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMscUJBQXFCLEVBQUUsQ0FBQyxHQUFHLEdBQUcsRUFBRSxDQUFDOztnQkFHNUUsSUFBSSxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUM7YUFDN0I7O1lBR0QsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sS0FBSyxVQUFVLElBQUksS0FBSyxDQUFDLElBQUksS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLFdBQVcsS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDOztnQkFFekYsSUFBSSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUM7YUFDNUI7U0FDRixDQUFDLENBQUM7S0FDSjs7Ozs7SUFFRCxJQUFJLENBQUMsS0FBSztRQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ25CLE1BQU0sRUFBRSxRQUFRO1lBQ2hCLElBQUksRUFBRSxXQUFXO1lBQ2pCLEtBQUssRUFBRSxLQUFLO1NBQ2IsQ0FBQyxDQUFDO0tBQ0o7OztZQXRERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7Ozs7OztDQU9YO2dCQUNDLE1BQU0sRUFBRSxDQUFDLDI4QkFBMjhCLENBQUM7YUFDdDlCOzs7O1lBYlEsYUFBYTs7OzBCQW1CbkIsS0FBSyxTQUFDLGFBQWE7NkJBQ25CLFNBQVMsU0FBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgRXZlbnRzU2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2V2ZW50cy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndGgtbWFya2VyJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwiZml4ZWQgY29sb3JzXCIgKm5nSWY9XCJtYXJrZXJTdHlsZSA9PT0gJ2ZpeGVkJ1wiPlxuICA8ZGl2IGNsYXNzPVwiY29sb3JcIiAqbmdGb3I9XCJsZXQgY29sb3Igb2YgY29sb3JzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3J9XCIgKGNsaWNrKT1cIm1hcmsoY29sb3IpXCI+PC9kaXY+XG48L2Rpdj5cblxuPGRpdiAjZmxvYXRpbmdNYXJrZXIgY2xhc3M9XCJmbG9hdGluZyBjb2xvcnNcIiAqbmdJZj1cIm1hcmtlclN0eWxlID09PSAnZmxvYXQnXCIgW25nU3R5bGVdPVwieydsZWZ0JzogcG9zaXRpb25YKydweCcsICd0b3AnOiBwb3NpdGlvblkrJ3B4JywgJ3Zpc2liaWxpdHknOiB2aXNpYmlsaXR5fVwiPlxuICAgIDxkaXYgY2xhc3M9XCJjb2xvclwiICpuZ0Zvcj1cImxldCBjb2xvciBvZiBjb2xvcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBjb2xvcn1cIiAoY2xpY2spPVwibWFyayhjb2xvcilcIj48L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5jb2xvcnMuZml4ZWR7d2lkdGg6MTAwJTtkaXNwbGF5OmZsZXg7ZmxleC13cmFwOndyYXB9LmZpeGVkPi5jb2xvcnt3aWR0aDozMHB4O2hlaWdodDozMHB4O21hcmdpbjowIDEwcHggMTBweCAwO2N1cnNvcjpwb2ludGVyO2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO3RyYW5zaXRpb246LjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpfS5maXhlZD4uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCU7Ym94LXNoYWRvdzowIDEwcHggMTBweCByZ2JhKDAsMCwwLC4yNSksMCA1cHggNXB4IHJnYmEoMCwwLDAsLjIyKX0uY29sb3JzLmZsb2F0aW5ne3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOmF1dG87YmFja2dyb3VuZC1jb2xvcjojNDA0MDQwO2JvcmRlci1yYWRpdXM6MnB4O2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO3RyYW5zaXRpb246dG9wIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtkaXNwbGF5OmZsZXh9LmZsb2F0aW5nPi5jb2xvcnttYXJnaW46MTBweDtjdXJzb3I6cG9pbnRlcjt3aWR0aDozMHB4O2hlaWdodDozMHB4O3RyYW5zaXRpb246dG9wIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKSxib3JkZXItcmFkaXVzIC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTt6LWluZGV4OjEwfS5mbG9hdGluZz4uY29sb3I6aG92ZXJ7Ym9yZGVyLXJhZGl1czo1MCV9LmZsb2F0aW5nLmNvbG9yczphZnRlcntjb250ZW50OicnO2Rpc3BsYXk6YmxvY2s7cG9zaXRpb246YWJzb2x1dGU7YmFja2dyb3VuZC1jb2xvcjojNDA0MDQwO3dpZHRoOjIwcHg7aGVpZ2h0OjIwcHg7Ym90dG9tOi01cHg7bGVmdDpjYWxjKDUwJSAtIDEwcHgpOy13ZWJraXQtdHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7dHJhbnNmb3JtOnJvdGF0ZSg0NWRlZyk7ei1pbmRleDoxfWBdXG59KVxuZXhwb3J0IGNsYXNzIE1hcmtlckNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIGNvbG9ycyA9IFsnI2Y0NDMzNicsICcjZmZlYjNiJywgJyM0Y2FmNTAnXTtcbiAgcG9zaXRpb25YID0gMDtcbiAgcG9zaXRpb25ZID0gMDtcbiAgdmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICBASW5wdXQoJ21hcmtlclN0eWxlJykgbWFya2VyU3R5bGUgPSAnZml4ZWQnO1xuICBAVmlld0NoaWxkKCdmbG9hdGluZ01hcmtlcicpIGZsb2F0aW5nTWFya2VyOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIC8vIEV2ZW50IGZyb20gdGV4dGFyZWEgcmVnYXJkaW5nIHRleHQgc2VsZWN0aW9uIGFuZCBtYXJrZXIgc3R5bGUgaXMgc2V0IHRvIGZsb2F0XG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAndGV4dGFyZWEnICYmIGV2ZW50LnR5cGUgPT09ICdzZWxlY3Rpb24nICYmIHRoaXMubWFya2VyU3R5bGUgPT09ICdmbG9hdCcpIHtcbiAgICAgICAgLy8gT3VyIG1ha2VyIHdpZHRoIGlzIGF1dG8gKFRPRE86IGNvbG9ycyBjYW4gYmUgYWRkZWQgYXMgYW4gaW5wdXQpLCBsZXQncyBnZXQgaXRzIGNvbXB1dGVkIHdpZHRoXG4gICAgICAgIGNvbnN0IG1hcmtlcldpZHRoID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5mbG9hdGluZ01hcmtlci5uYXRpdmVFbGVtZW50KS53aWR0aDtcbiAgICAgICAgLy8gU2VsZWN0aW9uIHdpZHRoIGFuZCBoZWlnaHQgZnJvbSByYW5nZSBib3VuZGluZyByZWN0YW5nbGVcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uV2lkdGggPSBldmVudC52YWx1ZS5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCB4Q2VudGVyID0gKHBhcnNlSW50KG1hcmtlcldpZHRoLCAwKSAtIHNlbGVjdGlvbldpZHRoKSAvIDI7XG5cblxuICAgICAgICB0aGlzLnBvc2l0aW9uWCA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkubGVmdCAtIHhDZW50ZXI7XG4gICAgICAgIC8vIDY0cHggPSA0ZW0gKGRvdWJsZSB0aGUgbGluZSBoZWlnaHQpXG4gICAgICAgIHRoaXMucG9zaXRpb25ZID0gZXZlbnQudmFsdWUuZ2V0UmFuZ2VBdCgwKS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3AgLSA2NDtcblxuICAgICAgICAvLyBMZXQncyBzaG93IG91ciBmbG9hdGluZyBtYXJrZXJcbiAgICAgICAgdGhpcy52aXNpYmlsaXR5ID0gJ3Zpc2libGUnO1xuICAgICAgfVxuXG4gICAgICAvLyBFdmVudCBmcm9tIHRleHRhcmVhIHJlZ2FyZGluZyBsb3NpbmcgZm9jdXMgYW5kIG1hcmtlciBzdHlsZSBpcyBzZXQgdG8gZmxvYXRcbiAgICAgIGlmIChldmVudC5vcmlnaW4gPT09ICd0ZXh0YXJlYScgJiYgZXZlbnQudHlwZSA9PT0gJ2JsdXInICYmIHRoaXMubWFya2VyU3R5bGUgPT09ICdmbG9hdCcpIHtcbiAgICAgICAgLy8gTGV0J3MgaGlkZSBvdXIgZmxvYXRpbmcgbWFya2VyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICdoaWRkZW4nO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgbWFyayhjb2xvcikge1xuICAgIHRoaXMuZXZlbnRzLmRpc3BhdGNoKHtcbiAgICAgIG9yaWdpbjogJ21hcmtlcicsXG4gICAgICB0eXBlOiAnaGlnaGxpZ2h0JyxcbiAgICAgIGNvbG9yOiBjb2xvclxuICAgIH0pO1xuICB9XG5cbn1cbiJdfQ==