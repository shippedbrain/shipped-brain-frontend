import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'handleEmpty',
})
export class HandleEmptyPipe implements PipeTransform {
    /**
     * Checks if `value` is empty. If true, a not available type response is returned.
     *
     * @param value String to validate
     * @param responseType Determines what text should be returned when `value` is empty
     * @returns `value` when not empty, otherwise a not available type response is returned
     */
    transform(value: string, responseType: string = 'no-description'): string {
        let returnResponse = '';

        switch (responseType) {
            case 'no-description':
                returnResponse = 'Description is not yet available.';

                break;
            default:
                returnResponse = '-';
        }

        return value ? value : returnResponse;
    }
}
