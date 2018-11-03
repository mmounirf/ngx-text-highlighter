/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,uselessCode} checked by tsc
 */
import { Pipe } from '@angular/core';
var ColorFilterPipe = /** @class */ (function () {
    function ColorFilterPipe() {
    }
    // Items are sotred selections, args are selected filters
    /**
     * @param {?} items
     * @param {?} args
     * @return {?}
     */
    ColorFilterPipe.prototype.transform = /**
     * @param {?} items
     * @param {?} args
     * @return {?}
     */
    function (items, args) {
        var _this = this;
        // If args are not defined or empty
        if (args.length === 0 || !args) {
            // Return all items
            return items;
        }
        else {
            // Return only items with color value existing in args (selected filters)
            return items.filter(function (item) { return _this.isFilterExist(item.color, args); });
        }
    };
    // Check if item color included in the selected filters (args)
    /**
     * @param {?} itemColor
     * @param {?} args
     * @return {?}
     */
    ColorFilterPipe.prototype.isFilterExist = /**
     * @param {?} itemColor
     * @param {?} args
     * @return {?}
     */
    function (itemColor, args) {
        return args.includes(itemColor);
    };
    ColorFilterPipe.decorators = [
        { type: Pipe, args: [{
                    name: 'colorFilter',
                    pure: false
                },] },
    ];
    return ColorFilterPipe;
}());
export { ColorFilterPipe };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3ItZmlsdGVyLnBpcGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdGV4dC1oaWdobGlnaHRlci8iLCJzb3VyY2VzIjpbImxpYi9waXBlcy9jb2xvci1maWx0ZXIucGlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLElBQUksRUFBaUIsTUFBTSxlQUFlLENBQUM7Ozs7SUFPbEQseURBQXlEOzs7Ozs7SUFDekQsbUNBQVM7Ozs7O0lBQVQsVUFBVSxLQUFZLEVBQUUsSUFBVztRQUFuQyxpQkFTQzs7UUFQQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1lBRS9CLE1BQU0sQ0FBQyxLQUFLLENBQUM7U0FDZDtRQUFDLElBQUksQ0FBQyxDQUFDOztZQUVOLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsS0FBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxFQUFwQyxDQUFvQyxDQUFDLENBQUM7U0FDbkU7S0FDRjtJQUVELDhEQUE4RDs7Ozs7O0lBQzlELHVDQUFhOzs7OztJQUFiLFVBQWMsU0FBUyxFQUFFLElBQUk7UUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDakM7O2dCQXBCRixJQUFJLFNBQUM7b0JBQ0osSUFBSSxFQUFFLGFBQWE7b0JBQ25CLElBQUksRUFBRSxLQUFLO2lCQUNaOzswQkFMRDs7U0FNYSxlQUFlIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUGlwZSwgUGlwZVRyYW5zZm9ybSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AUGlwZSh7XG4gIG5hbWU6ICdjb2xvckZpbHRlcicsXG4gIHB1cmU6IGZhbHNlXG59KVxuZXhwb3J0IGNsYXNzIENvbG9yRmlsdGVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICAvLyBJdGVtcyBhcmUgc290cmVkIHNlbGVjdGlvbnMsIGFyZ3MgYXJlIHNlbGVjdGVkIGZpbHRlcnNcbiAgdHJhbnNmb3JtKGl0ZW1zOiBhbnlbXSwgYXJnczogYW55W10pIHtcbiAgICAvLyBJZiBhcmdzIGFyZSBub3QgZGVmaW5lZCBvciBlbXB0eVxuICAgIGlmIChhcmdzLmxlbmd0aCA9PT0gMCB8fCAhYXJncykge1xuICAgICAgLy8gUmV0dXJuIGFsbCBpdGVtc1xuICAgICAgcmV0dXJuIGl0ZW1zO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZXR1cm4gb25seSBpdGVtcyB3aXRoIGNvbG9yIHZhbHVlIGV4aXN0aW5nIGluIGFyZ3MgKHNlbGVjdGVkIGZpbHRlcnMpXG4gICAgICByZXR1cm4gaXRlbXMuZmlsdGVyKGl0ZW0gPT4gdGhpcy5pc0ZpbHRlckV4aXN0KGl0ZW0uY29sb3IsIGFyZ3MpKTtcbiAgICB9XG4gIH1cblxuICAvLyBDaGVjayBpZiBpdGVtIGNvbG9yIGluY2x1ZGVkIGluIHRoZSBzZWxlY3RlZCBmaWx0ZXJzIChhcmdzKVxuICBpc0ZpbHRlckV4aXN0KGl0ZW1Db2xvciwgYXJncykge1xuICAgIHJldHVybiBhcmdzLmluY2x1ZGVzKGl0ZW1Db2xvcik7XG4gIH1cblxufVxuIl19