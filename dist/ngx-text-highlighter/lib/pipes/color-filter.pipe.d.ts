import { PipeTransform } from '@angular/core';
export declare class ColorFilterPipe implements PipeTransform {
    transform(items: any[], args: any[]): any[];
    isFilterExist(itemColor: any, args: any): any;
}
