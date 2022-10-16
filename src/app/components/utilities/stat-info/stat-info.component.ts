import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-stat-info',
    templateUrl: './stat-info.component.html',
    styleUrls: ['./stat-info.component.scss'],
})
export class StatInfoComponent {
    @Input() name: string;
    @Input() value: number;
    @Input() pluralize: boolean = true;

    constructor() {}
}
