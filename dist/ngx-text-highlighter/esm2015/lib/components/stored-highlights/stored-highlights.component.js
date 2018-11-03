/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { EventsService } from '../../services/events.service';
export class StoredHighlightsComponent {
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
if (false) {
    /** @type {?} */
    StoredHighlightsComponent.prototype.store;
    /** @type {?} */
    StoredHighlightsComponent.prototype.filters;
    /** @type {?} */
    StoredHighlightsComponent.prototype.selectedFilters;
    /** @type {?} */
    StoredHighlightsComponent.prototype.events;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zdG9yZWQtaGlnaGxpZ2h0cy9zdG9yZWQtaGlnaGxpZ2h0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pELE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQWlCOUQsTUFBTTs7OztJQUlKLFlBQXNCLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7cUJBSG5CLEVBQUU7K0JBRU8sRUFBRTtLQUNhOzs7O0lBRWhELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDekQ7U0FDRixDQUFDLENBQUM7S0FFSjs7Ozs7SUFFRCxTQUFTLENBQUMsTUFBTTs7UUFFZCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEk7Ozs7O0lBRUQsVUFBVSxDQUFDLE1BQU07UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDOUM7OztZQXJDRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsUUFBUSxFQUFFOzs7Ozs7Ozs7O0NBVVg7Z0JBQ0MsTUFBTSxFQUFFLENBQUMsZzdCQUFnN0IsQ0FBQzthQUMzN0I7Ozs7WUFoQlEsYUFBYTs7O29CQWtCbkIsS0FBSyxTQUFDLE9BQU87c0JBQ2IsS0FBSyxTQUFDLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE9uSW5pdCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEV2ZW50c1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ldmVudHMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3RoLXN0b3JlZC1oaWdobGlnaHRzJyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwic3RvcmFnZS13cmFwcGVyXCI+XG4gIDx1bCBjbGFzcz1cInN0b3JhZ2UtZmlsdGVyc1wiPlxuICAgIDxsaSAqbmdGb3I9XCJsZXQgZmlsdGVyIG9mIGZpbHRlcnNcIiBbbmdTdHlsZV09XCJ7J2JhY2tncm91bmQtY29sb3InOiBmaWx0ZXJ9XCIgW25nQ2xhc3NdPVwiaXNTZWxlY3RlZChmaWx0ZXIpID8gJ3NlbGVjdGVkJyA6ICcnXCIgKGNsaWNrKT1cInNldEZpbHRlcihmaWx0ZXIpXCI+PC9saT5cbiAgPC91bD5cbiAgPGRpdiBjbGFzcz1cInN0b3JhZ2UtbGlzdFwiPlxuICAgIDxzcGFuICpuZ0lmPVwiKHN0b3JlIHwgY29sb3JGaWx0ZXI6c2VsZWN0ZWRGaWx0ZXJzKS5sZW5ndGggPCAxICYmIHN0b3JlLmxlbmd0aCA+IDBcIj5ObyBpdGVtcyBtYXRjaGVzIHRoZSBzZWxlY3RlZCBmaWx0ZXI8L3NwYW4+XG4gICAgPHNwYW4gKm5nSWY9XCJzdG9yZS5sZW5ndGggPCAxXCI+WW91J3ZlIG5vIGhpZ2hsaWdodGVkIGl0ZW1zPC9zcGFuPlxuICAgIDxwICpuZ0Zvcj1cImxldCBpdGVtIG9mIHN0b3JlIHwgY29sb3JGaWx0ZXI6c2VsZWN0ZWRGaWx0ZXJzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogaXRlbS5jb2xvcn1cIj57e2l0ZW0udGV4dH19PC9wPlxuICA8L2Rpdj5cbjwvZGl2PlxuYCxcbiAgc3R5bGVzOiBbYC5zdG9yYWdlLXdyYXBwZXJ7Ym94LXNoYWRvdzowIDJweCAxcHggLTFweCByZ2JhKDAsMCwwLC4yKSwwIDFweCAxcHggMCByZ2JhKDAsMCwwLC4xNCksMCAxcHggM3B4IDAgcmdiYSgwLDAsMCwuMTIpfXVsLnN0b3JhZ2UtZmlsdGVyc3tkaXNwbGF5OmZsZXg7bWFyZ2luOjIwcHggMCAwO2JhY2tncm91bmQtY29sb3I6I2UxZTFlMTtwYWRkaW5nOjIwcHg7Ym9yZGVyLXJhZGl1czo0cHggNHB4IDAgMH0uc3RvcmFnZS1maWx0ZXJzIGxpe3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHg7Y3Vyc29yOnBvaW50ZXI7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMTIpLDAgMXB4IDJweCByZ2JhKDAsMCwwLC4yNCk7bGlzdC1zdHlsZTpub25lO21hcmdpbi1yaWdodDoxMHB4O3Bvc2l0aW9uOnJlbGF0aXZlfS5zdG9yYWdlLWZpbHRlcnMgbGkuc2VsZWN0ZWQ6YWZ0ZXJ7cG9zaXRpb246YWJzb2x1dGU7Y29udGVudDonXFxcXDI3MTMnO2ZvbnQtc2l6ZToyNXB4O2NvbG9yOiNmZmY7Zm9udC13ZWlnaHQ6Ym9sZGVyO3RleHQtYWxpZ246Y2VudGVyO3dpZHRoOjMwcHg7aGVpZ2h0OjMwcHh9ZGl2LnN0b3JhZ2UtbGlzdHtkaXNwbGF5OmlubGluZS1ibG9jaztwYWRkaW5nOjIwcHh9LnN0b3JhZ2UtbGlzdCBzcGFue2NvbG9yOiM2NzY3Njd9LnN0b3JhZ2UtbGlzdCBwe3BhZGRpbmc6MTBweDttYXJnaW46MTBweCAwO2Zsb2F0OmxlZnQ7Y2xlYXI6bGVmdDtib3JkZXItcmFkaXVzOjRweDtib3gtc2hhZG93OjAgMXB4IDNweCByZ2JhKDAsMCwwLC4xMiksMCAxcHggMnB4IHJnYmEoMCwwLDAsLjI0KTt0cmFuc2l0aW9uOmJveC1zaGFkb3cgLjNzIGN1YmljLWJlemllciguMjUsLjgsLjI1LDEpO2N1cnNvcjpwb2ludGVyfS5zdG9yYWdlLWxpc3QgcDpob3Zlcntib3gtc2hhZG93OjAgMTRweCAyOHB4IHJnYmEoMCwwLDAsLjI1KSwwIDEwcHggMTBweCByZ2JhKDAsMCwwLC4yMil9YF1cbn0pXG5leHBvcnQgY2xhc3MgU3RvcmVkSGlnaGxpZ2h0c0NvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG4gIEBJbnB1dCgnc3RvcmUnKSBzdG9yZSA9IFtdO1xuICBASW5wdXQoJ2ZpbHRlcnMnKSBmaWx0ZXJzO1xuICBzZWxlY3RlZEZpbHRlcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ3RleHRhcmVhJyAmJiBldmVudC50eXBlID09PSAnc3RvcmUnKSB7XG4gICAgICAgIHRoaXMuc3RvcmUucHVzaCh7dGV4dDogZXZlbnQudGV4dCwgY29sb3I6IGV2ZW50LmNvbG9yfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIHNldEZpbHRlcihmaWx0ZXIpIHtcbiAgICAvLyBDaGVjayBmaXJzdCBpZiBmaWx0ZXIgZXhpc3RzLCBpZiB5ZXMgaXQgd2lsbCByZW1vdmUgdGhlIGZpbHRlciBpZiBub3QgaXQgd2lsbCBwdXNoIGl0IHRvIHRoZSBzZWxlY3RlZEZpbHRlcnNcbiAgICB0aGlzLmlzU2VsZWN0ZWQoZmlsdGVyKSA/IHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLnNwbGljZSh0aGlzLnNlbGVjdGVkRmlsdGVycy5pbmRleE9mKGZpbHRlciksIDEpIDogdGhpcy5zZWxlY3RlZEZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICB9XG5cbiAgaXNTZWxlY3RlZChmaWx0ZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEZpbHRlcnMuaW5jbHVkZXMoZmlsdGVyKTtcbiAgfVxuXG59XG4iXX0=