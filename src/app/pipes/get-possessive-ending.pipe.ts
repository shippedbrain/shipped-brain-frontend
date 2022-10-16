import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getPossessiveEnding',
})
export class GetPossessiveEndingPipe implements PipeTransform {
    /**
     * Checks if `'s` or `'` should be added at end of string, depending on whether it ends with `s`
     *
     * @param value String to format
     * @returns Formatted string with possessive ending
     */
    transform(value: string): string {
        return value.charAt(value.length - 1) === 's' ? `${value}'` : `${value}'s`;
    }
}
