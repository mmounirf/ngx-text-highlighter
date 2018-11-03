import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'colorFilter',
  pure: false
})
export class ColorFilterPipe implements PipeTransform {
  // Items are sotred selections, args are selected filters
  transform(items: any[], args: any[]) {
    // If args are not defined or empty
    if (!args || args.length === 0) {
      // Return all items
      return items;
    } else {
      // Return only items with color value existing in args (selected filters)
      return items.filter(item => this.isFilterExist(item.color, args));
    }
  }

  // Check if item color included in the selected filters (args)
  isFilterExist(itemColor, args) {
    return args.includes(itemColor);
  }

}
