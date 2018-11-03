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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFya2VyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC10ZXh0LWhpZ2hsaWdodGVyLyIsInNvdXJjZXMiOlsibGliL2NvbXBvbmVudHMvbWFya2VyL21hcmtlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLFNBQVMsRUFBdUMsTUFBTSxlQUFlLENBQUM7QUFDekcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBYzlELE1BQU07Ozs7SUFPSixZQUFzQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO3lCQU4vQixDQUFDO3lCQUNELENBQUM7MEJBQ0EsUUFBUTsyQkFDZSxPQUFPO3NCQUNqQixDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxDQUFDO0tBRVg7Ozs7SUFFaEQsUUFBUTtRQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7O1lBRXZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQzs7Z0JBRTlGLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLGFBQWEsQ0FBQyxDQUFDLEtBQUssQ0FBQzs7Z0JBRXJGLE1BQU0sY0FBYyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsS0FBSyxDQUFDOztnQkFDL0UsTUFBTSxPQUFPLEdBQUcsQ0FBQyxRQUFRLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFFaEUsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7O2dCQUVsRixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQzs7Z0JBRzVFLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO2FBQzdCOztZQUdELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxXQUFXLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQzs7Z0JBRXpGLElBQUksQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO0tBQ0o7Ozs7O0lBRUQsSUFBSSxDQUFDLEtBQUs7UUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztZQUNuQixNQUFNLEVBQUUsUUFBUTtZQUNoQixJQUFJLEVBQUUsV0FBVztZQUNqQixLQUFLLEVBQUUsS0FBSztTQUNiLENBQUMsQ0FBQztLQUNKOzs7O0lBRUQsV0FBVztRQUNULElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7OztZQXpERixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRTs7Ozs7OztDQU9YO2dCQUNDLE1BQU0sRUFBRSxDQUFDLDZnQ0FBNmdDLENBQUM7YUFDeGhDOzs7O1lBYlEsYUFBYTs7OzBCQWtCbkIsS0FBSyxTQUFDLGFBQWE7cUJBQ25CLEtBQUssU0FBQyxRQUFROzZCQUNkLFNBQVMsU0FBQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQsIFZpZXdDaGlsZCwgT25EZXN0cm95LCBPbkNoYW5nZXMsIFNpbXBsZUNoYW5nZXMgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLW1hcmtlcicsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImZpeGVkIGNvbG9yc1wiICpuZ0lmPVwibWFya2VyU3R5bGUgPT09ICdmaXhlZCdcIj5cbiAgPGRpdiBjbGFzcz1cImNvbG9yXCIgKm5nRm9yPVwibGV0IGNvbG9yIG9mIGNvbG9yc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGNvbG9yfVwiIChjbGljayk9XCJtYXJrKGNvbG9yKVwiPjwvZGl2PlxuPC9kaXY+XG5cbjxkaXYgI2Zsb2F0aW5nTWFya2VyIGNsYXNzPVwiZmxvYXRpbmcgY29sb3JzXCIgKm5nSWY9XCJtYXJrZXJTdHlsZSA9PT0gJ2Zsb2F0J1wiIFtuZ1N0eWxlXT1cInsnbGVmdCc6IHBvc2l0aW9uWCsncHgnLCAndG9wJzogcG9zaXRpb25ZKydweCcsICd2aXNpYmlsaXR5JzogdmlzaWJpbGl0eX1cIj5cbiAgICA8ZGl2IGNsYXNzPVwiY29sb3JcIiAqbmdGb3I9XCJsZXQgY29sb3Igb2YgY29sb3JzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogY29sb3J9XCIgKGNsaWNrKT1cIm1hcmsoY29sb3IpXCI+PC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2AuY29sb3JzLmZpeGVke3dpZHRoOjEwMCU7ZGlzcGxheTpmbGV4O2ZsZXgtd3JhcDp3cmFwfS5maXhlZD4uY29sb3J7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDttYXJnaW46MCAxMHB4IDEwcHggMDtjdXJzb3I6cG9pbnRlcjtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTt0cmFuc2l0aW9uOi4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKX0uZml4ZWQ+LmNvbG9yOmhvdmVye2JvcmRlci1yYWRpdXM6NTAlO2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKX0uY29sb3JzLmZsb2F0aW5ne3Bvc2l0aW9uOmFic29sdXRlO3dpZHRoOmF1dG87YmFja2dyb3VuZC1jb2xvcjojNDA0MDQwO2JvcmRlci1yYWRpdXM6NHB4O2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKTt0cmFuc2l0aW9uOnRvcCAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7ZGlzcGxheTpmbGV4fS5mbG9hdGluZz4uY29sb3J7bWFyZ2luOjEwcHg7Y3Vyc29yOnBvaW50ZXI7d2lkdGg6MzBweDtoZWlnaHQ6MzBweDt0cmFuc2l0aW9uOnRvcCAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSksYm9yZGVyLXJhZGl1cyAuM3MgY3ViaWMtYmV6aWVyKC4yNSwuOCwuMjUsMSk7ei1pbmRleDoxMH0uZmxvYXRpbmc+LmNvbG9yOmhvdmVye2JvcmRlci1yYWRpdXM6NTAlfS5mbG9hdGluZy5jb2xvcnM6YWZ0ZXJ7Y29udGVudDonJztkaXNwbGF5OmJsb2NrO3Bvc2l0aW9uOmFic29sdXRlO2JhY2tncm91bmQtY29sb3I6IzQwNDA0MDt3aWR0aDoyMHB4O2hlaWdodDoyMHB4O2JvdHRvbTotNXB4O2xlZnQ6Y2FsYyg1MCUgLSAxMHB4KTstd2Via2l0LXRyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3RyYW5zZm9ybTpyb3RhdGUoNDVkZWcpO3otaW5kZXg6MX1gXVxufSlcbmV4cG9ydCBjbGFzcyBNYXJrZXJDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSAge1xuICBwb3NpdGlvblggPSAwO1xuICBwb3NpdGlvblkgPSAwO1xuICB2aXNpYmlsaXR5ID0gJ2hpZGRlbic7XG4gIEBJbnB1dCgnbWFya2VyU3R5bGUnKSBtYXJrZXJTdHlsZSA9ICdmaXhlZCc7XG4gIEBJbnB1dCgnY29sb3JzJykgY29sb3JzID0gWycjZjQ0MzM2JywgJyNmZmViM2InLCAnIzRjYWY1MCddO1xuICBAVmlld0NoaWxkKCdmbG9hdGluZ01hcmtlcicpIGZsb2F0aW5nTWFya2VyOiBhbnk7XG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBldmVudHM6IEV2ZW50c1NlcnZpY2UpIHsgfVxuXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnN1YnNjcmliZSgoZXZlbnQpID0+IHtcbiAgICAgIC8vIEV2ZW50IGZyb20gdGV4dGFyZWEgcmVnYXJkaW5nIHRleHQgc2VsZWN0aW9uIGFuZCBtYXJrZXIgc3R5bGUgaXMgc2V0IHRvIGZsb2F0XG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAndGV4dGFyZWEnICYmIGV2ZW50LnR5cGUgPT09ICdzZWxlY3Rpb24nICYmIHRoaXMubWFya2VyU3R5bGUgPT09ICdmbG9hdCcpIHtcbiAgICAgICAgLy8gT3VyIG1ha2VyIHdpZHRoIGlzIGF1dG8gKFRPRE86IGNvbG9ycyBjYW4gYmUgYWRkZWQgYXMgYW4gaW5wdXQpLCBsZXQncyBnZXQgaXRzIGNvbXB1dGVkIHdpZHRoXG4gICAgICAgIGNvbnN0IG1hcmtlcldpZHRoID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUodGhpcy5mbG9hdGluZ01hcmtlci5uYXRpdmVFbGVtZW50KS53aWR0aDtcbiAgICAgICAgLy8gU2VsZWN0aW9uIHdpZHRoIGFuZCBoZWlnaHQgZnJvbSByYW5nZSBib3VuZGluZyByZWN0YW5nbGVcbiAgICAgICAgY29uc3Qgc2VsZWN0aW9uV2lkdGggPSBldmVudC52YWx1ZS5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoO1xuICAgICAgICBjb25zdCB4Q2VudGVyID0gKHBhcnNlSW50KG1hcmtlcldpZHRoLCAwKSAtIHNlbGVjdGlvbldpZHRoKSAvIDI7XG5cbiAgICAgICAgdGhpcy5wb3NpdGlvblggPSBldmVudC52YWx1ZS5nZXRSYW5nZUF0KDApLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmxlZnQgLSB4Q2VudGVyO1xuICAgICAgICAvLyA2NHB4ID0gNGVtIChkb3VibGUgdGhlIGxpbmUgaGVpZ2h0KVxuICAgICAgICB0aGlzLnBvc2l0aW9uWSA9IGV2ZW50LnZhbHVlLmdldFJhbmdlQXQoMCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wIC0gNjQ7XG5cbiAgICAgICAgLy8gTGV0J3Mgc2hvdyBvdXIgZmxvYXRpbmcgbWFya2VyXG4gICAgICAgIHRoaXMudmlzaWJpbGl0eSA9ICd2aXNpYmxlJztcbiAgICAgIH1cblxuICAgICAgLy8gRXZlbnQgZnJvbSB0ZXh0YXJlYSByZWdhcmRpbmcgbG9zaW5nIGZvY3VzIGFuZCBtYXJrZXIgc3R5bGUgaXMgc2V0IHRvIGZsb2F0XG4gICAgICBpZiAoZXZlbnQub3JpZ2luID09PSAndGV4dGFyZWEnICYmIGV2ZW50LnR5cGUgPT09ICdibHVyJyAmJiB0aGlzLm1hcmtlclN0eWxlID09PSAnZmxvYXQnKSB7XG4gICAgICAgIC8vIExldCdzIGhpZGUgb3VyIGZsb2F0aW5nIG1hcmtlclxuICAgICAgICB0aGlzLnZpc2liaWxpdHkgPSAnaGlkZGVuJztcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIG1hcmsoY29sb3IpIHtcbiAgICB0aGlzLmV2ZW50cy5kaXNwYXRjaCh7XG4gICAgICBvcmlnaW46ICdtYXJrZXInLFxuICAgICAgdHlwZTogJ2hpZ2hsaWdodCcsXG4gICAgICBjb2xvcjogY29sb3JcbiAgICB9KTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cbiJdfQ==