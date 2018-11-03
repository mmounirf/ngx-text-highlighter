/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { EventsService } from '../../services/events.service';
var StoredHighlightsComponent = /** @class */ (function () {
    function StoredHighlightsComponent(events) {
        this.events = events;
        this.store = [];
        this.selectedFilters = [];
    }
    /**
     * @return {?}
     */
    StoredHighlightsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.events.listen().subscribe(function (event) {
            if (event.origin === 'textarea' && event.type === 'store') {
                _this.store.push({ text: event.text, color: event.color });
            }
        });
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    StoredHighlightsComponent.prototype.setFilter = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        // Check first if filter exists, if yes it will remove the filter if not it will push it to the selectedFilters
        this.isSelected(filter) ? this.selectedFilters.splice(this.selectedFilters.indexOf(filter), 1) : this.selectedFilters.push(filter);
    };
    /**
     * @param {?} filter
     * @return {?}
     */
    StoredHighlightsComponent.prototype.isSelected = /**
     * @param {?} filter
     * @return {?}
     */
    function (filter) {
        return this.selectedFilters.includes(filter);
    };
    /**
     * @return {?}
     */
    StoredHighlightsComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.events.listen().unsubscribe();
    };
    StoredHighlightsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'th-stored-highlights',
                    template: "<div class=\"storage-wrapper\">\n  <ul class=\"storage-filters\">\n    <li *ngFor=\"let filter of filters\" [ngStyle]=\"{'background-color': filter}\" [ngClass]=\"isSelected(filter) ? 'selected' : ''\" (click)=\"setFilter(filter)\"></li>\n  </ul>\n  <div class=\"storage-list\">\n    <span *ngIf=\"(store | colorFilter:selectedFilters).length < 1 && store.length > 0\">No items matches the selected filter</span>\n    <span *ngIf=\"store.length < 1\">You've no highlighted items</span>\n    <p *ngFor=\"let item of store | colorFilter:selectedFilters\" [ngStyle]=\"{'background-color': item.color}\">{{item.text}}</p>\n  </div>\n</div>\n",
                    styles: [".storage-wrapper{box-shadow:0 2px 1px -1px rgba(0,0,0,.2),0 1px 1px 0 rgba(0,0,0,.14),0 1px 3px 0 rgba(0,0,0,.12)}ul.storage-filters{display:flex;margin:20px 0 0;background-color:#e1e1e1;padding:20px;border-radius:4px 4px 0 0}.storage-filters li{width:30px;height:30px;cursor:pointer;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);list-style:none;margin-right:10px;position:relative}.storage-filters li.selected:after{position:absolute;content:'\\2713';font-size:25px;color:#fff;font-weight:bolder;text-align:center;width:30px;height:30px}div.storage-list{display:inline-block;padding:20px}.storage-list span{color:#676767}.storage-list p{padding:10px;margin:10px 0;float:left;clear:left;border-radius:4px;box-shadow:0 1px 3px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.24);transition:box-shadow .3s cubic-bezier(.25,.8,.25,1);cursor:pointer}.storage-list p:hover{box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)}"]
                },] },
    ];
    /** @nocollapse */
    StoredHighlightsComponent.ctorParameters = function () { return [
        { type: EventsService }
    ]; };
    StoredHighlightsComponent.propDecorators = {
        store: [{ type: Input, args: ['store',] }],
        filters: [{ type: Input, args: ['filters',] }]
    };
    return StoredHighlightsComponent;
}());
export { StoredHighlightsComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmVkLWhpZ2hsaWdodHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXRleHQtaGlnaGxpZ2h0ZXIvIiwic291cmNlcyI6WyJsaWIvY29tcG9uZW50cy9zdG9yZWQtaGlnaGxpZ2h0cy9zdG9yZWQtaGlnaGxpZ2h0cy5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQVUsS0FBSyxFQUFhLE1BQU0sZUFBZSxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQzs7SUFxQjVELG1DQUFzQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO3FCQUhuQixFQUFFOytCQUVPLEVBQUU7S0FDYTs7OztJQUVoRCw0Q0FBUTs7O0lBQVI7UUFBQSxpQkFPQztRQU5DLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUNuQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxLQUFLLFVBQVUsSUFBSSxLQUFLLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7Z0JBQzFELEtBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxLQUFLLEVBQUMsQ0FBQyxDQUFDO2FBQ3pEO1NBQ0YsQ0FBQyxDQUFDO0tBRUo7Ozs7O0lBRUQsNkNBQVM7Ozs7SUFBVCxVQUFVLE1BQU07O1FBRWQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3BJOzs7OztJQUVELDhDQUFVOzs7O0lBQVYsVUFBVyxNQUFNO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzlDOzs7O0lBRUQsK0NBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwQzs7Z0JBekNGLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsK25CQVVYO29CQUNDLE1BQU0sRUFBRSxDQUFDLGc3QkFBZzdCLENBQUM7aUJBQzM3Qjs7OztnQkFoQlEsYUFBYTs7O3dCQWtCbkIsS0FBSyxTQUFDLE9BQU87MEJBQ2IsS0FBSyxTQUFDLFNBQVM7O29DQXBCbEI7O1NBa0JhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT25Jbml0LCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBFdmVudHNTZXJ2aWNlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvZXZlbnRzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd0aC1zdG9yZWQtaGlnaGxpZ2h0cycsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInN0b3JhZ2Utd3JhcHBlclwiPlxuICA8dWwgY2xhc3M9XCJzdG9yYWdlLWZpbHRlcnNcIj5cbiAgICA8bGkgKm5nRm9yPVwibGV0IGZpbHRlciBvZiBmaWx0ZXJzXCIgW25nU3R5bGVdPVwieydiYWNrZ3JvdW5kLWNvbG9yJzogZmlsdGVyfVwiIFtuZ0NsYXNzXT1cImlzU2VsZWN0ZWQoZmlsdGVyKSA/ICdzZWxlY3RlZCcgOiAnJ1wiIChjbGljayk9XCJzZXRGaWx0ZXIoZmlsdGVyKVwiPjwvbGk+XG4gIDwvdWw+XG4gIDxkaXYgY2xhc3M9XCJzdG9yYWdlLWxpc3RcIj5cbiAgICA8c3BhbiAqbmdJZj1cIihzdG9yZSB8IGNvbG9yRmlsdGVyOnNlbGVjdGVkRmlsdGVycykubGVuZ3RoIDwgMSAmJiBzdG9yZS5sZW5ndGggPiAwXCI+Tm8gaXRlbXMgbWF0Y2hlcyB0aGUgc2VsZWN0ZWQgZmlsdGVyPC9zcGFuPlxuICAgIDxzcGFuICpuZ0lmPVwic3RvcmUubGVuZ3RoIDwgMVwiPllvdSd2ZSBubyBoaWdobGlnaHRlZCBpdGVtczwvc3Bhbj5cbiAgICA8cCAqbmdGb3I9XCJsZXQgaXRlbSBvZiBzdG9yZSB8IGNvbG9yRmlsdGVyOnNlbGVjdGVkRmlsdGVyc1wiIFtuZ1N0eWxlXT1cInsnYmFja2dyb3VuZC1jb2xvcic6IGl0ZW0uY29sb3J9XCI+e3tpdGVtLnRleHR9fTwvcD5cbiAgPC9kaXY+XG48L2Rpdj5cbmAsXG4gIHN0eWxlczogW2Auc3RvcmFnZS13cmFwcGVye2JveC1zaGFkb3c6MCAycHggMXB4IC0xcHggcmdiYSgwLDAsMCwuMiksMCAxcHggMXB4IDAgcmdiYSgwLDAsMCwuMTQpLDAgMXB4IDNweCAwIHJnYmEoMCwwLDAsLjEyKX11bC5zdG9yYWdlLWZpbHRlcnN7ZGlzcGxheTpmbGV4O21hcmdpbjoyMHB4IDAgMDtiYWNrZ3JvdW5kLWNvbG9yOiNlMWUxZTE7cGFkZGluZzoyMHB4O2JvcmRlci1yYWRpdXM6NHB4IDRweCAwIDB9LnN0b3JhZ2UtZmlsdGVycyBsaXt3aWR0aDozMHB4O2hlaWdodDozMHB4O2N1cnNvcjpwb2ludGVyO2JveC1zaGFkb3c6MCAxcHggM3B4IHJnYmEoMCwwLDAsLjEyKSwwIDFweCAycHggcmdiYSgwLDAsMCwuMjQpO2xpc3Qtc3R5bGU6bm9uZTttYXJnaW4tcmlnaHQ6MTBweDtwb3NpdGlvbjpyZWxhdGl2ZX0uc3RvcmFnZS1maWx0ZXJzIGxpLnNlbGVjdGVkOmFmdGVye3Bvc2l0aW9uOmFic29sdXRlO2NvbnRlbnQ6J1xcXFwyNzEzJztmb250LXNpemU6MjVweDtjb2xvcjojZmZmO2ZvbnQtd2VpZ2h0OmJvbGRlcjt0ZXh0LWFsaWduOmNlbnRlcjt3aWR0aDozMHB4O2hlaWdodDozMHB4fWRpdi5zdG9yYWdlLWxpc3R7ZGlzcGxheTppbmxpbmUtYmxvY2s7cGFkZGluZzoyMHB4fS5zdG9yYWdlLWxpc3Qgc3Bhbntjb2xvcjojNjc2NzY3fS5zdG9yYWdlLWxpc3QgcHtwYWRkaW5nOjEwcHg7bWFyZ2luOjEwcHggMDtmbG9hdDpsZWZ0O2NsZWFyOmxlZnQ7Ym9yZGVyLXJhZGl1czo0cHg7Ym94LXNoYWRvdzowIDFweCAzcHggcmdiYSgwLDAsMCwuMTIpLDAgMXB4IDJweCByZ2JhKDAsMCwwLC4yNCk7dHJhbnNpdGlvbjpib3gtc2hhZG93IC4zcyBjdWJpYy1iZXppZXIoLjI1LC44LC4yNSwxKTtjdXJzb3I6cG9pbnRlcn0uc3RvcmFnZS1saXN0IHA6aG92ZXJ7Ym94LXNoYWRvdzowIDE0cHggMjhweCByZ2JhKDAsMCwwLC4yNSksMCAxMHB4IDEwcHggcmdiYSgwLDAsMCwuMjIpfWBdXG59KVxuZXhwb3J0IGNsYXNzIFN0b3JlZEhpZ2hsaWdodHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIEBJbnB1dCgnc3RvcmUnKSBzdG9yZSA9IFtdO1xuICBASW5wdXQoJ2ZpbHRlcnMnKSBmaWx0ZXJzO1xuICBzZWxlY3RlZEZpbHRlcnM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgY29uc3RydWN0b3IocHJvdGVjdGVkIGV2ZW50czogRXZlbnRzU2VydmljZSkgeyB9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5ldmVudHMubGlzdGVuKCkuc3Vic2NyaWJlKChldmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50Lm9yaWdpbiA9PT0gJ3RleHRhcmVhJyAmJiBldmVudC50eXBlID09PSAnc3RvcmUnKSB7XG4gICAgICAgIHRoaXMuc3RvcmUucHVzaCh7dGV4dDogZXZlbnQudGV4dCwgY29sb3I6IGV2ZW50LmNvbG9yfSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgfVxuXG4gIHNldEZpbHRlcihmaWx0ZXIpIHtcbiAgICAvLyBDaGVjayBmaXJzdCBpZiBmaWx0ZXIgZXhpc3RzLCBpZiB5ZXMgaXQgd2lsbCByZW1vdmUgdGhlIGZpbHRlciBpZiBub3QgaXQgd2lsbCBwdXNoIGl0IHRvIHRoZSBzZWxlY3RlZEZpbHRlcnNcbiAgICB0aGlzLmlzU2VsZWN0ZWQoZmlsdGVyKSA/IHRoaXMuc2VsZWN0ZWRGaWx0ZXJzLnNwbGljZSh0aGlzLnNlbGVjdGVkRmlsdGVycy5pbmRleE9mKGZpbHRlciksIDEpIDogdGhpcy5zZWxlY3RlZEZpbHRlcnMucHVzaChmaWx0ZXIpO1xuICB9XG5cbiAgaXNTZWxlY3RlZChmaWx0ZXIpIHtcbiAgICByZXR1cm4gdGhpcy5zZWxlY3RlZEZpbHRlcnMuaW5jbHVkZXMoZmlsdGVyKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMuZXZlbnRzLmxpc3RlbigpLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxufVxuIl19