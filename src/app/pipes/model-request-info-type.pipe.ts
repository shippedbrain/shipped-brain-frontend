import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'modelRequestInfoType',
})
export class ModelRequestInfoTypePipe implements PipeTransform {
    /**
     * Determines CSS class type for model request based on its status
     *
     * Available statuses and class returned for each status:
     *
     * `cancelled` - `error`
     *
     * `open` - `success`
     *
     * `closed` - `info`
     *
     * If status is not found in list, an empty string is returned
     *
     * @param modelRequestStatus Model request status
     * @returns CSS class according to status
     */
    transform(modelRequestStatus: string): string {
        switch (modelRequestStatus) {
            case 'cancelled':
                return 'error';
            case 'open':
                return 'success';
            case 'closed':
                return 'info';
            default:
                return '';
        }
    }
}
