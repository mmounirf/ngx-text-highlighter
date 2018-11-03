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
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this.events.listen().unsubscribe();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zdG9yZWQtaGlnaGxpZ2h0cy9zdG9yZWQtaGlnaGxpZ2h0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQWlCOUQsTUFBTTs7OztJQUlKLFlBQXNCLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7cUJBSG5CLEVBQUU7K0JBRU8sRUFBRTtLQUNhOzs7O0lBRWhELFFBQVE7UUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3ZDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEtBQUssVUFBVSxJQUFJLEtBQUssQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLEtBQUssRUFBQyxDQUFDLENBQUM7YUFDekQ7U0FDRixDQUFDLENBQUM7S0FFSjs7Ozs7SUFFRCxTQUFTLENBQUMsTUFBTTs7UUFFZCxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDcEk7Ozs7O0lBRUQsVUFBVSxDQUFDLE1BQU07UUFDZixNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDOUM7Ozs7SUFFRCxXQUFXO1FBQ1QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7O1lBekNGLFNBQVMsU0FBQztnQkFDVCxRQUFRLEVBQUUsc0JBQXNCO2dCQUNoQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Q0FVWDtnQkFDQyxNQUFNLEVBQUUsQ0FBQyxnN0JBQWc3QixDQUFDO2FBQzM3Qjs7OztZQWhCUSxhQUFhOzs7b0JBa0JuQixLQUFLLFNBQUMsT0FBTztzQkFDYixLQUFLLFNBQUMsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1zdG9yZWQtaGlnaGxpZ2h0cycsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInN0b3JhZ2Utd3JhcHBlclwiPlxuICA8dWwgY2xhc3M9XCJzdG9yYWdlLWZpbHRlcnNcIj5cbiAgICA8bGkgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBmaWx0ZXJzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogZmlsdGVyfVwiIFtuZ0NsYXNzXT1cImlzU2VsZWN0ZWQoZmlsdGVyKSA/ICdzZWxlY3RlZCcgOiAnJ1wiIChjbGljayk9XCJzZXRGaWx0ZXIoZmlsdGVyKVwiPjwvbGk+XG4gIDwvdWw+XG4gIDxkaXYgY2xhc3M9XCJzdG9yYWdlLWxpc3RcIj5cbiAgICA8c3BhbiAqbmdJZj1cIihzdG9yZSB8IGNvbG9yRmlsdGVyOnNlbGVjdGVkRmlsdGVycykubGVuZ3RoIDwgMSAmJiBzdG9yZS5sZW5ndGggPiAwXCI+Tm8gaXRlbXMgbWF0Y2hlcyB0aGUgc2VsZWN0ZWQgZmlsdGVyPC9zcGFuPlxuICAgIDxzcGFuICpuZ0lmPVwic3RvcmUubGVuZ3RoIDwgMVwiPllvdSd2ZSBubyBoaWdobGlnaHRlZCBpdGVtczwvc3Bhbj5cbiAgICA8cCAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdG9yZSB8IGNvbG9yRmlsdGVyOnNlbGVjdGVkRmlsdGVyc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGl0ZW0uY29sb3J9XCI+e3tpdGVtLnRleHR9fTwvcD5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2Auc3RvcmFnZS13cmFwcGVye2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKX11bC5zdG9yYWdlLWZpbHRlcnN7ZGlzcGxheTpmbGV4O21hcmdpbjoyMHB4IDAgMDtiYWNrZ3JvdW5kLWNvbG9yOiNlMWUxZTE7cGFkZGluZzoyMHB4O2JvcmRlci1yYWRpdXM6NHB4IDRweCAwIDB9LnN0b3JhZ2UtZmlsdGVycyBsaXt3aWR0aDozMHB4O2hlaWdodDozMHB4O2N1cnNvcjpwb2ludGVyO2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO2xpc3Qtc3R5bGU6bm9uZTttYXJnaW4tcmlnaHQ6MTBweDtwb3NpdGlvbjpyZWxhdGl2ZX0uc3RvcmFnZS1maWx0ZXJzIGxpLnNlbGVjdGVkOmFmdGVye3Bvc2l0aW9uOmFic29sdXRlO2NvbnRlbnQ6J1xcXFwyNzEzJztmb250LXNpemU6MjVweDtjb2xvcjojZmZmO2ZvbnQtd2VpZ2h0OmJvbGRlcjt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDozMHB4O2hlaWdodDozMHB4fWRpdi5zdG9yYWdlLWxpc3R7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzoyMHB4fS5zdG9yYWdlLWxpc3Qgc3Bhbntjb2xvcjojNjc2NzY3fS5zdG9yYWdlLWxpc3QgcHtwYWRkaW5nOjEwcHg7bWFyZ2luOjEwcHggMDtmbG9hdDpsZWZ0O2NsZWFyOmxlZnQ7Ym9yZGVyLXJhZGl1czo0cHg7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMTIpLDAgMXB4IDJweCByZ2JhKDAsMCwwLC4yNCk7dHJhbnNpdGlvbjpib3gtc2hhZG93IC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtjdXJzb3I6cG9pbnRlcn0uc3RvcmFnZS1saXN0IHA6aG92ZXJ7Ym94LXNoYWRvdzowIDE0cHggMjhweCByZ2JhKDAsMCwwLC4yNSksMCAxMHB4IDEwcHggcmdiYSgwLDAsMCwuMjIpfWBdXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgnc3RvcmUnKSBzdG9yZSA9IFtdO1xuICBASW5wdXQoJ2ZpbHRlcnMnKSBmaWx0ZXJzO1xuICBzZWxlY3RlZEZpbHRlcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ3RleHRhcmVhJyAmJiBldmVudC50eXBlID09PSAnc3RvcmUnKSB7XG4gICAgICAgIHRoaXMuc3RvcmUucHVzaCh7dGV4dDogZXZlbnQudGV4dCwgY29sb3I6IGV2ZW50LmNvbG9yfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIHNldEZpbHRlcihmaWx0ZXIpIHtcbiAgICAvLyBDaGVjayBmaXJzdCBpZiBmaWx0ZXIgZXhpc3RzLCBpZiB5ZXMgaXQgd2lsbCByZW1vdmUgdGhlIGZpbHRlciBpZiBub3QgaXQgd2lsbCBwdXNoIGl0IHRvIHRoZSBzZWxlY3RlZEZpbHRlcnNcbiAgICB0aGlzLmlzU2VsZWN0ZWQoZmlsdGVyKSA/IHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLnNwbGljZSh0aGlzLnNlbGVjdGVkRmlsdGVycy5pbmRleE9mKGZpbHRlciksIDEpIDogdGhpcy5zZWxlY3RlZEZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICB9XG5cbiAgaXNTZWxlY3RlZChmaWx0ZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEZpbHRlcnMuaW5jbHVkZXMoZmlsdGVyKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIl19