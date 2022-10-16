import { Component, Input } from '@angular/core';
import * as moment from 'moment';
import { User } from 'src/app/models/user/user';

@Component({
    selector: 'app-user-list-item',
    templateUrl: './user-list-item.component.html',
    styleUrls: ['./user-list-item.component.scss'],
})
export class UserListItemComponent {
    @Input() user: User;

    constructor() {}

    /**
     * Wrapper for moment
     *
     * @param date Date to format
     * @returns Moment instance
     */
    moment(date: any): moment.Moment {
        return moment(date);
    }
}
