import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'nl2br',
})
export class Nl2brPipe implements PipeTransform {
    /**
     * Converts lines to `<br>` element
     *
     * @param value Raw string
     * @returns Formatted string with added HTML if new lines are found
     */
    transform(value: string = ''): string {
        return value.replace(/\n/g, '<br>');
    }
}
