import { Component, Input } from '@angular/core';
import { Header } from 'src/app/models/header/header';

@Component({
    selector: 'app-nav-menu-items',
    templateUrl: './nav-menu-items.component.html',
    styleUrls: ['./nav-menu-items.component.scss'],
})
export class NavMenuItemsComponent {
    @Input() navMenuItems: Header[];

    constructor() {}
}
