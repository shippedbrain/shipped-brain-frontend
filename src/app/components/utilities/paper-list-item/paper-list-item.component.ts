import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { PapersWithCode } from 'src/app/models/papers-with-code/papers-with-code';

@Component({
    selector: 'app-paper-list-item',
    templateUrl: './paper-list-item.component.html',
    styleUrls: ['./paper-list-item.component.scss'],
})
export class PaperListItemComponent {
    @Input() paper: PapersWithCode;

    constructor() {}

    /**
     * Wrapper for moment
     *
     * @param date Date to format
     * @returns Moment object
     */
    moment(date: any): moment.Moment {
        return moment(date);
    }
}
