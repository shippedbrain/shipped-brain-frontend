import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-brand',
    templateUrl: './brand.component.html',
    styleUrls: ['./brand.component.scss'],
})
export class BrandComponent {
    @Input() lg: boolean = false;

    constructor() {}
}
