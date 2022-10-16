import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'capitalize',
})
export class CapitalizePipe implements PipeTransform {
    /**
     * Sets first letter of string to uppercase
     *
     * @param value string to capitalize
     * @returns Capitalized string
     */
    transform(value: string): string {
        return value.charAt(0).toUpperCase() + value.substring(1);
    }
}
