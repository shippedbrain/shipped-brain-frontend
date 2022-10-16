import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
    /**
     * Truncates string based on `maxLength` parameter.
     *
     * If number of characters in string is not greater than `maxLength`, string is returned unchanged
     *
     * @param value Text to truncated
     * @param maxLength Max number of characters to show
     * @returns Truncated string
     */
    transform(value: string, maxLength: number = 100): string {
        return value.length <= maxLength
            ? value
            : `${value.substr(0, value.lastIndexOf(' ', maxLength))}...`;
    }
}
