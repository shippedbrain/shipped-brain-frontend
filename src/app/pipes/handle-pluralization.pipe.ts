import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'handlePluralization',
})
export class HandlePluralizationPipe implements PipeTransform {
    /**
     * Handles word pluralization validating if `numberOfElements` is greater than 1
     *
     * @param numberOfElements Number of elements
     * @returns `s` if `numberOfElements` is greater than 1, otherwise it returns empty string
     */
    transform(numberOfElements: number): string {
        return numberOfElements === 1 ? '' : 's';
    }
}
