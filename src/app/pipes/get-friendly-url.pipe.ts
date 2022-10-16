import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'getFriendlyUrl',
})
export class GetFriendlyUrlPipe implements PipeTransform {
    /**
     * Parses string removing whitespaces and dot characters
     *
     * @param text Text to format
     * @param divider Divider to replace whitespaces with
     * @returns URL friendly string
     */
    transform(text: string, divider: string = '+'): string {
        return text.toLowerCase().replace(/ /g, divider).replace(/\./g, '');
    }
}
