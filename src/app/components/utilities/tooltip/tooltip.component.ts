import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-tooltip',
    templateUrl: './tooltip.component.html',
    styleUrls: ['./tooltip.component.scss'],
})
export class TooltipComponent {
    @Input() icon: string;
    @Input() titleContent: string;
    @Input() tooltipContent: string;
    @Input() class: string = 'color-grey-darkened';
    @Input() tooltipWide: boolean = false;

    constructor() {}
}
