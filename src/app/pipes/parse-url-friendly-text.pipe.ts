import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'parseUrlFriendlyText',
})
export class ParseUrlFriendlyTextPipe implements PipeTransform {
    /**
     * Converts URL friendly string to regular text by converting all `+` signs to whitespaces
     *
     * @param text URL friendly string
     * @returns Regular text
     */
    transform(text: string): string {
        return text.replace(/\+/g, ' ');
    }
}
