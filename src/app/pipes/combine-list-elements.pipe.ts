import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'combineListElements',
})
export class CombineListElementsPipe implements PipeTransform {
    /**
     * Joins elements of string array with commas.
     * If elements parameter is greater than elementsToShow, the remaining elements will be hidden.
     *
     * E.g.: If `elements` equals `[elem1, elem2, elem3, elem4]` and `elementsToShow` equals `2`,
     * text will show `elem1, elem2 + 2 others`
     *
     * @param elements List of elements
     * @param elementsToShow Determines number of elements to be shown
     * @param activatePipe When true, pipe is active, otherwise pipe is ignored
     * @returns Formatted text
     */
    transform(
        elements: string[],
        elementsToShow: number = 1,
        activatePipe: boolean = true
    ): string {
        let textToShow: string = '';
        let leftoverElements: number = 0;
        let leftoverElementsList: string[] = [];

        if (elements.length && elements.length > elementsToShow && activatePipe) {
            for (let i = 0; i < elementsToShow; i++) {
                textToShow += `${elements[i]}, `;
            }

            leftoverElements = elements.length - elementsToShow;
            leftoverElementsList = elements.slice(elementsToShow);

            textToShow +=
                `<span class="color-magenta-dark tooltip" title="${leftoverElementsList.join(
                    ', '
                )}">
                +${leftoverElements} other` +
                (leftoverElements === 1 ? '' : 's') +
                `</span>`;
        } else {
            textToShow += elements.join(', ');
        }

        return textToShow;
    }
}
