import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-nav-link-badge',
    templateUrl: './nav-link-badge.component.html',
    styleUrls: ['./nav-link-badge.component.scss'],
})
export class NavLinkBadgeComponent {
    @Input() title: string;

    constructor() {}
}
