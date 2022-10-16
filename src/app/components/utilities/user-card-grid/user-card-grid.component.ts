import { Component, Input } from '@angular/core';
import { User } from 'src/app/models/user/user';

@Component({
    selector: 'app-user-card-grid',
    templateUrl: './user-card-grid.component.html',
    styleUrls: ['./user-card-grid.component.scss'],
})
export class UserCardGridComponent {
    @Input() users: User[];

    constructor() {}
}
